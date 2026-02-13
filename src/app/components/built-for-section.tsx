const audiences = [
  {
    title: "Asbestos Contractors",
    description:
      "Standardize field-to-office workflows for inspections, abatement planning, documentation, and defensible reporting.",
  },
  {
    title: "Industrial Hygienists",
    description:
      "Run monitoring programs, document NEAs, and analyze exposure trends across tasks, sites, and crews.",
  },
  {
    title: "Environmental Consultants",
    description:
      "Manage multi-client operations with organization controls, auditable records, and exportable deliverables.",
  },
];

export function BuiltForSection() {
  return (
    <section id="built-for" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-5xl mb-4 text-gray-900">Built For</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Teams that need operational speed with defensible compliance records.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {audiences.map((audience) => (
            <div key={audience.title} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <h3 className="text-2xl text-gray-900 mb-3">{audience.title}</h3>
              <p className="text-gray-600">{audience.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
