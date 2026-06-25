import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/layout/Hero";
import Footer from "@/components/layout/Footer";
import { ArrowRight, Check, Zap, Sparkles, Brain, Cpu, MessageSquare, Video, Globe, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />

      {/* Social Proof / Brands */}
      <section className="py-12 border-y border-white/5 bg-white/2">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm font-medium mb-8">TRUSTED BY 10,000+ TOP CREATORS</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-30 grayscale invert">
            {/* Logo Placeholders */}
            <div className="text-2xl font-black">YOUTUBE</div>
            <div className="text-2xl font-black">TIKTOK</div>
            <div className="text-2xl font-black">TWITCH</div>
            <div className="text-2xl font-black">INSTAGRAM</div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">The Content Team in Your Pocket</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">One platform, every AI model you need. Built for creators who want to dominate every platform.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <MessageSquare className="w-6 h-6 text-ai-purple" />,
                title: "Script Mastery",
                desc: "Generate viral-ready scripts for YouTube, Reels, and TikTok using Llama 3.1 70B.",
                color: "purple"
              },
              {
                icon: <Zap className="w-6 h-6 text-energy-orange" />,
                title: "Hook Generator",
                desc: "Stop the scroll with high-retention hooks engineered for maximum engagement.",
                color: "orange"
              },
              {
                icon: <Brain className="w-6 h-6 text-energy-yellow" />,
                title: "Viral Score AI",
                desc: "Analyze your ideas before you film. Get real-time feedback on viral potential.",
                color: "yellow"
              },
              {
                icon: <ImageIcon className="w-6 h-6 text-ai-blue" />,
                title: "FLUX.1 Thumbnails",
                desc: "Create professional-grade thumbnails that drive CTR through the roof.",
                color: "blue"
              },
              {
                icon: <Video className="w-6 h-6 text-red-500" />,
                title: "AI Video Clips",
                desc: "Turn text into video instantly with Cosmos AI for b-roll and social clips.",
                color: "red"
              },
              {
                icon: <Globe className="w-6 h-6 text-green-500" />,
                title: "Cross-Platform",
                desc: "Automatically adapt your content for every social media algorithm.",
                color: "green"
              }
            ].map((feature, i) => (
              <div key={i} className="glass-card p-8 rounded-3xl group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="relative rounded-[3rem] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-ai-purple to-ai-blue opacity-20" />
            <div className="absolute inset-0 glass border border-white/10" />

            <div className="relative p-12 md:p-20 text-center">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Ready to scale your content?</h2>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Join 10,000+ creators building the future with 🚀 Creator Copilot AI.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="btn-energy-red h-14 px-10 rounded-full text-lg font-bold">
                  Get Started Free
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-10 rounded-full border-white/10 hover:bg-white/5 text-lg font-bold">
                  View Pricing
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
