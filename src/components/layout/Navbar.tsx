"use strict";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-ai-purple to-ai-blue rounded-lg flex items-center justify-center font-bold text-white shadow-lg glow-purple">
                C
              </div>
              <span className="text-xl font-bold tracking-tight text-white hidden sm:block">
                Creator Copilot <span className="text-ai-purple">AI</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/#features" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Features</Link>
            <Link href="/pricing" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Pricing</Link>
            <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Login</Link>
            <Button asChild className="btn-energy-red rounded-full px-6">
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>

          <div className="md:hidden">
            {/* Mobile menu button could go here */}
            <Button asChild className="btn-energy-red text-xs py-1 h-8 rounded-full">
              <Link href="/signup">Join Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
