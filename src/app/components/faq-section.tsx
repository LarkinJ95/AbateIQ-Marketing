import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export function FAQSection() {
  const faqs = [
    {
      question: "Is this OSHA compliant?",
      answer: "Yes. AbateIQ is built around OSHA regulatory thresholds including PEL, TWA, STEL, and EL calculations. Our NEA automation follows OSHA 1910.1001 and related standards for defensible documentation. All data retention and audit export tools are designed to meet OSHA inspection requirements."
    },
    {
      question: "How long is data retained?",
      answer: "Standard plans include 7 years of data retention, meeting most regulatory requirements. Extended Data Retention (10+ years) is available as an add-on for organizations with longer compliance obligations or specific state/local requirements."
    },
    {
      question: "Can we export everything for audits?",
      answer: "Absolutely. All Pro plans and above include comprehensive audit export tools that generate complete compliance packages including surveys, monitoring data, NEAs, personnel records, and exposure intelligence reports in PDF and Excel formats."
    },
    {
      question: "Do you support multi-site organizations?",
      answer: "Yes. Business and Enterprise plans include multi-org support, allowing you to manage compliance across multiple sites, divisions, or client organizations with centralized reporting and site-specific permissions."
    },
    {
      question: "How are seats counted?",
      answer: "Seats are based on active users who need login access. View-only users for audit purposes don't count against your seat limit. You can add or remove seats at any time, with changes reflected in your next billing cycle."
    },
    {
      question: "Is white labeling available?",
      answer: "White labeling is available exclusively on Enterprise plans. This includes custom branding, domain configuration, and client-facing report customization for consulting firms and third-party administrators."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl mb-4 text-gray-900">
            Frequently Asked Questions
          </h2>
        </div>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-gray-200 rounded-lg px-6 bg-gray-50"
            >
              <AccordionTrigger className="text-left text-lg hover:text-[#fbbf24]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pt-2">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
