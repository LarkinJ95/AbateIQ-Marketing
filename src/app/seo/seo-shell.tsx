import type { ReactNode } from "react";

interface ShellProps {
  children: ReactNode;
}

const seoLinks = [
  { label: "Asbestos Survey", href: "/asbestos-survey-software" },
  { label: "Air Monitoring", href: "/air-monitoring-software" },
  { label: "Industrial Hygiene", href: "/industrial-hygiene-software" },
  { label: "NEA Reporting", href: "/nea-reporting-software" },
  { label: "Resources", href: "/resources" },
];

export function SeoShell({ children }: ShellProps) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="/" className="text-2xl text-[#111827]">
            Abate<span className="text-[#2563eb]">IQ</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            {seoLinks.map((item) => (
              <a key={item.href} href={item.href} className="text-gray-700 hover:text-[#2563eb]">
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="/#pricing"
            className="rounded-md bg-[#fbbf24] px-4 py-2 text-sm font-medium text-black hover:bg-[#f59e0b]"
          >
            Start for Free Today
          </a>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-gray-200 bg-gray-50 py-10">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-3">
          <div>
            <p className="text-lg text-gray-900">AbateIQ</p>
            <p className="mt-2 text-sm text-gray-600">
              Industrial hygiene software built for audit readiness, regulatory defensibility, and exposure intelligence.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Authority Pages</p>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li><a href="/osha-compliance-software" className="hover:text-[#2563eb]">OSHA Compliance Software</a></li>
              <li><a href="/environmental-compliance-software" className="hover:text-[#2563eb]">Environmental Compliance Software</a></li>
              <li><a href="/ih-data-management-platform" className="hover:text-[#2563eb]">IH Data Management Platform</a></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Resources</p>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li><a href="/resources/blog" className="hover:text-[#2563eb]">Blog</a></li>
              <li><a href="/resources/guides" className="hover:text-[#2563eb]">Guides</a></li>
              <li><a href="/resources/templates" className="hover:text-[#2563eb]">Templates</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
