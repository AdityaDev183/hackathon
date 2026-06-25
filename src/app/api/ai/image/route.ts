import { NextResponse } from "next/server";
import { getAIClient, MODELS } from "@/lib/ai/models";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";
import { adminDb } from "@/lib/firebase-admin";
import { logger } from "@/lib/logger";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const imageSchema = z.object({
  prompt: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt } = imageSchema.parse(body);

    logger.info("Generating image", { promptLength: prompt.length });

    const client = getAIClient();

    const response = await client.images.generate({
      model: "black-forest-labs/flux-1-schnell",
      prompt: prompt,
      response_format: "b64_json",
    });

    const b64Data = response.data?.[0]?.b64_json;
    if (!b64Data) throw new Error("No image data returned");

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(`data:image/png;base64,${b64Data}`, {
      folder: "creator-copilot",
    });

    // Track usage
    const userId = req.headers.get("x-user-id");
    if (userId && adminDb) {
      try {
        const userRef = adminDb.collection("users").doc(userId);
        await userRef.update({
          requestsUsed: adminDb.FieldValue.increment(1),
          lastUsed: new Date().toISOString(),
        });
      } catch (e) {
        console.error("Failed to update usage:", e);
      }
    }

    logger.info("Image generation successful", { url: uploadResponse.secure_url });

    return NextResponse.json({
      url: uploadResponse.secure_url,
      public_id: uploadResponse.public_id,
    });
  } catch (error: any) {
    logger.error("Image Generation Error", { error: error.message });
    return NextResponse.json(
      { error: error.message || "Failed to generate image" },
      { status: 500 }
    );
  }
}
