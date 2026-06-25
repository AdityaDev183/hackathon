import OpenAI from "openai";

export type AIModelType = "fast" | "smart" | "creative" | "analysis" | "image" | "video";

export interface ModelConfig {
  id: string;
  name: string;
  provider: "nvidia" | "openai" | "fallback";
}

export const MODELS: Record<AIModelType, ModelConfig[]> = {
  fast: [
    { id: "meta/llama-3.1-8b-instruct", name: "Llama 3.1 8B (Fast)", provider: "nvidia" },
  ],
  smart: [
    { id: "meta/llama-3.1-70b-instruct", name: "Llama 3.1 70B (Smart)", provider: "nvidia" },
  ],
  creative: [
    { id: "deepseek-ai/deepseek-v3", name: "DeepSeek V3 (Creative)", provider: "nvidia" },
    { id: "moonshotai/kimi-2.5", name: "Kimi 2.5 (Creative)", provider: "nvidia" },
  ],
  analysis: [
    { id: "nvidia/llama-3.1-nemotron-70b-instruct", name: "Nemotron 70B (Insights)", provider: "nvidia" },
  ],
  image: [
    { id: "black-forest-labs/flux-1-schnell", name: "FLUX.1 Schnell", provider: "nvidia" },
  ],
  video: [
    { id: "nvidia/cosmos-1.0-v2v-7b", name: "Cosmos 1.0 (High Quality)", provider: "nvidia" },
  ]
};

export const getAIClient = (apiKey?: string) => {
  return new OpenAI({
    apiKey: apiKey || process.env.NVIDIA_API_KEY,
    baseURL: "https://integrate.api.nvidia.com/v1",
  });
};
