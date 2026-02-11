import { Gauge, FileCheck, AlertTriangle, Users, Target, Sparkles } from "lucide-react";

export function SolutionSection() {
  const features = [
    {
      icon: Gauge,
      title: "Air Monitoring + Exceedance Engine",
      description: "Automatically calculate PEL, TWA, STEL, and EL thresholds with real-time exceedance alerts."
    },
    {
      icon: FileCheck,
      title: "NEA Automation",
      description: "Generate compliant Negative Exposure Assessments with intelligent recommendations and defensible documentation."
    },
    {
      icon: AlertTriangle,
      title: "Regulatory Exposure Matrix (PEL / TWA / STEL / EL)",
      description: "Built-in regulatory thresholds mapped to OSHA standards for every hazard type."
    },
    {
      icon: Target,
      title: "Task-Based Exposure Profiles",
      description: "Link exposure data to specific job tasks for precise compliance tracking and trend analysis."
    },
    {
      icon: Users,
      title: "Personnel Compliance Tracking",
      description: "Manage fit tests, medical surveillance, training records, and certifications in one place."
    },
    {
      icon: Sparkles,
      title: "Smart Similarity Detection",
      description: "AI-powered matching identifies similar work conditions to streamline NEA processes and reduce redundant monitoring."
    }
  ];

  return (
    <section id="solutions" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl mb-4 text-gray-900">
            AbateIQ Centralizes Your Exposure Intelligence
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
