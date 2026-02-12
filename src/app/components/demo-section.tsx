import { CheckCircle2 } from "lucide-react";

export function DemoSection() {
  const steps = [
    {
      number: "01",
      title: "Create Survey",
      description: "Log inspection details, site conditions, and materials identified"
    },
    {
      number: "02",
      title: "Add Monitoring",
      description: "Enter air sample data with automatic lab integration"
    },
    {
      number: "03",
      title: "Exceedance Auto-Calculates",
      description: "Engine instantly compares results against PEL/TWA/STEL thresholds"
    },
    {
      number: "04",
      title: "NEA Generated",
      description: "System produces compliant documentation with regulatory justification"
    },
    {
      number: "05",
      title: "Compliance Dashboard Updates",
      description: "Real-time visibility into exposure trends and audit readiness"
    }
  ];

  return (
    <section id="demo" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl mb-4 text-gray-900">
            From Survey to Compliance in 5 Steps
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Watch how AbateIQ transforms raw monitoring data into audit-defensible intelligence
          </p>
        </div>
        
        <div className="grid md:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200 hover:border-[#fbbf24] transition h-full">
                <div className="text-5xl text-[#fbbf24] mb-4 opacity-60">
                  {step.number}
                </div>
                <h3 className="text-lg mb-2 text-gray-900">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 z-10">
                  <CheckCircle2 className="w-6 h-6 text-[#fbbf24]" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
