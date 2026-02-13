import {
  Gauge,
  FileCheck,
  Building2,
  Wrench,
  BadgeDollarSign,
  FileSpreadsheet,
  ShieldCheck,
} from "lucide-react";

export function SolutionSection() {
  const features = [
    {
      icon: Gauge,
      title: "Air Monitoring",
      description:
        "Track jobs, samples, exceedances, and generate compliance-ready reports.",
      gate: "Starter and above",
    },
    {
      icon: FileCheck,
      title: "NEAs & Exposure Trends",
      description:
        "Document negative exposure assessments and analyze exposure patterns by role, task, and site.",
      gate: "Starter and above",
    },
    {
      icon: Building2,
      title: "Inspections & Buildings",
      description:
        "Manage building inventories, inspection history, and hazard sample logs.",
      gate: "Starter and above",
    },
    {
      icon: Wrench,
      title: "Equipment & Personnel Compliance",
      description:
        "Track calibration history, usage, fit tests, and related compliance records.",
      gate: "Starter and above",
    },
    {
      icon: BadgeDollarSign,
      title: "Budgets",
      description:
        "Create proposals with labor, equipment, disposal, and subcontractor rate tables.",
      gate: "Starter and above",
    },
    {
      icon: FileSpreadsheet,
      title: "Reporting",
      description: "Generate PDF reports and export to Excel for client and regulatory workflows.",
      gate: "Starter and above",
    },
    {
      icon: ShieldCheck,
      title: "Admin & Organization Controls",
      description:
        "Apply role-based permissions, seat management, and auditability controls across organizations.",
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
            AbateIQ unifies monitoring, inspections, budgets, reporting, and admin controls in one operational system.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="bg-white p-6 rounded-lg border border-gray-200 hover:border-[#fbbf24] hover:shadow-lg transition"
              >
                <div className="w-12 h-12 bg-[#2a2a2a] rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#fbbf24]" />
                </div>
                <h3 className="text-xl mb-2 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
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
