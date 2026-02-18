import {
  ClipboardList,
  Gauge,
  SearchCheck,
  Wrench,
  FileCheck,
  LineChart,
  BadgeDollarSign,
  Settings2,
  Briefcase,
  FileSpreadsheet,
  ShieldCheck,
} from 'lucide-react';

const features = [
  {
    icon: ClipboardList,
    title: 'Surveys',
    description:
      'Create and edit surveys with FAs, HAs, samples, photos, observations, floor plans, and report generation.',
    gate: 'Free',
  },
  {
    icon: Gauge,
    title: 'Air Monitoring',
    description: 'Track jobs, samples, and exceedances with core monitoring workflows.',
    gate: 'Free',
  },
  {
    icon: SearchCheck,
    title: 'Inspections',
    description: 'Run inspections and maintain building and hazard sample history.',
    gate: 'Free',
  },
  {
    icon: Wrench,
    title: 'Equipment',
    description: 'Track equipment inventory, calibration, and usage records.',
    gate: 'Free',
  },
  {
    icon: FileCheck,
    title: 'NEAs',
    description: 'Document negative exposure assessments and keep defensible records.',
    gate: 'Starter and above',
  },
  {
    icon: LineChart,
    title: 'Exposure Trends',
    description: 'Analyze exposure patterns with trend dashboards by task, role, and site.',
    gate: 'Starter and above',
  },
  {
    icon: BadgeDollarSign,
    title: 'Budgets',
    description: 'Build project budgets with labor, equipment, disposal, and subcontractor rates.',
    gate: 'Starter and above',
  },
  {
    icon: Settings2,
    title: 'Regulatory Matrix',
    description: 'Edit regulatory matrix configurations and thresholds for your workflows.',
    gate: 'Pro and above',
  },
  {
    icon: Briefcase,
    title: 'Operation Profiles',
    description: 'Manage operation and task profiles with monitoring recommendations.',
    gate: 'Pro and above',
  },
  {
    icon: FileSpreadsheet,
    title: 'Reporting / Exports',
    description: 'Generate PDF reports in all plans, with bulk Excel/CSV exports in Starter and above.',
    gate: 'Starter and above',
  },
  {
    icon: ShieldCheck,
    title: 'Admin / Org Controls',
    description: 'Manage roles and seats, with multi-org/API access flags in Enterprise.',
    gate: 'Pro and above',
  },
];

export default function Solution() {
  return (
    <section id="solution" className="py-20 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-graphite mb-6">
            Full EHS Operations Platform
          </h2>
          <p className="text-lg text-steel">
            Module access maps directly to Free, Starter, Pro, and Enterprise feature gates.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl border border-gray-200 hover:border-safety-yellow/50 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-safety-yellow" />
              </div>
              <h3 className="text-xl font-semibold text-graphite mb-2">{feature.title}</h3>
              <p className="text-sm text-steel mb-4">{feature.description}</p>
              <span className="text-xs bg-blue-50 text-blue-700 border border-blue-100 px-2 py-1 rounded">
                {feature.gate}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
