import { Building2, BriefcaseBusiness, ClipboardCheck, Coins, Factory } from "lucide-react";

const modules = [
  {
    icon: Factory,
    title: "Monitoring",
    description:
      "Manage air monitoring jobs, sample collection workflows, exceedance tracking, and compliance-ready reporting.",
  },
  {
    icon: Building2,
    title: "Inspections",
    description:
      "Track buildings, inspection history, hazard sample logs, and inventory status over time.",
  },
  {
    icon: ClipboardCheck,
    title: "Operations",
    description:
      "Run day-to-day EHS workflows including NEAs, exposure trend analysis, equipment, and personnel compliance.",
  },
  {
    icon: Coins,
    title: "Budgets",
    description:
      "Build proposals using labor, equipment, disposal, and subcontractor rate tables tied to real operational scope.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Admin",
    description:
      "Control seats, roles, and auditability with organization-wide administrative controls.",
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
            AbateIQ is a full EHS operations platform, not just a survey and monitoring tool.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">
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
