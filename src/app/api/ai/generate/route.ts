import { NextResponse } from "next/server";
import { getAIClient, MODELS, AIModelType } from "@/lib/ai/models";
import { z } from "zod";
import { adminDb } from "@/lib/firebase-admin";
import { logger } from "@/lib/logger";

const generateSchema = z.object({
  prompt: z.string().min(1),
  modelType: z.enum(["fast", "smart", "creative", "analysis"] as [AIModelType, ...AIModelType[]]).optional(),
  model: z.string().optional(),
  systemPrompt: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, modelType, model: requestedModel, systemPrompt } = generateSchema.parse(body);

    const client = getAIClient();

    // Fallback logic
    const modelOptions = requestedModel
      ? [requestedModel]
      : (modelType ? MODELS[modelType].map(m => m.id) : [MODELS.fast[0].id]);

    let response = null;
    let lastError = null;
    let finalModel = "";

    for (const model of modelOptions) {
      try {
        logger.info("Attempting generation", { model, promptLength: prompt.length });
        response = await client.chat.completions.create({
          model: model,
          messages: [
            { role: "system", content: systemPrompt || "You are a helpful content creator assistant." },
            { role: "user", content: prompt },
          ],
          temperature: 0.7,
          max_tokens: 2000,
        });
        finalModel = model;
        break; // Success!
      } catch (e: any) {
        logger.warn("Model failed, trying fallback if available", { model, error: e.message });
        lastError = e;
      }
    }

    if (!response) {
      throw lastError || new Error("All models failed");
    }

    // Track usage in Firestore if user is authenticated
    const userId = req.headers.get("x-user-id");
    if (userId && adminDb) {
      try {
        const userRef = adminDb.collection("users").doc(userId);
        await userRef.update({
          requestsUsed: adminDb.FieldValue.increment(1),
          tokensUsed: adminDb.FieldValue.increment(response.usage?.total_tokens || 0),
          lastUsed: new Date().toISOString(),
        });
      } catch (e) {
        console.error("Failed to update usage:", e);
      }
    }

    logger.info("Generation successful", { model: finalModel, tokens: response.usage?.total_tokens });

    return NextResponse.json({
      content: response.choices[0].message.content,
      usage: response.usage,
      model: finalModel,
    });
  } catch (error: any) {
    logger.error("AI Generation Error", { error: error.message });
    return NextResponse.json(
      { error: error.message || "Failed to generate content" },
      { status: 500 }
    );
  }
}
