export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[#e2e8f0] bg-white/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl text-[#0f172a]">
              Abate<span className="text-[#2563eb]">IQ</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="/features" className="text-[#334155] hover:text-[#0f172a] transition">
              Features
            </a>
            <a href="/pricing" className="text-[#334155] hover:text-[#0f172a] transition">
              Pricing
            </a>
            <a href="/resources" className="text-[#334155] hover:text-[#0f172a] transition">
              Resources
            </a>
            <a href="/login" className="text-[#334155] hover:text-[#0f172a] transition">
              Login
            </a>
            <a
              href="/company"
              className="rounded-md bg-[#2563eb] px-4 py-2 text-sm font-medium text-white hover:bg-[#1d4ed8] transition"
            >
              Book Demo
            </a>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <a href="/login" className="text-sm text-[#334155] hover:text-[#0f172a] transition">
              Login
            </a>
            <a
              href="/company"
              className="rounded-md bg-[#2563eb] px-3 py-2 text-sm font-medium text-white hover:bg-[#1d4ed8] transition"
            >
              Book Demo
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
