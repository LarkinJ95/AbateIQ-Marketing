import { FileSpreadsheet, AlertTriangle, Database, Users, ClipboardX } from 'lucide-react';

const problems = [
  {
    icon: FileSpreadsheet,
    title: 'Disconnected air monitoring logs',
    description:
      'Data scattered across spreadsheets, paper forms, and multiple systems makes it impossible to get a unified view of exposure data.',
  },
  {
    icon: ClipboardX,
    title: 'Manual NEA documentation',
    description:
      'Hours spent manually creating Notification of Exceedance reports, increasing risk of errors and compliance gaps.',
  },
  {
    icon: AlertTriangle,
    title: 'No exposure intelligence',
    description:
      'Without trend analysis and predictive insights, you are always reacting instead of preventing exposure events.',
  },
  {
    icon: Database,
    title: 'No defensible audit trail',
    description:
      'Incomplete documentation and missing timestamps make it difficult to prove compliance during regulatory audits.',
  },
  {
    icon: Users,
    title: 'Fit tests and medical records scattered',
    description:
      'Personnel compliance data spread across filing cabinets and different systems creates compliance blind spots.',
  },
];

export default function Problem() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-graphite mb-6">
            Compliance should not live in{' '}
            <span className="text-red-500 line-through">spreadsheets</span>.
          </h2>
          <p className="text-lg text-steel">
            Industrial hygiene teams struggle with fragmented systems that create
            compliance risks and operational inefficiencies.
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="group p-6 lg:p-8 bg-gray-50 rounded-xl border border-gray-100 hover:border-safety-yellow/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-5 group-hover:bg-red-200 transition-colors">
                <problem.icon className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-graphite mb-3">
                {problem.title}
              </h3>
              <p className="text-steel text-sm leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { value: '67%', label: 'Still use spreadsheets' },
            { value: '4.2 hrs', label: 'Average NEA creation time' },
            { value: '23%', label: 'Have audit-ready trails' },
            { value: '$50K+', label: 'Average OSHA fine' },
          ].map((stat, index) => (
            <div key={index} className="text-center p-6">
              <div className="text-3xl lg:text-4xl font-bold text-graphite mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-steel">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
