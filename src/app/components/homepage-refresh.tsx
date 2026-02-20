export function HomepageRefresh() {
  const workflowSteps = [
    {
      title: "Survey",
      body: "Digitize asbestos surveys with floor plans, HAs, and sample tracking",
      href: "/asbestos-survey-software",
    },
    {
      title: "Monitor",
      body: "Capture air monitoring data, calibrations, tasks, and locations",
      href: "/air-monitoring-software",
    },
    {
      title: "Assess",
      body: "Track exposures against PEL, STEL, and TWA limits",
      href: "/industrial-hygiene-software",
    },
    {
      title: "Document",
      body: "Generate defensible NEAs and standardized reports",
      href: "/nea-reporting-software",
    },
    {
      title: "Prove",
      body: "Keep audit-ready records with traceability across projects",
      href: "/environmental-compliance-software",
    },
  ];

  const capabilityTiles = [
    {
      title: "Asbestos Survey Management",
      body: "Multi-floor surveys, HA tracking, sample IDs, and professional reporting.",
      href: "/asbestos-survey-software",
    },
    {
      title: "Air Monitoring & Exposure Tracking",
      body: "Sampling workflows, calibration records, lab results, and compliance comparisons.",
      href: "/air-monitoring-software",
    },
    {
      title: "NEA & Compliance Documentation",
      body: "Build defensible NEAs aligned with OSHA expectations using real exposure data.",
      href: "/nea-reporting-software",
    },
    {
      title: "Industrial Hygiene Data Platform",
      body: "Centralize exposure history across workers, tasks, projects, and sites.",
      href: "/industrial-hygiene-software",
    },
  ];

  const whoItsFor = [
    "Industrial hygienists",
    "Environmental consultants",
    "Abatement and demolition contractors",
    "Manufacturing and facilities EHS teams",
  ];

  return (
    <main className="bg-[var(--bg)] text-[var(--text)]">
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-20 text-center">
        <h1 className="text-4xl lg:text-6xl tracking-tight">
          Industrial Hygiene Intelligence — Built for Compliance, Not Spreadsheets
        </h1>
        <p className="mx-auto mt-6 max-w-4xl text-lg text-[var(--muted-foreground)]">
          AbateIQ unifies asbestos surveys, air monitoring, exposure tracking, and compliance reporting into one defensible system. Stay audit-ready, reduce risk, and eliminate fragmented workflows.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="/login" className="rounded-md bg-[#2563eb] px-6 py-3 font-medium text-white hover:bg-[#1d4ed8]">
            Start Free
          </a>
          <a href="/company" className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-6 py-3 font-medium text-[var(--text)] hover:bg-white">
            Book Demo
          </a>
        </div>
        <p className="mt-6 text-sm text-[var(--muted-foreground)]">
          Trusted by field teams who need audit-ready industrial hygiene documentation.
        </p>
      </section>

      <section id="problem" className="border-y border-[var(--border)] bg-[var(--surface)] py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl">Compliance Shouldn’t Depend on Spreadsheets</h2>
          <p className="mt-4 max-w-4xl text-[var(--muted-foreground)]">
            Industrial hygienists and environmental teams face increasing regulatory pressure while managing disconnected tools, manual reporting, and scattered exposure data.
          </p>
          <ul className="mt-6 grid gap-3 text-[var(--text)] md:grid-cols-2">
            <li>Inconsistent sample records and chain-of-custody gaps</li>
            <li>Manual NEA generation and formatting</li>
            <li>Exposure history spread across files and email</li>
            <li>Slow audit prep and missing documentation</li>
            <li>Weak defensibility when conditions change</li>
          </ul>
        </div>
      </section>

      <section id="workflow" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl">From Survey to Compliance — One System</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {workflowSteps.map((step) => (
            <a key={step.title} href={step.href} className="rounded-lg border border-[var(--border)] bg-white p-5 hover:border-[#2563eb]">
              <h3 className="text-xl">{step.title}</h3>
              <p className="mt-2 text-[var(--muted-foreground)]">{step.body}</p>
            </a>
          ))}
        </div>
      </section>

      <section id="capabilities" className="border-y border-[var(--border)] bg-[var(--surface)] py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl">Core Capabilities</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {capabilityTiles.map((tile) => (
              <a key={tile.title} href={tile.href} className="rounded-lg border border-[var(--border)] bg-white p-5 hover:border-[#2563eb]">
                <h3 className="text-xl">{tile.title}</h3>
                <p className="mt-2 text-[var(--muted-foreground)]">{tile.body}</p>
              </a>
            ))}
          </div>
          <a href="/features" className="mt-8 inline-block rounded-md bg-[#2563eb] px-6 py-3 font-medium text-white hover:bg-[#1d4ed8]">
            Explore Features
          </a>
        </div>
      </section>

      <section id="who-for" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl">Who It’s For</h2>
        <ul className="mt-6 grid gap-3 md:grid-cols-2">
          {whoItsFor.map((item) => (
            <li key={item} className="rounded-lg border border-[var(--border)] bg-white px-4 py-3">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-[var(--border)] bg-[var(--surface)] py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl">Stop chasing paperwork. Start managing exposure with confidence.</h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="/login" className="rounded-md bg-[#2563eb] px-6 py-3 font-medium text-white hover:bg-[#1d4ed8]">
              Start Free
            </a>
            <a href="/company" className="rounded-md border border-[var(--border)] bg-white px-6 py-3 font-medium text-[var(--text)] hover:bg-[var(--surface)]">
              Book Demo
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
