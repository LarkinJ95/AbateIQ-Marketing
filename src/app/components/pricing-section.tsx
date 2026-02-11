import { Check, X, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";

export function PricingSection() {
  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "/ user / month",
      billing: "Billed annually",
      description: "For small teams managing basic surveys and monitoring.",
      cta: "Start Free Trial",
      ctaVariant: "outline" as const,
      features: [
        { text: "Surveys & Inspections", included: true },
        { text: "Air Monitoring Entry", included: true },
        { text: "Basic Reporting", included: true },
        { text: "Equipment Tracking", included: true },
        { text: "3–5 seats", included: true },
        { text: "Standard support", included: true },
        { text: "NEA automation", included: false },
        { text: "Exposure intelligence engine", included: false },
        { text: "Trend dashboards", included: false }
      ],
      popular: false,
      color: "#10b981"
    },
    {
      name: "Pro",
      price: "$69",
      period: "/ user / month",
      billing: "Billed annually",
      description: "For active compliance programs.",
      cta: "Start 14-Day Trial",
      ctaVariant: "default" as const,
      features: [
        { text: "Everything in Starter", included: true },
        { text: "Regulatory Exposure Matrix", included: true },
        { text: "Automatic Exceedance Engine", included: true },
        { text: "NEA Management", included: true },
        { text: "Monitoring Recommendations", included: true },
        { text: "Fit Test Tracking", included: true },
        { text: "10–25 seats", included: true },
        { text: "Audit export tools", included: true }
      ],
      popular: true,
      color: "#3b82f6"
    },
    {
      name: "Business",
      price: "$119",
      period: "/ user / month",
      billing: "Billed annually",
      description: "For larger EHS teams with multi-site operations.",
      cta: "Talk to Sales",
      ctaVariant: "outline" as const,
      features: [
        { text: "Everything in Pro", included: true },
        { text: "Task-Based Exposure Profiles", included: true },
        { text: "Smart Similarity Detection", included: true },
        { text: "Exposure Trend Dashboards", included: true },
        { text: "Multi-org support", included: true },
        { text: "Advanced filters", included: true },
        { text: "25+ seats", included: true },
        { text: "Priority support", included: true }
      ],
      popular: false,
      color: "#8b5cf6"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "Pricing",
      billing: "",
      description: "For regulated enterprises and multi-division organizations.",
      cta: "Request Enterprise Demo",
      ctaVariant: "default" as const,
      features: [
        { text: "Unlimited seats", included: true },
        { text: "White labeling", included: true },
        { text: "API access", included: true },
        { text: "Dedicated onboarding", included: true },
        { text: "SLA & compliance guarantees", included: true },
        { text: "Custom retention policy", included: true },
        { text: "Enterprise analytics", included: true }
      ],
      popular: false,
      color: "#1f1f1f",
      dark: true
    }
  ];

  const addOns = [
    "Extended Data Retention (10+ years)",
    "Audit Defense Package",
    "Advanced Analytics Module",
    "API Access"
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl mb-4 text-gray-900">
            Simple, Transparent Pricing Built for Compliance Teams
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Seat-based pricing with feature tiers that scale with your organization.
          </p>
        </div>
        
        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative rounded-lg border-2 p-8 ${
                plan.popular 
                  ? 'border-[#3b82f6] shadow-xl scale-105 bg-white' 
                  : plan.dark 
                  ? 'border-gray-800 bg-[#2a2a2a] text-white'
                  : 'border-gray-200 bg-white'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#3b82f6] text-white px-4 py-1 rounded-full text-sm flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  Most Popular
                </div>
              )}
              
              <div className="mb-6">
                <h3 className={`text-2xl mb-2 ${plan.dark ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <div className="mb-2">
                  <span className={`text-4xl ${plan.dark ? 'text-white' : 'text-gray-900'}`}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className={`text-sm ml-2 ${plan.dark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {plan.period}
                    </span>
                  )}
                </div>
                {plan.billing && (
                  <p className={`text-sm ${plan.dark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {plan.billing}
                  </p>
                )}
                <p className={`mt-4 text-sm ${plan.dark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {plan.description}
                </p>
              </div>
              
              <Button 
                className={`w-full mb-6 ${
                  plan.popular || plan.dark
                    ? 'bg-[#fbbf24] hover:bg-[#f59e0b] text-black'
                    : 'border-2 border-gray-300 hover:border-[#fbbf24]'
                }`}
                variant={plan.ctaVariant}
              >
                {plan.cta}
              </Button>
              
              <div className="space-y-3">
                {plan.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-start gap-2">
                    {feature.included ? (
                      <Check className={`w-5 h-5 flex-shrink-0 ${
                        plan.dark ? 'text-[#fbbf24]' : 'text-green-600'
                      }`} />
                    ) : (
                      <X className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                    <span className={`text-sm ${
                      feature.included 
                        ? plan.dark ? 'text-gray-100' : 'text-gray-900'
                        : 'text-gray-400'
                    }`}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Add-ons */}
        <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl mb-6 text-gray-900">Optional Add-Ons:</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {addOns.map((addOn, index) => (
              <div key={index} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-[#fbbf24] flex-shrink-0" />
                <span className="text-gray-700">{addOn}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
