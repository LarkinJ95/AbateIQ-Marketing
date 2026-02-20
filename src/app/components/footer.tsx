export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-white py-12 text-[var(--muted-foreground)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="mb-4 text-2xl text-[var(--text)]">
              Abate<span className="text-[#2563eb]">IQ</span>
            </div>
            <p className="text-sm">
              Industrial Hygiene & EHS Compliance Software Built for Defensibility.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-[var(--text)]">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/features" className="hover:text-[#2563eb] transition">Features</a></li>
              <li><a href="/pricing" className="hover:text-[#2563eb] transition">Pricing</a></li>
              <li><a href="/asbestos-survey-software" className="hover:text-[#2563eb] transition">Asbestos Surveys</a></li>
              <li><a href="/air-monitoring-software" className="hover:text-[#2563eb] transition">Air Monitoring</a></li>
              <li><a href="/nea-reporting-software" className="hover:text-[#2563eb] transition">NEA Reporting</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[var(--text)]">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/resources" className="hover:text-[#2563eb] transition">Resource Hub</a></li>
              <li><a href="/resources/blog" className="hover:text-[#2563eb] transition">Blog</a></li>
              <li><a href="/resources/guides" className="hover:text-[#2563eb] transition">Guides</a></li>
              <li><a href="/resources/templates" className="hover:text-[#2563eb] transition">Templates</a></li>
              <li><a href="/resources/brand/press-kit" className="hover:text-[#2563eb] transition">Press Kit</a></li>
              <li><a href="mailto:support@abateiq.com" className="hover:text-[#2563eb] transition">Support</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[var(--text)]">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/company" className="hover:text-[#2563eb] transition">Company</a></li>
              <li><a href="/login" className="hover:text-[#2563eb] transition">Login</a></li>
              <li><a href="/company" className="hover:text-[#2563eb] transition">Book Demo</a></li>
              <li><a href="https://abateiq.com/privacy" className="hover:text-[#2563eb] transition">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--border)] pt-8 text-center text-sm">
          <p>&copy; 2026 AbateIQ. All rights reserved. Built for compliance professionals.</p>
        </div>
      </div>
    </footer>
  );
}
