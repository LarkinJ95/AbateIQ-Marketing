import { Button } from "./ui/button";

interface NavigationProps {
  onStartTrialClick: () => void;
}

export function Navigation({ onStartTrialClick }: NavigationProps) {
  return (
    <nav className="bg-[#1f1f1f] border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl text-white">
              Abate<span className="text-[#60a5fa]">IQ</span>
            </span>
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/features" className="text-gray-300 hover:text-white transition">
              Features
            </a>
            <a href="/pricing" className="text-gray-300 hover:text-white transition">
              Pricing
            </a>
            <a href="/resources" className="text-gray-300 hover:text-white transition">
              Resources
            </a>
            <a href="/login" className="text-gray-300 hover:text-white transition">
              Login
            </a>
            <a href="/company" className="text-gray-300 hover:text-white transition">
              Contact
            </a>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <a href="/login" className="text-white hover:text-[#fbbf24] transition">
              Login
            </a>
            <Button
              className="bg-[#fbbf24] hover:bg-[#f59e0b] text-black"
              onClick={onStartTrialClick}
            >
              Start for Free Today
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
