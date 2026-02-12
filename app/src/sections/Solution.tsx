import { Wind, FileCheck, BarChart3, Briefcase, Users2, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Wind,
    title: 'Air Monitoring + Exceedance Engine',
    description:
      'Automatically track air sampling data against PEL, TWA, and STEL thresholds. Get instant alerts when exceedances occur.',
    image: '/ui-air-monitoring.jpg',
    highlights: ['Real-time threshold monitoring', 'Automatic exceedance alerts', 'PEL/TWA/STEL tracking'],
  },
  {
    icon: FileCheck,
    title: 'NEA Automation',
    description:
      'Generate Notification of Exceedance reports automatically with pre-populated data, reducing creation time from hours to minutes.',
    image: '/ui-nea-automation.jpg',
    highlights: ['Auto-generated reports', 'Regulatory compliance', 'Digital signatures'],
  },
  {
    icon: BarChart3,
    title: 'Regulatory Exposure Matrix',
    description:
      'Built-in database of OSHA PELs, ACGIH TLVs, and other regulatory limits. Always stay current with automatic updates.',
    image: '/ui-exposure-matrix.jpg',
    highlights: ['OSHA PEL database', 'ACGIH TLV integration', 'Automatic updates'],
  },
  {
    icon: Briefcase,
    title: 'Task-Based Exposure Profiles',
    description:
      'Create exposure profiles for specific tasks and job roles. Identify high-risk activities and implement controls proactively.',
    image: '/ui-compliance-dashboard.jpg',
    highlights: ['Job role mapping', 'Risk categorization', 'Control recommendations'],
  },
  {
    icon: Users2,
    title: 'Personnel Compliance Tracking',
    description:
      'Centralize fit test records, medical surveillance, and training certifications. Never miss a compliance deadline.',
    image: '/ui-compliance-dashboard.jpg',
    highlights: ['Fit test tracking', 'Medical records', 'Training alerts'],
  },
  {
    icon: Sparkles,
    title: 'Smart Similarity Detection',
    description:
      'AI-powered detection of similar exposure groups and patterns. Identify trends before they become problems.',
    image: '/ui-exposure-matrix.jpg',
    highlights: ['Pattern recognition', 'Trend analysis', 'Predictive insights'],
  },
];

export default function Solution() {
  return (
    <section id="solution" className="py-20 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-safety-yellow/10 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-safety-yellow" />
            <span className="text-graphite text-sm font-medium">
              The Complete Solution
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-graphite mb-6">
            AbateIQ Centralizes Your{' '}
            <span className="text-safety-yellow">Exposure Intelligence</span>
          </h2>
          <p className="text-lg text-steel">
            Everything you need to manage industrial hygiene compliance in one
            integrated platform.
          </p>
        </div>

        {/* Features Grid */}
        <div className="space-y-16 lg:space-y-24">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Content */}
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="w-12 h-12 bg-safety-yellow/10 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-safety-yellow" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-graphite mb-4">
                  {feature.title}
                </h3>
                <p className="text-steel text-lg mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <ul className="space-y-3">
                  {feature.highlights.map((highlight, hIndex) => (
                    <li
                      key={hIndex}
                      className="flex items-center gap-3 text-graphite"
                    >
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-3 h-3 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image */}
              <div
                className={`relative ${
                  index % 2 === 1 ? 'lg:order-1' : ''
                }`}
              >
                <div className="relative rounded-xl overflow-hidden shadow-xl border border-gray-200">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-auto"
                  />
                </div>
                {/* Decorative Element */}
                <div
                  className={`absolute -z-10 w-full h-full bg-safety-yellow/20 rounded-xl ${
                    index % 2 === 0
                      ? '-bottom-4 -right-4'
                      : '-bottom-4 -left-4'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
