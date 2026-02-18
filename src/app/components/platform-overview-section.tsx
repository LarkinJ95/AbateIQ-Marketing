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
} from "lucide-react";

const modules = [
  {
    icon: ClipboardList,
    title: "Surveys",
    description: "Survey creation and editing with FAs, HAs, samples, photos, observations, floor plans, and reports.",
  },
  {
    icon: Gauge,
    title: "Air Monitoring",
    description: "Core monitoring workflows for jobs, samples, exceedance tracking, and defensible records.",
  },
  {
    icon: SearchCheck,
    title: "Inspections",
    description: "Inspection workflows with building history and hazard documentation.",
  },
  {
    icon: Wrench,
    title: "Equipment",
    description: "Equipment inventory, calibration, and operational tracking.",
  },
  {
    icon: FileCheck,
    title: "NEAs",
    description: "Negative exposure assessment management in Starter and above.",
  },
  {
    icon: LineChart,
    title: "Exposure Trends",
    description: "Trend dashboards and exposure analytics in Starter and above.",
  },
  {
    icon: BadgeDollarSign,
    title: "Budgets",
    description: "Budget workflows for labor, equipment, disposal, and subcontractor rates.",
  },
  {
    icon: Settings2,
    title: "Regulatory Matrix",
    description: "Editable matrix controls and thresholds in Pro and above.",
  },
  {
    icon: Briefcase,
    title: "Operation Profiles",
    description: "Operation and task profiles with monitoring recommendations in Pro and above.",
  },
  {
    icon: FileSpreadsheet,
    title: "Reporting / Exports",
    description: "PDF reports on all tiers, with bulk Excel/CSV exports in Starter and above.",
  },
  {
    icon: ShieldCheck,
    title: "Admin / Org Controls",
    description: "Seat, role, and auditability controls, with multi-org/API flags in Enterprise.",
  },
];

export function PlatformOverviewSection() {
  return (
    <section id="platform" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-5xl mb-4 text-gray-900">
            Platform Overview
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Module names and access levels match the app’s actual Free, Starter, Pro, and Enterprise feature map.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <div key={module.title} className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                <div className="w-11 h-11 rounded-lg bg-[#1f1f1f] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#fbbf24]" />
                </div>
                <h3 className="text-lg text-gray-900 mb-2">{module.title}</h3>
                <p className="text-sm text-gray-600">{module.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
