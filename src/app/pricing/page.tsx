"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Check, Zap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for exploring the AI potential",
    features: [
      "10 AI requests per day",
      "Standard text models",
      "720p Image generation",
      "Basic viral analysis",
      "Community support"
    ],
    button: "Get Started",
    popular: false
  },
  {
    name: "Pro",
    price: "$29",
    description: "For serious creators scaling their brand",
    features: [
      "100 AI requests per day",
      "Llama 3.1 70B & Flux.1 Pro",
      "4K Thumbnail generation",
      "Full AI Video generation",
      "Advanced Viral Insights",
      "Priority API access",
      "Dedicated support"
    ],
    button: "Upgrade to Pro",
    popular: true
  }
];

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Simple, Transparent Pricing</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Choose the plan that fits your creative workflow. Scale as you grow.
            </p>
          </motion.div>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className={`relative glass-card p-8 md:p-12 rounded-[2.5rem] flex flex-col ${
                plan.popular ? "border-ai-purple/50 shadow-[0_0_40px_rgba(139,92,246,0.15)]" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-ai-purple to-ai-blue rounded-full text-white text-xs font-bold flex items-center gap-1 shadow-lg">
                  <Sparkles className="w-3 h-3" /> MOST POPULAR
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-5xl font-extrabold text-white">{plan.price}</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <p className="text-gray-400">{plan.description}</p>
              </div>

              <div className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-gray-300">
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${plan.popular ? "bg-ai-purple/20 text-ai-purple" : "bg-white/10 text-white"}`}>
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                size="lg"
                className={`w-full h-14 rounded-2xl text-lg font-bold transition-all ${
                  plan.popular ? "btn-energy-red" : "bg-white/10 hover:bg-white/20 text-white border border-white/10"
                }`}
              >
                {plan.button}
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 max-w-3xl mx-auto text-center glass p-8 rounded-3xl border border-white/5">
          <Zap className="w-8 h-8 text-energy-yellow mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Enterprise Plan?</h3>
          <p className="text-gray-400 text-sm mb-6">Need custom limits or API access for your entire agency? We offer custom enterprise solutions.</p>
          <Button variant="link" className="text-ai-purple font-bold">Contact Sales →</Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
