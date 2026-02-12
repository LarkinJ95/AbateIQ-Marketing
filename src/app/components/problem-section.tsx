import { XCircle } from "lucide-react";

export function ProblemSection() {
  const problems = [
    "Disconnected air monitoring logs",
    "Manual NEA documentation",
    "No exposure intelligence",
    "No defensible audit trail",
    "Fit tests and medical records scattered"
  ];

  return (
    <section id="product" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl lg:text-5xl mb-12 text-gray-900">
            Compliance shouldn't live in spreadsheets.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            {problems.map((problem, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-4 bg-red-50 border border-red-200 rounded-lg"
              >
                <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-lg text-gray-800">{problem}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
