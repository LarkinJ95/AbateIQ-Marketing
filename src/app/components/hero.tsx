import { Button } from "./ui/button";
import platformScreenshot from "../../assets/768c10f1b83fa1b26591f519553e879a6ae1c7ee.png";

interface HeroProps {
  onStartTrialClick: () => void;
  onViewPricingClick: () => void;
}

export function Hero({ onStartTrialClick, onViewPricingClick }: HeroProps) {
  return (
    <section id="hero" className="relative bg-[#2a2a2a] text-white overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="mb-6 text-4xl lg:text-6xl tracking-tight">
            Full EHS Operations Platform for Industrial Hygiene Teams.
          </h1>
          <p className="text-lg lg:text-xl text-gray-300 mb-8">
            Run monitoring, inspections, budgets, reporting, and admin controls from a single defensible system of record.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-[#fbbf24] hover:bg-[#f59e0b] text-black px-8"
              onClick={onStartTrialClick}
            >
              Start for Free Today
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-black bg-white/10"
              onClick={onViewPricingClick}
            >
              View Pricing / Open App
            </Button>
          </div>

          <div className="mt-6 flex flex-col gap-2 text-sm text-gray-300">
            <p>NEAs + Budgets available in Starter and above.</p>
            <p>Regulatory Matrix editing available in Pro and above.</p>
            <p>Multi-org/API available in Enterprise.</p>
          </div>
        </div>
        
        {/* Product Screenshot */}
        <div className="relative max-w-6xl mx-auto">
          <div className="rounded-lg overflow-hidden shadow-2xl border border-gray-700">
            <img 
              src={platformScreenshot}
              alt="AbateIQ Platform Screenshot"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
