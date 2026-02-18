import { Check, ArrowRight, Crown, Zap, Users } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    icon: Zap,
    price: '$0',
    period: '',
    billing: 'Always free',
    seats: 'Seat cap: 2',
    description: 'Core workflows for individuals and very small teams.',
    features: [
      'Surveys (FAs, HAs, samples, photos, observations, floor plans)',
      'Air Monitoring (core module access)',
      'Equipment tracking',
      'Core inspections workflows',
      'Survey report generation',
    ],
    cta: 'Start for Free Today',
    ctaStyle: 'secondary',
    href: '#contact',
    popular: false,
  },
  {
    name: 'Starter',
    icon: Users,
    price: '$39',
    period: '/ user / month',
    billing: '$400 / user / year',
    seats: 'Seat cap: 10',
    description: 'Adds NEAs, budgets, trends, and exports for growing teams.',
    features: [
      'Everything in Free',
      'NEA Management',
      'Budgets',
      'Trend Dashboards / Exposure Trends',
      'Bulk Exports (Excel/CSV)',
    ],
    cta: 'Get Starter',
    ctaStyle: 'primary',
    href: '#contact',
    popular: true,
  },
  {
    name: 'Pro',
    icon: Users,
    price: '$69',
    period: '/ user / month',
    billing: '$750 / user / year',
    seats: 'Seat cap: 25',
    description: 'Adds advanced regulatory controls and profile tooling.',
    features: [
      'Everything in Starter',
      'Regulatory Matrix Edit',
      'Operation Profiles / Task Profiles',
      'Monitoring Recommendations',
      'White Label',
      'Advanced filters / generative-report flags',
    ],
    cta: 'Get Pro',
    ctaStyle: 'secondary',
    href: '#contact',
    popular: false,
  },
  {
    name: 'Enterprise',
    icon: Crown,
    price: 'Starting at $3,000',
    period: '/ month base + $149 / user / month',
    billing: 'Annual contract required',
    seats: 'Seat cap: Unlimited',
    description: 'Enterprise controls with multi-org/API and procurement posture.',
    features: [
      'Everything in Pro',
      'All gated features enabled',
      'Multi-org flags',
      'API access flags',
      'SLA / procurement support',
    ],
    cta: 'Contact Sales',
    ctaStyle: 'dark',
    href: '#contact',
    popular: false,
  },
];

const billingFaq = [
  {
    question: 'What counts as a seat?',
    answer: 'A seat is an active user account with login access.',
  },
  {
    question: 'What happens when we hit the seat cap?',
    answer: 'Adding seats above your plan cap requires upgrading to the next plan.',
  },
  {
    question: 'How does annual vs monthly billing work?',
    answer: 'Starter and Pro support monthly per-user billing or discounted annual per-user billing.',
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-graphite mb-6">
            Four Plans. No Hidden Tiers.
          </h2>
          <p className="text-lg text-steel">
            Free, Starter, Pro, and Enterprise mapped to app feature gating.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 mb-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-xl overflow-hidden ${
                plan.popular
                  ? 'ring-2 ring-safety-yellow shadow-xl lg:scale-105 lg:-my-4'
                  : plan.ctaStyle === 'dark'
                  ? 'bg-graphite text-white border border-graphite'
                  : 'border border-gray-200 shadow-sm'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-safety-yellow text-graphite-dark text-center py-2 text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <div className={`p-6 ${plan.popular ? 'pt-14' : ''}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      plan.ctaStyle === 'dark' ? 'bg-white/10' : 'bg-gray-100'
                    }`}
                  >
                    <plan.icon
                      className={`w-5 h-5 ${
                        plan.ctaStyle === 'dark' ? 'text-safety-yellow' : 'text-gray-600'
                      }`}
                    />
                  </div>
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-sm opacity-80">{plan.period}</span>}
                  </div>
                  <p className="text-sm opacity-80">{plan.billing}</p>
                </div>

                <p className="text-sm mb-4 opacity-90">{plan.description}</p>

                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm mb-6 ${
                    plan.ctaStyle === 'dark' ? 'bg-white/10' : 'bg-gray-100 text-graphite'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  {plan.seats}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          plan.ctaStyle === 'dark' ? 'bg-white/15' : 'bg-green-100'
                        }`}
                      >
                        <Check className={`w-3 h-3 ${plan.ctaStyle === 'dark' ? 'text-safety-yellow' : 'text-green-600'}`} />
                      </div>
                      <span className={`text-sm ${plan.ctaStyle === 'dark' ? 'text-gray-100' : 'text-graphite'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={plan.href}
                  className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-sm transition-all hover:-translate-y-0.5 ${
                    plan.ctaStyle === 'primary'
                      ? 'bg-safety-yellow text-graphite-dark hover:bg-safety-yellow-hover'
                      : plan.ctaStyle === 'dark'
                      ? 'bg-white text-graphite hover:bg-gray-200'
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

        <div className="bg-white border border-gray-200 rounded-xl p-6 lg:p-8">
          <h3 className="text-2xl font-bold text-graphite mb-5">Pricing FAQ</h3>
          <div className="grid md:grid-cols-3 gap-5">
            {billingFaq.map((item) => (
              <div key={item.question} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-graphite mb-2">{item.question}</h4>
                <p className="text-sm text-steel">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
