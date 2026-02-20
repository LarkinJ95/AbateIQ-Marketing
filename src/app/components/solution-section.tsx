import {
  ClipboardList,
  Gauge,
  SearchCheck,
  Wrench,
  FileCheck,
  LineChart,
  BadgeDollarSign,
  ShieldCheck,
  Settings2,
  Briefcase,
  FileSpreadsheet,
} from "lucide-react";

export function SolutionSection() {
  const features = [
    {
      icon: ClipboardList,
      title: "Surveys",
      description:
        "Create and edit surveys with FAs, HAs, samples, photos, observations, floor plans, and survey reports.",
      gate: "Free",
    },
    {
      icon: Gauge,
      title: "Air Monitoring",
      description:
        "Track jobs, samples, and exceedances with core monitoring workflows.",
      gate: "Free",
    },
    {
      icon: SearchCheck,
      title: "Inspections",
      description:
        "Run inspections and maintain building and hazard sample history.",
      gate: "Free",
    },
    {
      icon: Wrench,
      title: "Equipment",
      description:
        "Track equipment inventory, calibration, and usage records.",
      gate: "Free",
    },
    {
      icon: FileCheck,
      title: "NEAs",
      description:
        "Document negative exposure assessments and keep defensible records.",
      gate: "Starter and above",
    },
    {
      icon: LineChart,
      title: "Exposure Trends",
      description:
        "Analyze exposure patterns with trend dashboards by task, role, and site.",
      gate: "Starter and above",
    },
    {
      icon: BadgeDollarSign,
      title: "Budgets",
      description:
        "Build project budgets with labor, equipment, disposal, and subcontractor rates.",
      gate: "Starter and above",
    },
    {
      icon: Settings2,
      title: "Regulatory Matrix",
      description:
        "Edit regulatory matrix configurations and thresholds for your workflows.",
      gate: "Pro and above",
    },
    {
      icon: Briefcase,
      title: "Operation Profiles",
      description:
        "Manage operation and task profiles with monitoring recommendations.",
      gate: "Pro and above",
    },
    {
      icon: FileSpreadsheet,
      title: "Reporting / Exports",
      description:
        "Generate PDF reports in all plans, with bulk Excel/CSV exports in Starter and above.",
      gate: "Starter and above",
    },
    {
      icon: ShieldCheck,
      title: "Admin / Org Controls",
      description:
        "Manage roles, seats, and auditability. Multi-org/API flags are Enterprise only.",
      gate: "Pro and above",
    },
  ];

  return (
    <section id="solutions" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl mb-4 text-gray-900">
            Full EHS Operations Platform
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Module access maps directly to Free, Starter, Pro, and Enterprise feature gates.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-white p-6 rounded-lg border border-gray-200 hover:border-[#fbbf24] hover:shadow-lg transition"
              >
                <div className="w-12 h-12 bg-[#2a2a2a] rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#fbbf24]" />
                </div>
                <h3 className="text-xl mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
                <div className="mt-4">
                  <span className="text-xs bg-blue-50 text-blue-700 border border-blue-100 px-2 py-1 rounded">
                    {feature.gate}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
