import { useEffect, useMemo, useState } from "react";
import { Navigation } from "./components/navigation";
import { Hero } from "./components/hero";
import { IOSReleaseSection } from "./components/ios-release-section";
import { WaitlistDialog } from "./components/waitlist-dialog";
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
import { HomeSeoSections } from "./components/home-seo-sections";
import type { AuthSession } from "../lib/session";
import { clearSession, readSession } from "../lib/session";
import { getDashboardUrl } from "../lib/env";
import { SeoMeta } from "./seo/seo-meta";
import { SeoShell } from "./seo/seo-shell";
import {
  BlogPostPage,
  NotFoundSeoPage,
  ResourcesBlogPage,
  ResourcesGuidesPage,
  ResourcesHomePage,
  ResourcesTemplatesPage,
  SeoProductPage,
  getBlogPost,
  getSeoPage,
} from "./seo/pages";
import type { BlogPost, SeoPageContent } from "./seo/content";
import { loadAllCmsBlogPosts, loadCmsBlogPost, loadCmsSeoPage } from "./seo/cms";

function normalizePath(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

export default function App() {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authDialogView, setAuthDialogView] = useState<ViewType>("signin");
  const [waitlistDialogOpen, setWaitlistDialogOpen] = useState(false);
  const [session, setSession] = useState<AuthSession | null>(() => readSession());
  const [cmsPage, setCmsPage] = useState<SeoPageContent | null>(null);
  const [cmsBlogPost, setCmsBlogPost] = useState<BlogPost | null>(null);
  const [cmsBlogPosts, setCmsBlogPosts] = useState<BlogPost[] | null>(null);

  const pathname = useMemo(() => normalizePath(window.location.pathname), []);
  const isDashboardRoute = useMemo(() => pathname.startsWith("/app"), [pathname]);

  useEffect(() => {
    setCmsPage(null);
    setCmsBlogPost(null);
    setCmsBlogPosts(null);

    if (pathname === "/resources/blog") {
      void loadAllCmsBlogPosts().then((posts) => {
        if (posts.length) {
          setCmsBlogPosts(posts);
        }
      });
      return;
    }

    if (pathname.startsWith("/resources/blog/")) {
      void loadCmsBlogPost(pathname).then((post) => {
        if (post) {
          setCmsBlogPost(post);
        }
      });
      return;
    }

    void loadCmsSeoPage(pathname).then((page) => {
      if (page) {
        setCmsPage(page);
      }
    });
  }, [pathname]);

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

  if (pathname === "/") {
    return (
      <div className="min-h-screen">
        <SeoMeta
          primaryKeyword="industrial hygiene software"
          category="Homepage"
          path="/"
          titleOverride="Industrial Hygiene Software | Asbestos, Air Monitoring & Compliance | AbateIQ"
          descriptionOverride="Industrial hygiene software for asbestos surveys, air monitoring, and OSHA compliance. Generate NEAs, manage samples, and streamline reporting with AbateIQ."
          breadcrumbs={[{ name: "Home", path: "/" }]}
        />
        <Navigation
          onLoginClick={() => openAuthDialog("signin")}
          onStartTrialClick={() => openAuthDialog("trial")}
        />
        <Hero
          onStartTrialClick={() => openAuthDialog("trial")}
          onBookDemoClick={() => scrollToSection("contact")}
        />
        <HomeSeoSections />
        <IOSReleaseSection
          onNotifyClick={() => setWaitlistDialogOpen(true)}
          onStartTrialClick={() => openAuthDialog("trial")}
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
        <WaitlistDialog
          open={waitlistDialogOpen}
          onOpenChange={setWaitlistDialogOpen}
        />
      </div>
    );
  }

  const seoPage = cmsPage || getSeoPage(pathname);
  if (seoPage) {
    return (
      <SeoShell>
        <SeoProductPage page={seoPage} />
      </SeoShell>
    );
  }

  const blogPost = cmsBlogPost || getBlogPost(pathname);
  if (blogPost) {
    return (
      <SeoShell>
        <BlogPostPage post={blogPost} />
      </SeoShell>
    );
  }

  if (pathname === "/resources") {
    return (
      <SeoShell>
        <ResourcesHomePage />
      </SeoShell>
    );
  }

  if (pathname === "/resources/blog") {
    return (
      <SeoShell>
        <ResourcesBlogPage posts={cmsBlogPosts || undefined} />
      </SeoShell>
    );
  }

  if (pathname === "/resources/guides") {
    return (
      <SeoShell>
        <ResourcesGuidesPage />
      </SeoShell>
    );
  }

  if (pathname === "/resources/templates") {
    return (
      <SeoShell>
        <ResourcesTemplatesPage />
      </SeoShell>
    );
  }

  return (
    <SeoShell>
      <NotFoundSeoPage />
    </SeoShell>
  );
}
