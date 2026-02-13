import { BadgeDollarSign, Building2, ShieldCheck } from "lucide-react";

const requiredModules = [
  {
    id: "inspections-buildings",
    icon: Building2,
    title: "Inspections & Buildings",
    description:
      "Manage building inventories, inspection history, and hazard sample logs with full historical traceability.",
    gate: "Starter and above",
  },
  {
    id: "budgets",
    icon: BadgeDollarSign,
    title: "Budgets",
    description:
      "Create proposals using labor, equipment, disposal, and subcontractor rate tables aligned to project scope.",
    gate: "Starter and above",
  },
  {
    id: "admin-controls",
    icon: ShieldCheck,
    title: "Admin & Seat Management",
    description:
      "Apply role-based permissions, manage seats by organization, and maintain auditability across users and actions.",
    gate: "Pro and above",
  },
];

export function MissingModulesSection() {
  return (
    <section id="operations" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-5xl mb-4 text-gray-900">
            EHS Operations Modules
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Core operational modules used by teams every day across monitoring, inspections, budgeting, and administration.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {requiredModules.map((module) => {
            const Icon = module.icon;
            return (
              <article key={module.id} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[#2a2a2a] flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#fbbf24]" />
                  </div>
                  <span className="text-xs bg-blue-50 text-blue-700 border border-blue-100 px-2 py-1 rounded">
                    {module.gate}
                  </span>
                </div>
                <h3 className="text-2xl text-gray-900 mb-2">{module.title}</h3>
                <p className="text-gray-600">{module.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
