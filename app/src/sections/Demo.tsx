import { ClipboardList, Activity, AlertCircle, FileText, LayoutDashboard, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: ClipboardList,
    number: '01',
    title: 'Create Survey',
    description:
      'Set up asbestos, lead, or silica surveys with customizable templates and checklists.',
    color: 'bg-blue-500',
  },
  {
    icon: Activity,
    number: '02',
    title: 'Add Monitoring',
    description:
      'Log air monitoring data with automatic PEL/TWA calculations and threshold tracking.',
    color: 'bg-green-500',
  },
  {
    icon: AlertCircle,
    number: '03',
    title: 'Exceedance Auto-Calculates',
    description:
      'System automatically detects exceedances and triggers alert workflows.',
    color: 'bg-yellow-500',
  },
  {
    icon: FileText,
    number: '04',
    title: 'NEA Generated',
    description:
      'Notification of Exceedance reports auto-generate with all required documentation.',
    color: 'bg-orange-500',
  },
  {
    icon: LayoutDashboard,
    number: '05',
    title: 'Dashboard Updates',
    description:
      'Real-time compliance dashboard shows status, trends, and action items.',
    color: 'bg-purple-500',
  },
];

export default function Demo() {
  return (
    <section id="demo" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-graphite mb-6">
            See How It <span className="text-safety-yellow">Works</span>
          </h2>
          <p className="text-lg text-steel">
            From survey creation to compliance reporting, AbateIQ streamlines
            your entire workflow.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-yellow-500 to-purple-500" />

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative group"
              >
                <div className="bg-gray-50 rounded-xl p-6 lg:p-8 border border-gray-100 hover:border-safety-yellow/50 hover:shadow-lg transition-all duration-300 h-full">
                  {/* Number Badge */}
                  <div
                    className={`w-12 h-12 ${step.color} rounded-lg flex items-center justify-center mb-5 shadow-lg`}
                  >
                    <step.icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Step Number */}
                  <div className="text-4xl font-bold text-gray-200 mb-3">
                    {step.number}
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-graphite mb-3">
                    {step.title}
                  </h3>
                  <p className="text-steel text-sm leading-relaxed">
                    {step.description}
                  </p>

                  {/* Arrow - Desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex absolute -right-2 top-24 z-10">
                      <ArrowRight className="w-5 h-5 text-gray-300" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-graphite text-white font-semibold rounded-lg hover:bg-graphite-light transition-all hover:-translate-y-0.5"
          >
            Schedule a Live Demo
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
