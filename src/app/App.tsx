import { useMemo, useState } from "react";
import { Navigation } from "./components/navigation";
import { Hero } from "./components/hero";
import { ProblemSection } from "./components/problem-section";
import { PlatformOverviewSection } from "./components/platform-overview-section";
import { SolutionSection } from "./components/solution-section";
import { MissingModulesSection } from "./components/missing-modules-section";
import { BuiltForSection } from "./components/built-for-section";
import { DemoSection } from "./components/demo-section";
import { PricingSection } from "./components/pricing-section";
import { FAQSection } from "./components/faq-section";
import { ContactSection } from "./components/contact-section";
import { Footer } from "./components/footer";
import { SignInDialog, type ViewType } from "./components/sign-in-dialog";
import { AppDashboard } from "./components/app-dashboard";
import type { AuthSession } from "../lib/session";
import { clearSession, readSession } from "../lib/session";
import { getDashboardUrl } from "../lib/env";

export default function App() {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authDialogView, setAuthDialogView] = useState<ViewType>("signin");
  const [session, setSession] = useState<AuthSession | null>(() => readSession());
  const isDashboardRoute = useMemo(
    () => window.location.pathname.startsWith("/app"),
    [],
  );

  const openAuthDialog = (view: ViewType) => {
    setAuthDialogView(view);
    setAuthDialogOpen(true);
  };

  const scrollToSection = (sectionId: string) => {
    const node = document.getElementById(sectionId);
    if (!node) {
      return;
    }
    node.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleAuthSuccess = (nextSession: AuthSession) => {
    setSession(nextSession);

    if (isDashboardRoute) {
      return;
    }

    window.location.assign(nextSession.dashboardUrl || getDashboardUrl());
  };

  const handleLogout = () => {
    clearSession();
    setSession(null);
  };

  if (isDashboardRoute) {
    return (
      <AppDashboard
        session={session}
        onLoginClick={() => openAuthDialog("signin")}
        onLogout={handleLogout}
      >
        <SignInDialog
          open={authDialogOpen}
          onOpenChange={setAuthDialogOpen}
          initialView={authDialogView}
          onAuthSuccess={handleAuthSuccess}
        />
      </AppDashboard>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation
        onLoginClick={() => openAuthDialog("signin")}
        onStartTrialClick={() => openAuthDialog("trial")}
      />
      <Hero
        onStartTrialClick={() => openAuthDialog("trial")}
        onSeeDemoClick={() => scrollToSection("demo")}
      />
      <ProblemSection />
      <PlatformOverviewSection />
      <SolutionSection />
      <MissingModulesSection />
      <BuiltForSection />
      <DemoSection />
      <PricingSection
        onStartTrialClick={() => openAuthDialog("trial")}
        onContactSalesClick={() => scrollToSection("contact")}
      />
      <FAQSection />
      <ContactSection />
      <Footer />
      <SignInDialog
        open={authDialogOpen}
        onOpenChange={setAuthDialogOpen}
        initialView={authDialogView}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}
