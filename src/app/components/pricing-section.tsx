import { Check, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";

interface PricingSectionProps {
  onStartTrialClick: () => void;
  onContactSalesClick: () => void;
}

type PlanAction = "start" | "sales";

export function PricingSection({
  onStartTrialClick,
  onContactSalesClick,
}: PricingSectionProps) {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "",
      billing: "Always free",
      seats: "Seat cap: 2",
      description: "For individuals and very small teams running core compliance workflows.",
      cta: "Start for Free Today",
      ctaVariant: "outline" as const,
      action: "start" as PlanAction,
      features: [
        "Surveys (FAs, HAs, samples, photos, observations, floor plans)",
        "Air Monitoring (core module access)",
        "Equipment tracking",
        "Core inspections workflows",
        "Survey report generation (PDF)",
      ],
      popular: false,
      dark: false,
    },
    {
      name: "Starter",
      price: "$39",
      period: "/ user / month",
      billing: "$400 / user / year",
      seats: "Seat cap: 10",
      description: "For teams that need NEAs, budgets, trends, and export workflows.",
      cta: "Get Starter",
      ctaVariant: "default" as const,
      action: "start" as PlanAction,
      features: [
        "Everything in Free",
        "NEA Management",
        "Budgets",
        "Trend Dashboards / Exposure Trends",
        "Bulk Exports (Excel/CSV)",
      ],
      popular: true,
      dark: false,
    },
    {
      name: "Pro",
      price: "$69",
      period: "/ user / month",
      billing: "$750 / user / year",
      seats: "Seat cap: 25",
      description: "For organizations needing advanced controls and configuration depth.",
      cta: "Get Pro",
      ctaVariant: "outline" as const,
      action: "start" as PlanAction,
      features: [
        "Everything in Starter",
        "Regulatory Matrix Edit",
        "Operation Profiles / Task Profiles",
        "Monitoring Recommendations",
        "White Label",
        "Advanced filters / generative-report flags",
      ],
      popular: false,
      dark: false,
    },
    {
      name: "Enterprise",
      price: "Starting at $3,000",
      period: "/ month base + $149 / user / month",
      billing: "Annual contract required",
      seats: "Seat cap: Unlimited",
      description: "For multi-org programs requiring enterprise controls, API access, and procurement support.",
      cta: "Contact Sales",
      ctaVariant: "default" as const,
      action: "sales" as PlanAction,
      features: [
        "Everything in Pro",
        "All gated features enabled",
        "Multi-org flags",
        "API access flags",
        "Enterprise SLA and procurement posture",
      ],
      popular: false,
      dark: true,
    },
  ];

  const tierGates = [
    {
      label: "Starter and above",
      items: [
        "NEA Management",
        "Budgets",
        "Trend Dashboards / Exposure Trends",
        "Bulk Exports (Excel/CSV)",
      ],
    },
    {
      label: "Pro and above",
      items: [
        "Regulatory Matrix Edit",
        "Operation Profiles / Task Profiles",
        "Monitoring Recommendations",
        "White Label",
        "Advanced filters / generative-report flags",
      ],
    },
    {
      label: "Enterprise only",
      items: [
        "Multi-org flags",
        "API access flags",
        "Enterprise SLA / procurement support",
      ],
    },
  ];

  const billingFaq = [
    {
      question: "What counts as a seat?",
      answer: "A seat is an active user account with login access.",
    },
    {
      question: "What happens when we hit our seat cap?",
      answer: "You can keep current users active, but adding more seats requires upgrading to the next plan.",
    },
    {
      question: "How does annual vs monthly billing work?",
      answer: "Starter and Pro are available in monthly per-user pricing or discounted annual per-user pricing.",
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl mb-4 text-gray-900">
            Pricing That Matches the App
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Four plans only: Free, Starter, Pro, and Enterprise. No hidden tiers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-lg border-2 p-8 ${
                plan.popular
                  ? "border-[#3b82f6] shadow-xl scale-105 bg-white"
                  : plan.dark
                  ? "border-gray-800 bg-[#2a2a2a] text-white"
                  : "border-gray-200 bg-white"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#3b82f6] text-white px-4 py-1 rounded-full text-sm flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-2xl mb-2 ${plan.dark ? "text-white" : "text-gray-900"}`}>
                  {plan.name}
                </h3>
                <div className="mb-1">
                  <span className={`text-4xl ${plan.dark ? "text-white" : "text-gray-900"}`}>
                    {plan.price}
                  </span>
                </div>
                {plan.period && (
                  <p className={`text-sm ${plan.dark ? "text-gray-300" : "text-gray-700"}`}>
                    {plan.period}
                  </p>
                )}
                <p className={`text-sm ${plan.dark ? "text-gray-400" : "text-gray-600"}`}>
                  {plan.billing}
                </p>
                <p className={`text-sm mt-1 ${plan.dark ? "text-gray-400" : "text-gray-600"}`}>
                  {plan.seats}
                </p>
                <p className={`mt-4 text-sm ${plan.dark ? "text-gray-300" : "text-gray-600"}`}>
                  {plan.description}
                </p>
              </div>

              <Button
                className={`w-full mb-6 ${
                  plan.popular || plan.dark
                    ? "bg-[#fbbf24] hover:bg-[#f59e0b] text-black"
                    : "border-2 border-gray-300 hover:border-[#fbbf24]"
                }`}
                variant={plan.ctaVariant}
                onClick={plan.action === "start" ? onStartTrialClick : onContactSalesClick}
              >
                {plan.cta}
              </Button>

              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2">
                    <Check className={`w-5 h-5 flex-shrink-0 ${plan.dark ? "text-[#fbbf24]" : "text-green-600"}`} />
                    <span className={`text-sm ${plan.dark ? "text-gray-100" : "text-gray-900"}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-8 max-w-6xl mx-auto mb-10">
          <h3 className="text-2xl mb-6 text-gray-900">Tier Gate Reference</h3>
          <div className="grid md:grid-cols-3 gap-5">
            {tierGates.map((group) => (
              <div key={group.label} className="bg-white border border-gray-200 rounded-lg p-5">
                <h4 className="text-lg text-gray-900 mb-3">{group.label}</h4>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm text-gray-700 flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#fbbf24] mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-8 max-w-6xl mx-auto">
          <h3 className="text-2xl mb-6 text-gray-900">Pricing FAQ</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {billingFaq.map((item) => (
              <div key={item.question} className="bg-gray-50 rounded-lg border border-gray-200 p-5">
                <h4 className="text-base text-gray-900 mb-2">{item.question}</h4>
                <p className="text-sm text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
