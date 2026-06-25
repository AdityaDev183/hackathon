"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Wand2, Copy, RefreshCw, Sparkles, Loader2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import axios from "axios";

export default function TextGenerator() {
  const [prompt, setPrompt] = useState("");
  const [modelType, setModelType] = useState("smart");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e?: any) => {
    if (e) e.preventDefault();
    if (!prompt) return toast.error("Please enter a prompt");

    setLoading(true);
    setResult("");
    try {
      const response = await axios.post("/api/ai/generate", {
        prompt,
        modelType,
      });
      setResult(response.data.content);
      toast.success("Content generated successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Wand2 className="text-ai-purple" /> Text Generator
          </h1>
          <p className="text-gray-400">Harness Llama 3.1 70B for scripts, hooks, and ideas.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-card p-6 rounded-3xl">
              <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Model Selection</label>
              <Select value={modelType} onValueChange={(val) => setModelType(val || "smart")}>
                <SelectTrigger className="bg-white/5 border-white/10 rounded-xl">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent className="bg-card border-white/10 text-white">
                  <SelectItem value="fast">Llama 3.1 8B (Fast)</SelectItem>
                  <SelectItem value="smart">Llama 3.1 70B (Smart)</SelectItem>
                  <SelectItem value="creative">DeepSeek V3 (Creative)</SelectItem>
                </SelectContent>
              </Select>

              <div className="mt-4 flex items-center gap-2">
                <Badge variant="outline" className="text-[10px] bg-ai-purple/10 text-ai-purple border-ai-purple/20">NEW</Badge>
                <span className="text-[10px] text-gray-500 font-medium tracking-tight">Kimi 2.5 support added</span>
              </div>
            </div>

            <Button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full btn-energy-red h-14 rounded-2xl font-bold text-lg"
            >
              {loading ? <Loader2 className="animate-spin mr-2" /> : <Sparkles className="mr-2" />}
              Generate
            </Button>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card p-6 rounded-3xl">
              <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Your Instructions</label>
              <Textarea
                placeholder="Describe what you want to create (e.g. Write a viral script for a tech review)..."
                className="min-h-[150px] bg-white/5 border-white/10 rounded-2xl focus:ring-ai-purple/30 resize-none p-4"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>

            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                >
                  <Skeleton className="h-4 w-full bg-white/5" />
                  <Skeleton className="h-4 w-5/6 bg-white/5" />
                  <Skeleton className="h-4 w-4/6 bg-white/5" />
                  <Skeleton className="h-20 w-full bg-white/5 rounded-2xl" />
                </motion.div>
              ) : result ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card p-8 rounded-[2rem] relative group"
                >
                  <div className="flex justify-between items-center mb-6">
                    <Badge variant="outline" className="border-white/10 text-gray-500 font-mono text-[10px]">OUTPUT</Badge>
                    <div className="flex gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={copyToClipboard}
                            className="h-8 w-8 p-0 rounded-full hover:bg-white/10 text-gray-400"
                        >
                            {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleGenerate}
                            className="h-8 w-8 p-0 rounded-full hover:bg-white/10 text-gray-400"
                        >
                            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                        </Button>
                    </div>
                  </div>
                  <div className="text-gray-300 leading-relaxed whitespace-pre-wrap font-sans">
                    {result}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
