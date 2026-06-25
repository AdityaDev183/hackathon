"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Wand2, Zap, BarChart3, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LazyAIBrain from "./LazyAIBrain";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-ai-purple/10 blur-[120px] rounded-full -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-ai-blue/10 blur-[120px] rounded-full -z-10 animate-pulse" style={{ animationDelay: "2s" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-ai-purple/10 border border-ai-purple/20 text-ai-purple text-xs font-bold mb-6">
              <Sparkles className="w-3 h-3" />
              <span>THE FUTURE OF CONTENT IS HERE</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
              Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-ai-purple to-ai-blue">Smarter.</span><br />
              Faster. With AI.
            </h1>

            <p className="text-xl text-gray-400 mb-8 max-w-lg leading-relaxed">
              Replace your entire content team with one AI copilot. From viral scripts to 4K thumbnails, scaling your brand has never been this easy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1 group">
                <Input
                  placeholder="Enter your idea..."
                  className="h-14 bg-white/5 border-white/10 rounded-full px-6 focus:ring-ai-purple/50 focus:border-ai-purple/50 transition-all"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-ai-purple/20 to-ai-blue/20 blur opacity-0 group-focus-within:opacity-100 transition-opacity -z-10" />
              </div>
              <Button className="btn-energy-red h-14 px-8 rounded-full text-lg font-bold">
                Start Building <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center"><Zap className="w-4 h-4 mr-2 text-energy-yellow" /> Lightning Fast</div>
              <div className="flex items-center"><ImageIcon className="w-4 h-4 mr-2 text-ai-blue" /> 4K Generation</div>
              <div className="flex items-center"><BarChart3 className="w-4 h-4 mr-2 text-ai-purple" /> Analytics Driven</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <LazyAIBrain />

            {/* Floating UI Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 right-0 glass p-4 rounded-2xl border border-white/10 shadow-2xl"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Wand2 className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">Viral Score</div>
                  <div className="text-lg font-bold text-white">98/100</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-10 left-0 glass p-4 rounded-2xl border border-white/10 shadow-2xl"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-ai-blue/20 rounded-full flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-ai-blue" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">Thumbnail</div>
                  <div className="text-[10px] font-medium text-ai-blue">GENERATING...</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
