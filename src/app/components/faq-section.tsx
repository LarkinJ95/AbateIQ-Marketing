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
      answer:
        "Yes. AbateIQ is built around OSHA thresholds including PEL, TWA, STEL, and EL calculations, with defensible records and audit-ready workflows.",
    },
    {
      question: "Can we export everything for audits?",
      answer:
        "PDF reporting is available across plans. Bulk Excel/CSV exports are available in Starter and above.",
    },
    {
      question: "Do you support multi-site organizations?",
      answer:
        "Yes. Enterprise supports multi-org operations so you can manage compliance across multiple sites, divisions, or client organizations with centralized reporting and site-specific permissions.",
    },
    {
      question: "How are seats counted?",
      answer:
        "Seats are active users with login access. Free supports up to 2 seats, Starter up to 10, and Pro up to 25.",
    },
    {
      question: "What happens when we hit the seat cap?",
      answer:
        "You can keep current users active, but adding users above your cap requires upgrading to the next plan.",
    },
    {
      question: "Is white labeling available?",
      answer:
        "Yes. White labeling is available on Pro and Enterprise plans.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-white">
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
