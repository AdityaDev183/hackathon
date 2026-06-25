"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wand2, Image as ImageIcon, Video, Play, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const tools = [
    {
        title: "YouTube Package",
        desc: "Script + Thumbnail + SEO",
        icon: <Play className="text-red-500" />,
        href: "/dashboard/workflows/youtube",
        badge: "New"
    },
    {
        title: "Text Generator",
        desc: "Llama 3.1 70B Writing",
        icon: <Wand2 className="text-ai-purple" />,
        href: "/dashboard/generate"
    },
    {
        title: "Image Studio",
        desc: "FLUX.1-dev Generation",
        icon: <ImageIcon className="text-ai-blue" />,
        href: "/dashboard/images"
    },
    {
        title: "Video Lab",
        desc: "Cosmos Text-to-Video",
        icon: <Video className="text-energy-orange" />,
        href: "/dashboard/video"
    },
    {
        title: "Viral Analysis",
        desc: "Nemotron Insights",
        icon: <TrendingUp className="text-energy-yellow" />,
        href: "/dashboard/analysis"
    },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Welcome, Creator</h1>
          <p className="text-gray-400">What are we building today?</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, i) => (
            <Link key={tool.href} href={tool.href}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02, translateY: -5 }}
                className="glass-card p-6 rounded-[2rem] group cursor-pointer h-full relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    {tool.icon}
                </div>

                {tool.badge && (
                    <div className="absolute top-4 right-4 bg-ai-purple text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
                        {tool.badge}
                    </div>
                )}

                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                  {tool.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{tool.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{tool.desc}</p>

                <div className="mt-6 flex items-center text-xs font-bold text-ai-purple opacity-0 group-hover:opacity-100 transition-opacity">
                    LAUNCH TOOL <Sparkles className="ml-2 w-3 h-3" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <div className="mt-12">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Recent Creations</h3>
            <div className="glass-card rounded-[2rem] p-12 text-center border-dashed border-white/10">
                <p className="text-gray-500 text-sm">Your generated content will appear here.</p>
            </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
