import { ArrowRight, Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-graphite-dark via-graphite to-graphite-light overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 lg:pt-40 pb-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-gray-300 text-sm">
              Trusted by 500+ EHS teams nationwide
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Industrial Hygiene & EHS{' '}
            <span className="text-safety-yellow">Compliance Software</span> Built
            for Defensibility.
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Manage surveys, air monitoring, NEAs, personnel compliance, and
            exposure intelligence in one platform.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-safety-yellow text-graphite-dark font-semibold rounded-lg hover:bg-safety-yellow-hover transition-all hover:-translate-y-0.5"
            >
              Start Free Trial
              <ArrowRight size={18} />
            </a>
            <a
              href="#demo"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-lg hover:bg-white/5 transition-all"
            >
              <Play size={18} className="fill-current" />
              See It In Action
            </a>
          </div>
        </div>

        {/* Product UI Mockups */}
        <div className="relative max-w-6xl mx-auto">
          {/* Main Dashboard Image */}
          <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10">
            <img
              src="/ui-compliance-dashboard.jpg"
              alt="AbateIQ Compliance Dashboard"
              className="w-full h-auto"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-graphite-dark/60 via-transparent to-transparent" />
          </div>

          {/* Floating Cards */}
          <div className="hidden lg:block absolute -left-8 top-1/4 w-64 rounded-lg overflow-hidden shadow-xl border border-white/10 transform -rotate-6 hover:rotate-0 transition-transform duration-500">
            <img
              src="/ui-exposure-matrix.jpg"
              alt="Exposure Matrix"
              className="w-full h-auto"
            />
          </div>

          <div className="hidden lg:block absolute -right-8 top-1/3 w-64 rounded-lg overflow-hidden shadow-xl border border-white/10 transform rotate-6 hover:rotate-0 transition-transform duration-500">
            <img
              src="/ui-air-monitoring.jpg"
              alt="Air Monitoring"
              className="w-full h-auto"
            />
          </div>

          <div className="hidden lg:block absolute right-1/4 -bottom-8 w-56 rounded-lg overflow-hidden shadow-xl border border-white/10 transform translate-y-1/2">
            <img
              src="/ui-nea-automation.jpg"
              alt="NEA Automation"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
