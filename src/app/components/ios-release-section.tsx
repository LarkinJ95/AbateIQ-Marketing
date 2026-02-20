import { Apple, BellRing, Smartphone } from "lucide-react";
import { Button } from "./ui/button";

interface IOSReleaseSectionProps {
  onNotifyClick: () => void;
  onStartTrialClick: () => void;
}

export function IOSReleaseSection({
  onNotifyClick,
  onStartTrialClick,
}: IOSReleaseSectionProps) {
  return (
    <section
      id="ios-release"
      className="py-20 bg-gradient-to-br from-[#0f172a] via-[#1f2937] to-[#111827] text-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-sky-300/30 bg-sky-400/10 px-4 py-2 text-sm text-sky-200 mb-6">
              <Apple className="w-4 h-4" />
              Upcoming iOS Release
            </p>
            <h2 className="text-3xl lg:text-5xl tracking-tight mb-5">
              AbateIQ Is Coming to iPhone.
            </h2>
            <p className="text-lg text-gray-200 max-w-xl mb-8">
              Log inspections, capture samples, and keep teams audit-ready from
              the field. The full EHS operations platform is expanding to iOS.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-[#fbbf24] hover:bg-[#f59e0b] text-black"
                onClick={onNotifyClick}
              >
                Get Launch Updates
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black bg-white/10"
                onClick={onStartTrialClick}
              >
                Start for Free Today
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-xl border border-white/15 bg-white/5 p-5 backdrop-blur">
              <p className="flex items-center gap-2 text-sky-200 mb-2">
                <Smartphone className="w-4 h-4" />
                Field-First Workflow
              </p>
              <p className="text-gray-200 text-sm">
                Capture job details, inspection findings, and sample records on
                site with less back-office cleanup.
              </p>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/5 p-5 backdrop-blur">
              <p className="flex items-center gap-2 text-sky-200 mb-2">
                <BellRing className="w-4 h-4" />
                Launch Waitlist Priority
              </p>
              <p className="text-gray-200 text-sm">
                Join the launch list to get rollout updates, early access
                windows, and onboarding support details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
