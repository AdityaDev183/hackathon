"use client";

import { useEffect, useRef } from "react";
import { animate, random } from "animejs";

export default function AIBrain() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const numParticles = 80;
    const container = containerRef.current;

    // Create particles
    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement("div");
      particle.className = "absolute rounded-full bg-gradient-to-br from-ai-purple to-ai-blue";

      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.opacity = (Math.random() * 0.5 + 0.2).toString();

      container.appendChild(particle);

      // Animate particle
      animate(particle, {
        translateX: () => [random(-150, 150), random(-150, 150)],
        translateY: () => [random(-150, 150), random(-150, 150)],
        scale: () => [0, Math.random() * 2],
        opacity: () => [0, Math.random() * 0.8, 0],
        easing: "easeInOutQuad",
        duration: () => random(3000, 6000),
        delay: () => random(0, 4000),
        loop: true,
      });
    }

    // Floating brain shape
    const brain = document.createElement("div");
    brain.className = "absolute w-40 h-40 rounded-full bg-ai-purple/20 blur-3xl glow-purple";
    container.appendChild(brain);

    animate(brain, {
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.6, 0.3],
      duration: 4000,
      loop: true,
      easing: "easeInOutSine"
    });

    return () => {
      if (container) container.innerHTML = "";
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center overflow-visible">
      <div ref={containerRef} className="relative w-1 h-1" />
      {/* Central Glow Core */}
      <div className="absolute w-24 h-24 bg-gradient-to-br from-ai-purple to-ai-blue rounded-full blur-2xl opacity-40 animate-pulse" />
    </div>
  );
}
