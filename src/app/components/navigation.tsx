import { Button } from "./ui/button";

interface NavigationProps {
  onLoginClick: () => void;
  onStartTrialClick: () => void;
}

export function Navigation({ onLoginClick, onStartTrialClick }: NavigationProps) {
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
            <a href="#platform" className="text-gray-300 hover:text-white transition">
              Platform
            </a>
            <a href="#operations" className="text-gray-300 hover:text-white transition">
              Operations
            </a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition">
              Pricing
            </a>
            <a href="#demo" className="text-gray-300 hover:text-white transition">
              Demo
            </a>
            <a href="#contact" className="text-gray-300 hover:text-white transition">
              Contact
            </a>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              className="text-white hover:text-[#fbbf24]"
              onClick={onLoginClick}
            >
              Login
            </Button>
            <Button
              className="bg-[#fbbf24] hover:bg-[#f59e0b] text-black"
              onClick={onStartTrialClick}
            >
              Start Free Trial
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
