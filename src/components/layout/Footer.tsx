"use strict";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-white/5 py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-br from-ai-purple to-ai-blue rounded flex items-center justify-center font-bold text-xs text-white">
                C
              </div>
              <span className="font-bold tracking-tight text-white">Creator Copilot</span>
            </div>
            <p className="text-gray-500 text-sm">
              Build Smarter. Faster. With AI. Replaces your entire content team with one AI copilot.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Product</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-ai-purple transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-ai-purple transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-ai-purple transition-colors">AI Agents</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-ai-purple transition-colors">About</a></li>
              <li><a href="#" className="hover:text-ai-purple transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-ai-purple transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-ai-purple transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-ai-purple transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Creator Copilot AI. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            {/* Social Icons Placeholder */}
          </div>
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-ai-purple/5 blur-[100px] rounded-full" />
    </footer>
  );
}
