export function Footer() {
  return (
    <footer className="bg-[#1f1f1f] text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="text-2xl text-white mb-4">
              Abate<span className="text-[#60a5fa]">IQ</span>
            </div>
            <p className="text-sm text-gray-400">
              Industrial Hygiene & EHS Compliance Software Built for Defensibility.
            </p>
          </div>
          
          {/* Product */}
          <div>
            <h4 className="text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#platform" className="hover:text-[#fbbf24] transition">Platform Overview</a></li>
              <li><a href="#ios-release" className="hover:text-[#fbbf24] transition">iOS Release</a></li>
              <li><a href="#pricing" className="hover:text-[#fbbf24] transition">Pricing</a></li>
              <li><a href="#operations" className="hover:text-[#fbbf24] transition">Operations Modules</a></li>
              <li><a href="#built-for" className="hover:text-[#fbbf24] transition">Built For</a></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="https://docs.abateiq.com" className="hover:text-[#fbbf24] transition">Documentation</a></li>
              <li><a href="https://abateiq.com/blog" className="hover:text-[#fbbf24] transition">Blog</a></li>
              <li><a href="mailto:support@abateiq.com" className="hover:text-[#fbbf24] transition">Support</a></li>
              <li><a href="https://docs.abateiq.com/api" className="hover:text-[#fbbf24] transition">API Reference</a></li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h4 className="text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="https://abateiq.com/about" className="hover:text-[#fbbf24] transition">About</a></li>
              <li><a href="https://abateiq.com/careers" className="hover:text-[#fbbf24] transition">Careers</a></li>
              <li><a href="https://abateiq.com/privacy" className="hover:text-[#fbbf24] transition">Privacy Policy</a></li>
              <li><a href="https://abateiq.com/terms" className="hover:text-[#fbbf24] transition">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2026 AbateIQ. All rights reserved. Built for compliance professionals.</p>
        </div>
      </div>
    </footer>
  );
}
