"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Play, Sparkles, Loader2, CheckCircle2, ArrowRight, Video, ImageIcon, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export default function YouTubeWorkflow() {
  const [step, setStep] = useState(1);
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

  const generateStep1 = async () => {
    if (!topic) return toast.error("Enter a topic first");
    setLoading(true);
    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Create a YouTube package for the topic: "${topic}".
          Include a viral title, a viral score (0-100), a detailed video script, and a text-to-image prompt for the thumbnail.
          Format the response as JSON with keys: title, score, script, thumbnailPrompt.`,
          model: "llama-3.1-70b-instruct",
          stream: false
        })
      });

      if (!response.ok) throw new Error("Failed to generate");

      const data = await response.json();

      // Attempt to parse JSON from AI response if it's wrapped in text
      let finalData = data;
      try {
        if (typeof data.content === 'string') {
          const jsonMatch = data.content.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            finalData = JSON.parse(jsonMatch[0]);
          }
        } else {
          finalData = data.content;
        }
      } catch (e) {
        console.error("JSON parse error", e);
      }

      setResults({
        script: finalData.script || data.content,
        title: finalData.title || `Video about ${topic}`,
        thumbnailPrompt: finalData.thumbnailPrompt || `A cinematic thumbnail about ${topic}`,
        score: finalData.score || 85
      });
      setStep(2);
    } catch (e) {
      toast.error("Generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-12 bg-red-500/20 rounded-2xl flex items-center justify-center">
                <Play className="text-red-500" />
            </div>
            <div>
                <h1 className="text-2xl font-bold text-white">YouTube Package Generator</h1>
                <p className="text-sm text-gray-500">Go from idea to full content package in seconds.</p>
            </div>
        </div>

        <div className="flex items-center justify-between mb-8 px-4">
            {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                        step >= i ? "bg-ai-purple text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]" : "bg-white/5 text-gray-500"
                    }`}>
                        {step > i ? <CheckCircle2 size={16} /> : i}
                    </div>
                    {i < 3 && <div className={`w-20 md:w-40 h-0.5 mx-2 ${step > i ? "bg-ai-purple" : "bg-white/5"}`} />}
                </div>
            ))}
        </div>

        <AnimatePresence mode="wait">
            {step === 1 && (
                <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="glass-card p-8 rounded-[2.5rem]"
                >
                    <h3 className="text-xl font-bold text-white mb-6">What is your video about?</h3>
                    <div className="space-y-6">
                        <Input
                            placeholder="e.g., The future of AI in 2025"
                            className="h-14 bg-white/5 border-white/10 rounded-2xl px-6"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                        />
                        <Button
                            className="w-full btn-energy-red h-14 text-lg font-bold rounded-2xl"
                            onClick={generateStep1}
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="animate-spin mr-2" /> : <Sparkles className="mr-2" />}
                            Generate AI Package
                        </Button>
                    </div>
                </motion.div>
            )}

            {step === 2 && results && (
                <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                >
                    <div className="grid md:grid-cols-3 gap-6">
                        <Card className="glass-card border-none p-6">
                            <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Viral Potential</p>
                            <div className="text-3xl font-black text-white">{results.score}%</div>
                            <div className="w-full bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden">
                                <div className="bg-ai-purple h-full" style={{ width: `${results.score}%` }} />
                            </div>
                        </Card>
                        <Card className="glass-card border-none p-6 md:col-span-2">
                            <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Optimized Title</p>
                            <div className="text-lg font-bold text-white">{results.title}</div>
                        </Card>
                    </div>

                    <div className="glass-card p-8 rounded-[2.5rem]">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-white flex items-center">
                                <FileText className="mr-2 text-ai-purple" size={20} /> AI Generated Script
                            </h3>
                            <Button variant="outline" size="sm" className="rounded-full text-xs border-white/10">Copy Script</Button>
                        </div>
                        <pre className="text-sm text-gray-400 whitespace-pre-wrap font-sans leading-relaxed">
                            {results.script}
                        </pre>
                    </div>

                    <div className="glass-card p-8 rounded-[2.5rem]">
                        <h3 className="font-bold text-white mb-6 flex items-center">
                            <ImageIcon className="mr-2 text-ai-blue" size={20} /> Thumbnail Concept
                        </h3>
                        <div className="bg-white/5 border border-dashed border-white/10 rounded-2xl p-8 text-center">
                            {thumbnailUrl ? (
                              <div className="relative aspect-video rounded-xl overflow-hidden mb-6">
                                <img src={thumbnailUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                              </div>
                            ) : (
                              <p className="text-sm text-gray-500 mb-6 italic">"{results.thumbnailPrompt}"</p>
                            )}

                            <Button
                              className="bg-ai-blue hover:bg-ai-blue/80 text-white font-bold rounded-full"
                              disabled={imgLoading}
                              onClick={async () => {
                                setImgLoading(true);
                                try {
                                  const res = await fetch("/api/ai/image", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ prompt: results.thumbnailPrompt })
                                  });
                                  const data = await res.json();
                                  if (data.url) setThumbnailUrl(data.url);
                                  else throw new Error("No URL");
                                } catch (e) {
                                  toast.error("Image generation failed");
                                } finally {
                                  setImgLoading(false);
                                }
                              }}
                            >
                                {imgLoading ? <Loader2 className="animate-spin mr-2" /> : null}
                                {thumbnailUrl ? "Regenerate Image" : "Generate Image with FLUX.1"}
                            </Button>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <Button variant="ghost" className="text-gray-500" onClick={() => setStep(1)}>Back</Button>
                        <Button className="btn-energy-red px-8 rounded-full font-bold" onClick={() => setStep(3)}>
                            Finalize Package <ArrowRight className="ml-2" size={18} />
                        </Button>
                    </div>
                </motion.div>
            )}

            {step === 3 && (
                <motion.div
                    key="step3"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20"
                >
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="text-green-500" size={40} />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Package Ready!</h2>
                    <p className="text-gray-400 mb-10 max-w-md mx-auto">Your YouTube content package has been generated and saved to your history.</p>
                    <div className="flex justify-center gap-4">
                        <Button variant="outline" className="rounded-full px-8" onClick={() => setStep(1)}>Create Another</Button>
                        <Button className="btn-energy-red rounded-full px-8 font-bold">Go to History</Button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
