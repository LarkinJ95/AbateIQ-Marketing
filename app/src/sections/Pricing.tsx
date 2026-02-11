import { Check, X, ArrowRight, Building2, Users, Zap, Crown } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    icon: Zap,
    price: '$29',
    period: '/ user / month',
    billing: 'Billed annually',
    description: 'For small teams managing basic surveys and monitoring.',
    seats: '3–5 seats',
    features: [
      { text: 'Surveys & Inspections', included: true },
      { text: 'Air Monitoring Entry', included: true },
      { text: 'Basic Reporting', included: true },
      { text: 'Equipment Tracking', included: true },
      { text: 'Standard support', included: true },
      { text: 'NEA automation', included: false },
      { text: 'Exposure intelligence engine', included: false },
      { text: 'Trend dashboards', included: false },
    ],
    cta: 'Start Free Trial',
    ctaStyle: 'secondary',
    popular: false,
  },
  {
    name: 'Pro',
    icon: Users,
    price: '$69',
    period: '/ user / month',
    billing: 'Billed annually',
    description: 'For active compliance programs.',
    seats: '10–25 seats',
    features: [
      { text: 'Everything in Starter', included: true },
      { text: 'Regulatory Exposure Matrix', included: true },
      { text: 'Automatic Exceedance Engine', included: true },
      { text: 'NEA Management', included: true },
      { text: 'Monitoring Recommendations', included: true },
      { text: 'Fit Test Tracking', included: true },
      { text: 'Audit export tools', included: true },
      { text: 'Priority support', included: false },
    ],
    cta: 'Start 14-Day Trial',
    ctaStyle: 'primary',
    popular: true,
  },
  {
    name: 'Business',
    icon: Building2,
    price: '$119',
    period: '/ user / month',
    billing: 'Billed annually',
    description: 'For larger EHS teams with multi-site operations.',
    seats: '25+ seats',
    features: [
      { text: 'Everything in Pro', included: true },
      { text: 'Task-Based Exposure Profiles', included: true },
      { text: 'Smart Similarity Detection', included: true },
      { text: 'Exposure Trend Dashboards', included: true },
      { text: 'Multi-org support', included: true },
      { text: 'Advanced filters', included: true },
      { text: 'Priority support', included: true },
      { text: 'API access', included: false },
    ],
    cta: 'Talk to Sales',
    ctaStyle: 'secondary',
    popular: false,
  },
  {
    name: 'Enterprise',
    icon: Crown,
    price: 'Custom',
    period: 'Pricing',
    billing: 'Tailored to your needs',
    description: 'For regulated enterprises and multi-division organizations.',
    seats: 'Unlimited seats',
    features: [
      { text: 'Unlimited seats', included: true },
      { text: 'White labeling', included: true },
      { text: 'API access', included: true },
      { text: 'Dedicated onboarding', included: true },
      { text: 'SLA & compliance guarantees', included: true },
      { text: 'Custom retention policy', included: true },
      { text: 'Enterprise analytics', included: true },
      { text: '24/7 phone support', included: true },
    ],
    cta: 'Request Enterprise Demo',
    ctaStyle: 'dark',
    popular: false,
  },
];

const addOns = [
  'Extended Data Retention (10+ years)',
  'Audit Defense Package',
  'Advanced Analytics Module',
  'API Access',
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-graphite mb-6">
            Simple, Transparent Pricing{' '}
            <span className="text-safety-yellow">Built for Compliance Teams</span>
          </h2>
          <p className="text-lg text-steel">
            Seat-based pricing with feature tiers that scale with your
            organization.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-xl overflow-hidden ${
                plan.popular
                  ? 'ring-2 ring-safety-yellow shadow-xl lg:scale-105 lg:-my-4'
                  : 'border border-gray-200 shadow-sm'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-safety-yellow text-graphite-dark text-center py-2 text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <div className={`p-6 ${plan.popular ? 'pt-14' : ''}`}>
                {/* Plan Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      plan.popular
                        ? 'bg-safety-yellow/10'
                        : 'bg-gray-100'
                    }`}
                  >
                    <plan.icon
                      className={`w-5 h-5 ${
                        plan.popular ? 'text-safety-yellow' : 'text-gray-600'
                      }`}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-graphite">
                    {plan.name}
                  </h3>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-graphite">
                      {plan.price}
                    </span>
                    <span className="text-steel text-sm">{plan.period}</span>
                  </div>
                  <p className="text-steel text-sm">{plan.billing}</p>
                </div>

                {/* Description */}
                <p className="text-steel text-sm mb-4">{plan.description}</p>

                {/* Seats */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm text-graphite mb-6">
                  <Users className="w-4 h-4" />
                  {plan.seats}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <li
                      key={fIndex}
                      className="flex items-start gap-3"
                    >
                      {feature.included ? (
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <X className="w-3 h-3 text-gray-400" />
                        </div>
                      )}
                      <span
                        className={`text-sm ${
                          feature.included ? 'text-graphite' : 'text-gray-400'
                        }`}
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#contact"
                  className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-sm transition-all hover:-translate-y-0.5 ${
                    plan.ctaStyle === 'primary'
                      ? 'bg-safety-yellow text-graphite-dark hover:bg-safety-yellow-hover'
                      : plan.ctaStyle === 'dark'
                      ? 'bg-graphite text-white hover:bg-graphite-light'
                      : 'border-2 border-gray-200 text-graphite hover:border-graphite hover:bg-gray-50'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Add-ons */}
        <div className="mt-12 text-center">
          <p className="text-steel text-sm mb-4">Optional Add-Ons:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {addOns.map((addon, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-graphite"
              >
                <Check className="w-4 h-4 text-safety-yellow" />
                {addon}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
