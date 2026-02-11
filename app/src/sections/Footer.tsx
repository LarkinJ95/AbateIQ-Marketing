import { Linkedin, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  product: [
    { label: 'Features', href: '#solution' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Demo', href: '#contact' },
    { label: 'API', href: '#' },
  ],
  solutions: [
    { label: 'Asbestos Management', href: '#' },
    { label: 'Lead Compliance', href: '#' },
    { label: 'Silica Monitoring', href: '#' },
    { label: 'Multi-Site EHS', href: '#' },
  ],
  resources: [
    { label: 'Documentation', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Case Studies', href: '#' },
    { label: 'Webinars', href: '#' },
  ],
  company: [
    { label: 'About Us', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#contact' },
    { label: 'Partners', href: '#' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Security', href: '#' },
    { label: 'Compliance', href: '#' },
  ],
};

const socialLinks = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="bg-graphite-dark border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-safety-yellow rounded flex items-center justify-center">
                <span className="text-graphite-dark font-bold text-sm">AI</span>
              </div>
              <span className="text-white font-semibold text-xl tracking-tight">
                Abate<span className="text-safety-yellow">IQ</span>
              </span>
            </a>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Industrial hygiene compliance software built for defensibility.
            </p>
            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="mailto:info@abateiq.com"
                className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
              >
                <Mail className="w-4 h-4" />
                info@abateiq.com
              </a>
              <a
                href="tel:+1-800-555-0123"
                className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
              >
                <Phone className="w-4 h-4" />
                1-800-555-0123
              </a>
              <div className="flex items-start gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Denver, CO</span>
              </div>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-white font-semibold mb-4">Solutions</h4>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} AbateIQ. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-all"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
