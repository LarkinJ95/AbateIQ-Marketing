import { Check, X, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";

interface PricingSectionProps {
  onStartTrialClick: () => void;
  onContactSalesClick: () => void;
}

type PlanAction = "trial" | "sales";

export function PricingSection({
  onStartTrialClick,
  onContactSalesClick,
}: PricingSectionProps) {
  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "/ user / month",
      billing: "Billed annually",
      description: "For teams running core EHS operations workflows.",
      cta: "Start Free Trial",
      ctaVariant: "outline" as const,
      action: "trial" as PlanAction,
      features: [
        { text: "Air monitoring + exceedance tracking", included: true },
        { text: "Inspections & buildings", included: true },
        { text: "Budgets module", included: true },
        { text: "Reporting (PDF + Excel export)", included: true },
        { text: "Equipment & personnel compliance", included: true },
        { text: "NEAs & exposure trends", included: true },
        { text: "Admin & organization controls", included: false },
        { text: "Advanced role governance", included: false },
      ],
      popular: false,
      color: "#10b981",
    },
    {
      name: "Pro",
      price: "$69",
      period: "/ user / month",
      billing: "Billed annually",
      description: "For organizations that need stronger controls and auditability.",
      cta: "Start 14-Day Trial",
      ctaVariant: "default" as const,
      action: "trial" as PlanAction,
      features: [
        { text: "Everything in Starter", included: true },
        { text: "Admin & organization controls", included: true },
        { text: "Role-based permissions + seat management", included: true },
        { text: "Auditability workflows", included: true },
        { text: "Expanded reporting controls", included: true },
        { text: "Priority support", included: true },
      ],
      popular: true,
      color: "#3b82f6",
    },
    {
      name: "Business",
      price: "$119",
      period: "/ user / month",
      billing: "Billed annually",
      description: "For multi-site programs with heavier operational demands.",
      cta: "Talk to Sales",
      ctaVariant: "outline" as const,
      action: "sales" as PlanAction,
      features: [
        { text: "Everything in Pro", included: true },
        { text: "Cross-site operational views", included: true },
        { text: "Program-level reporting controls", included: true },
        { text: "Operational governance support", included: true },
        { text: "High-volume workflow support", included: true },
      ],
      popular: false,
      color: "#8b5cf6",
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "Pricing",
      billing: "",
      description: "For regulated enterprises and multi-division organizations.",
      cta: "Request Enterprise Demo",
      ctaVariant: "default" as const,
      action: "sales" as PlanAction,
      features: [
        { text: "Everything in Business", included: true },
        { text: "Enterprise-only controls", included: true },
        { text: "Contracted compliance SLAs", included: true },
        { text: "Custom governance policies", included: true },
        { text: "Dedicated onboarding", included: true },
      ],
      popular: false,
      color: "#1f1f1f",
      dark: true,
    },
  ];

  const tierGates = [
    {
      label: "Starter and above",
      items: [
        "Air Monitoring",
        "NEAs & Exposure Trends",
        "Inspections & Buildings",
        "Equipment & Personnel Compliance",
        "Budgets",
        "Reporting",
      ],
    },
    {
      label: "Pro and above",
      items: [
        "Admin & Organization Controls",
        "Role-based permissions",
        "Seat management and auditability",
      ],
    },
    {
      label: "Enterprise only",
      items: [
        "Custom governance controls",
        "Enterprise compliance agreements",
      ],
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl mb-4 text-gray-900">
            Pricing That Maps to Real Platform Access
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Feature availability is gated by tier to match operational and governance needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
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
                <div className="mb-2">
                  <span className={`text-4xl ${plan.dark ? "text-white" : "text-gray-900"}`}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className={`text-sm ml-2 ${plan.dark ? "text-gray-400" : "text-gray-600"}`}>
                      {plan.period}
                    </span>
                  )}
                </div>
                {plan.billing && (
                  <p className={`text-sm ${plan.dark ? "text-gray-400" : "text-gray-600"}`}>
                    {plan.billing}
                  </p>
                )}
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
                onClick={plan.action === "trial" ? onStartTrialClick : onContactSalesClick}
              >
                {plan.cta}
              </Button>

              <div className="space-y-3">
                {plan.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-start gap-2">
                    {feature.included ? (
                      <Check className={`w-5 h-5 flex-shrink-0 ${plan.dark ? "text-[#fbbf24]" : "text-green-600"}`} />
                    ) : (
                      <X className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                    <span
                      className={`text-sm ${
                        feature.included
                          ? plan.dark
                            ? "text-gray-100"
                            : "text-gray-900"
                          : "text-gray-400"
                      }`}
                    >
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-8 max-w-5xl mx-auto">
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
      </div>
    </section>
  );
}
