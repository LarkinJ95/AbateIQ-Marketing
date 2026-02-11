import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Shield, Database, Download, Building2, Users, Palette } from 'lucide-react';

const faqs = [
  {
    icon: Shield,
    question: 'Is this OSHA compliant?',
    answer:
      'Yes, AbateIQ is designed to meet OSHA recordkeeping requirements for industrial hygiene data. Our platform helps you maintain defensible documentation for air monitoring, exposure assessments, and NEAs. We regularly update our regulatory exposure matrix to reflect current PELs, TLVs, and other occupational exposure limits.',
  },
  {
    icon: Database,
    question: 'How long is data retained?',
    answer:
      'Standard plans include 7-year data retention, which meets most regulatory requirements. Business and Enterprise plans can extend retention to 10+ years. Enterprise customers can also configure custom retention policies to meet specific industry or organizational requirements.',
  },
  {
    icon: Download,
    question: 'Can we export everything for audits?',
    answer:
      'Absolutely. AbateIQ provides comprehensive audit export tools that generate complete data packages including all monitoring records, NEAs, personnel compliance data, and audit trails. Exports are available in multiple formats (PDF, Excel, CSV) and include digital signatures and timestamps for defensibility.',
  },
  {
    icon: Building2,
    question: 'Do you support multi-site organizations?',
    answer:
      'Yes, our Business and Enterprise plans include multi-site and multi-organization support. You can manage separate facilities with their own data while maintaining consolidated reporting at the corporate level. Role-based access controls ensure site managers only see their relevant data.',
  },
  {
    icon: Users,
    question: 'How are seats counted?',
    answer:
      'Seats are counted per active user who needs to log into the system. This includes industrial hygienists, EHS managers, inspectors, and administrators. View-only accounts for executives or auditors do not count against your seat limit. You can add or remove seats at any time with prorated billing.',
  },
  {
    icon: Palette,
    question: 'Is white labeling available?',
    answer:
      'White labeling is available on our Enterprise plan. This includes custom branding with your company logo, colors, and domain. Enterprise customers can also customize email notifications, report templates, and even specific terminology to match your organization\'s standards.',
  },
];

export default function FAQ() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-graphite mb-6">
            Frequently Asked <span className="text-safety-yellow">Questions</span>
          </h2>
          <p className="text-lg text-steel">
            Everything you need to know about AbateIQ.
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-gray-200 rounded-lg px-6 data-[state=open]:border-safety-yellow/50 data-[state=open]:shadow-md transition-all"
            >
              <AccordionTrigger className="py-5 hover:no-underline">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-10 h-10 bg-safety-yellow/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <faq.icon className="w-5 h-5 text-safety-yellow" />
                  </div>
                  <span className="text-lg font-semibold text-graphite">
                    {faq.question}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-5 pl-14">
                <p className="text-steel leading-relaxed">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Additional Help */}
        <div className="mt-12 text-center p-8 bg-gray-50 rounded-xl">
          <h3 className="text-lg font-semibold text-graphite mb-2">
            Still have questions?
          </h3>
          <p className="text-steel mb-4">
            Our team is here to help. Reach out and we will get back to you within
            24 hours.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-safety-yellow hover:text-safety-yellow-hover font-semibold"
          >
            Contact Support
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
