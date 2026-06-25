"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageIcon, Download, RefreshCw, Sparkles, Loader2, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import axios from "axios";

export default function ImageStudio() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleGenerate = async (e?: any) => {
    if (e) e.preventDefault();
    if (!prompt) return toast.error("Please enter a prompt");

    setLoading(true);
    setImageUrl("");
    try {
      const response = await axios.post("/api/ai/image", { prompt });
      setImageUrl(response.data.url);
      toast.success("Image generated successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `creator-copilot-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      toast.error("Download failed");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <ImageIcon className="text-ai-blue" /> Image Studio
          </h1>
          <p className="text-gray-400">Generate 4K thumbnails and creative assets with FLUX.1 Schnell.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="glass-card p-8 rounded-[2.5rem]">
              <label className="text-xs font-bold text-gray-500 uppercase mb-4 block">Visual Prompt</label>
              <Input
                placeholder="A futuristic creator studio with neon lights..."
                className="h-14 bg-white/5 border-white/10 rounded-2xl px-6 mb-6"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <Button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full bg-ai-blue hover:bg-ai-blue/80 text-white h-14 rounded-2xl font-bold text-lg shadow-[0_0_20px_rgba(59,130,246,0.3)]"
              >
                {loading ? <Loader2 className="animate-spin mr-2" /> : <Sparkles className="mr-2" />}
                Generate 4K Image
              </Button>
            </div>

            <div className="bg-white/2 border border-white/5 rounded-3xl p-6">
                <h4 className="text-sm font-bold text-white mb-4">Pro Tips</h4>
                <ul className="text-xs text-gray-500 space-y-2">
                    <li>• Use descriptive words like "cinematic lighting" or "8k resolution".</li>
                    <li>• FLUX.1 is great at text rendering inside images.</li>
                    <li>• Portraits work best with a depth-of-field description.</li>
                </ul>
            </div>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="aspect-square rounded-[2.5rem] overflow-hidden"
                >
                  <Skeleton className="w-full h-full bg-white/5 animate-pulse" />
                </motion.div>
              ) : imageUrl ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="group relative aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10"
                >
                  <img src={imageUrl} alt="Generated asset" className="w-full h-full object-cover" />

                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <Button variant="secondary" onClick={downloadImage} className="rounded-full h-12 w-12 p-0">
                        <Download size={20} />
                    </Button>
                    <Button variant="secondary" onClick={handleGenerate} className="rounded-full h-12 w-12 p-0">
                        <RefreshCw size={20} />
                    </Button>
                    <Button variant="secondary" className="rounded-full h-12 w-12 p-0">
                        <Share2 size={20} />
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <div className="aspect-square rounded-[2.5rem] border border-dashed border-white/10 flex flex-col items-center justify-center text-gray-600 bg-white/2">
                    <ImageIcon size={48} className="mb-4 opacity-20" />
                    <p className="text-sm font-medium">Your creation will appear here</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
