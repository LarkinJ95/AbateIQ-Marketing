import { autoLinkText } from "./internal-linking";
import { SeoMeta } from "./seo-meta";
import type { BlogPost, SeoPageContent } from "./content";
import { blogCategories, blogPosts, futureAuthorityTemplates, seoPages } from "./content";

function ScreenshotPlaceholder({ label }: { label: string }) {
  return (
    <div className="rounded-lg border border-dashed border-gray-300 bg-gray-100 p-8 text-center text-sm text-gray-600">
      Screenshot placeholder: {label}
    </div>
  );
}

function FaqBlock({ faqs }: { faqs: SeoPageContent["faqs"] | BlogPost["faqs"] }) {
  return (
    <section className="mx-auto mt-14 max-w-5xl px-6">
      <h2 className="text-3xl text-gray-900">FAQ</h2>
      <div className="mt-6 space-y-4">
        {faqs.map((faq) => (
          <article key={faq.question} className="rounded-lg border border-gray-200 bg-white p-5">
            <h3 className="text-lg text-gray-900">{faq.question}</h3>
            <p className="mt-2 text-gray-700">{autoLinkText(faq.answer)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function SeoProductPage({ page }: { page: SeoPageContent }) {
  return (
    <>
      <SeoMeta
        primaryKeyword={page.primaryKeyword}
        category={page.category}
        path={page.slug}
        faqs={page.faqs}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: page.category, path: page.slug },
        ]}
      />

      <section className="bg-gradient-to-br from-[#111827] to-[#1f2937] py-20 text-white">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-sm uppercase tracking-[0.2em] text-[#93c5fd]">{page.primaryKeyword}</p>
          <h1 className="mt-3 text-4xl lg:text-6xl">{page.h1}</h1>
          <p className="mt-5 text-lg text-gray-200">{autoLinkText(page.heroCopy)}</p>
          {page.heroImage ? (
            <img
              src={page.heroImage}
              alt={page.h1}
              className="mt-6 w-full rounded-xl border border-white/20 object-cover"
              loading="lazy"
            />
          ) : null}
          <a
            href={page.ctaHref}
            className="mt-8 inline-block rounded-md bg-[#fbbf24] px-5 py-3 font-medium text-black hover:bg-[#f59e0b]"
          >
            {page.ctaLabel}
          </a>
        </div>
      </section>

      <section className="mx-auto mt-14 grid max-w-6xl gap-6 px-6 lg:grid-cols-2">
        <article className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="text-2xl text-gray-900">Industry Pain</h2>
          <ul className="mt-4 space-y-2 text-gray-700">
            {page.painPoints.map((item) => (
              <li key={item}>• {autoLinkText(item)}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="text-2xl text-gray-900">AbateIQ Workflow</h2>
          <ol className="mt-4 space-y-2 text-gray-700">
            {page.workflow.map((step) => (
              <li key={step}>{autoLinkText(step)}</li>
            ))}
          </ol>
        </article>
      </section>

      <section className="mx-auto mt-10 max-w-6xl px-6">
        <article className="rounded-lg border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-2xl text-gray-900">Regulatory References</h2>
          <ul className="mt-4 space-y-2 text-gray-700">
            {page.regulatoryReferences.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mx-auto mt-10 grid max-w-6xl gap-6 px-6 lg:grid-cols-2">
        <article className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="text-2xl text-gray-900">Feature Breakdown</h2>
          <ul className="mt-4 space-y-2 text-gray-700">
            {page.featureBreakdown.map((item) => (
              <li key={item}>• {autoLinkText(item)}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="text-2xl text-gray-900">Use Cases</h2>
          <ul className="mt-4 space-y-2 text-gray-700">
            {page.useCases.map((item) => (
              <li key={item}>• {autoLinkText(item)}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mx-auto mt-10 grid max-w-6xl gap-6 px-6 lg:grid-cols-2">
        <ScreenshotPlaceholder label={`${page.primaryKeyword} dashboard`} />
        <ScreenshotPlaceholder label={`${page.primaryKeyword} reporting view`} />
      </section>

      <FaqBlock faqs={page.faqs} />

      <section className="mx-auto mt-12 max-w-5xl px-6 pb-16">
        <article className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="text-2xl text-gray-900">Related Pages</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {page.internalLinks.map((link) => (
              <a key={link.href} href={link.href} className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:border-[#2563eb] hover:text-[#2563eb]">
                {link.label}
              </a>
            ))}
          </div>
          <a
            href={page.ctaHref}
            className="mt-6 inline-block rounded-md bg-[#111827] px-5 py-3 text-sm font-medium text-white hover:bg-[#1f2937]"
          >
            {page.ctaLabel}
          </a>
        </article>
      </section>
    </>
  );
}

function ResourceHeader({ title, description, path }: { title: string; description: string; path: string }) {
  return (
    <>
      <SeoMeta
        primaryKeyword={title}
        category="Resources"
        path={path}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
        ]}
      />
      <section className="bg-[#111827] py-16 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="text-4xl">{title}</h1>
          <p className="mt-3 text-gray-300">{description}</p>
        </div>
      </section>
    </>
  );
}

export function ResourcesHomePage() {
  return (
    <>
      <ResourceHeader
        title="Industrial Hygiene Resources"
        description="Authority hub for OSHA compliance, asbestos management, NEA workflows, and air monitoring best practices."
        path="/resources"
      />
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-6 md:grid-cols-4">
          <a href="/resources/blog" className="rounded-lg border border-gray-200 bg-white p-6 hover:border-[#2563eb]">
            <h2 className="text-2xl text-gray-900">Blog</h2>
            <p className="mt-2 text-gray-700">Long-form compliance and workflow content targeting high-intent industrial hygiene keywords.</p>
          </a>
          <a href="/resources/guides" className="rounded-lg border border-gray-200 bg-white p-6 hover:border-[#2563eb]">
            <h2 className="text-2xl text-gray-900">Guides</h2>
            <p className="mt-2 text-gray-700">Implementation playbooks for audit readiness, defensibility, and exposure data operations.</p>
          </a>
          <a href="/resources/templates" className="rounded-lg border border-gray-200 bg-white p-6 hover:border-[#2563eb]">
            <h2 className="text-2xl text-gray-900">Templates</h2>
            <p className="mt-2 text-gray-700">Ready-to-use reporting and workflow templates for regulated field and office teams.</p>
          </a>
          <a href="/resources/brand/press-kit" className="rounded-lg border border-gray-200 bg-white p-6 hover:border-[#2563eb]">
            <h2 className="text-2xl text-gray-900">Brand Press Kit</h2>
            <p className="mt-2 text-gray-700">Official AbateIQ brand descriptions, logos, and company profile copy.</p>
          </a>
        </div>
      </section>
    </>
  );
}

export function ResourcesBlogPage({ posts = blogPosts }: { posts?: BlogPost[] }) {
  return (
    <>
      <ResourceHeader
        title="Industrial Hygiene Blog"
        description="SEO-driven authority posts for asbestos compliance, OSHA documentation, air monitoring, and NEA reporting workflows."
        path="/resources/blog"
      />
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-2xl text-gray-900">Categories</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {blogCategories.map((category) => (
            <span key={category} className="rounded-full border border-gray-300 bg-white px-3 py-1 text-sm text-gray-700">
              {category}
            </span>
          ))}
        </div>

        <h2 className="mt-10 text-2xl text-gray-900">Posts</h2>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <a key={post.slug} href={post.slug} className="rounded-lg border border-gray-200 bg-white p-6 hover:border-[#2563eb]">
              <p className="text-xs uppercase tracking-wide text-[#2563eb]">{post.category}</p>
              <h3 className="mt-2 text-xl text-gray-900">{post.title}</h3>
              <p className="mt-2 text-gray-700">{autoLinkText(post.summary)}</p>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}

export function ResourcesGuidesPage() {
  return (
    <>
      <ResourceHeader
        title="Industrial Hygiene Implementation Guides"
        description="Step-by-step compliance guides for workflow standardization, audit readiness, and risk reduction."
        path="/resources/guides"
      />
      <section className="mx-auto max-w-6xl px-6 py-12">
        <article className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="text-2xl text-gray-900">Guide Library</h2>
          <p className="mt-3 text-gray-700">
            This section is prepared for Phase 2 expansion with deep operational guides, regulatory playbooks, and role-specific implementation checklists for field and management teams.
          </p>
        </article>
      </section>
    </>
  );
}

export function ResourcesTemplatesPage() {
  return (
    <>
      <ResourceHeader
        title="Industrial Hygiene Templates"
        description="Template hub for reports, compliance records, and operational handoffs used by regulated teams."
        path="/resources/templates"
      />
      <section className="mx-auto max-w-6xl px-6 py-12">
        <article className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="text-2xl text-gray-900">Template Library</h2>
          <p className="mt-3 text-gray-700">
            This section is prepared for Phase 2 expansion with operational assets that support authority and conversion.
          </p>
          <ul className="mt-4 space-y-2 text-gray-700">
            {futureAuthorityTemplates.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </article>
      </section>
    </>
  );
}

export function BlogPostPage({ post }: { post: BlogPost }) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    url: `https://abateiq.com${post.slug}`,
    author: { "@type": "Organization", name: "AbateIQ" },
    publisher: {
      "@type": "Organization",
      name: "AbateIQ",
      logo: {
        "@type": "ImageObject",
        url: "https://abateiq.com/assets/brand/logo.png",
      },
    },
  };

  return (
    <>
      <SeoMeta
        primaryKeyword={post.primaryKeyword}
        category={post.category}
        path={post.slug}
        faqs={post.faqs}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
          { name: "Blog", path: "/resources/blog" },
          { name: post.title, path: post.slug },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <section className="bg-[#111827] py-16 text-white">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[#93c5fd]">{post.category}</p>
          <h1 className="mt-2 text-4xl">{post.title}</h1>
          <p className="mt-4 text-gray-300">{autoLinkText(post.summary)}</p>
          {post.featuredImage ? (
            <img
              src={post.featuredImage}
              alt={post.title}
              className="mt-6 w-full rounded-xl border border-white/20 object-cover"
              loading="lazy"
            />
          ) : null}
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-6 py-12">
        {post.sections.map((section) => (
          <section key={section.heading} className="mb-10">
            <h2 className="text-2xl text-gray-900">{section.heading}</h2>
            <div className="mt-4 space-y-4 text-gray-700">
              {section.body.map((paragraph, index) => (
                <p key={`${section.heading}-${index}`}>{autoLinkText(paragraph)}</p>
              ))}
            </div>
          </section>
        ))}
      </article>

      <FaqBlock faqs={post.faqs} />

      <section className="mx-auto max-w-4xl px-6 pb-16">
        <p className="mb-4 text-sm text-gray-600">
          <a href="/" className="text-[#2563eb] hover:underline">Back to AbateIQ homepage</a>
        </p>
        <a href={post.cta.href} className="inline-block rounded-md bg-[#fbbf24] px-5 py-3 font-medium text-black hover:bg-[#f59e0b]">
          {post.cta.label}
        </a>
      </section>
    </>
  );
}

export function FeaturesPage() {
  return (
    <>
      <SeoMeta
        primaryKeyword="industrial hygiene software features"
        category="Features"
        path="/features"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
        ]}
      />
      <section className="bg-[#111827] py-16 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="text-4xl">AbateIQ Features</h1>
          <p className="mt-3 text-gray-300">
            Explore core capabilities for asbestos surveys, air monitoring, NEA generation, and industrial hygiene compliance reporting.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-6 md:grid-cols-2">
          <a href="/asbestos-survey-software" className="rounded-lg border border-gray-200 bg-white p-6 hover:border-[#2563eb]">
            <h2 className="text-2xl text-gray-900">Asbestos Survey Management</h2>
            <p className="mt-2 text-gray-700">Digitize inspections, label samples, and produce compliance-ready reports.</p>
          </a>
          <a href="/air-monitoring-software" className="rounded-lg border border-gray-200 bg-white p-6 hover:border-[#2563eb]">
            <h2 className="text-2xl text-gray-900">Air Monitoring and Exposure Tracking</h2>
            <p className="mt-2 text-gray-700">Capture samples, calibrations, and lab results in one system.</p>
          </a>
          <a href="/nea-reporting-software" className="rounded-lg border border-gray-200 bg-white p-6 hover:border-[#2563eb]">
            <h2 className="text-2xl text-gray-900">NEA Reporting</h2>
            <p className="mt-2 text-gray-700">Generate defensible negative exposure assessments with audit-ready evidence.</p>
          </a>
          <a href="/industrial-hygiene-software" className="rounded-lg border border-gray-200 bg-white p-6 hover:border-[#2563eb]">
            <h2 className="text-2xl text-gray-900">Industrial Hygiene Data Platform</h2>
            <p className="mt-2 text-gray-700">Maintain exposure history across projects, sites, and personnel.</p>
          </a>
        </div>
      </section>
    </>
  );
}

export function PricingPage() {
  return (
    <>
      <SeoMeta
        primaryKeyword="industrial hygiene software pricing"
        category="Pricing"
        path="/pricing"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing" },
        ]}
      />
      <section className="bg-[#111827] py-16 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="text-4xl">AbateIQ Pricing</h1>
          <p className="mt-3 text-gray-300">
            Choose Free, Starter, Pro, or Enterprise based on your team size and compliance depth.
          </p>
          <a href="/#pricing" className="mt-6 inline-block rounded-md bg-[#fbbf24] px-5 py-3 font-medium text-black hover:bg-[#f59e0b]">
            View Pricing Table
          </a>
        </div>
      </section>
    </>
  );
}

export function LoginPage() {
  return (
    <>
      <SeoMeta
        primaryKeyword="abateiq login"
        category="Login"
        path="/login"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Login", path: "/login" },
        ]}
      />
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="text-4xl text-gray-900">Login to AbateIQ</h1>
        <p className="mt-4 text-gray-700">Access your compliance workspace and exposure reporting tools.</p>
        <a href="https://app.abateiq.com" className="mt-6 inline-block rounded-md bg-[#111827] px-5 py-3 font-medium text-white hover:bg-[#1f2937]">
          Open App Login
        </a>
      </section>
    </>
  );
}

export function CompanyPage() {
  return (
    <>
      <SeoMeta
        primaryKeyword="AbateIQ company"
        category="Company"
        path="/company"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Company", path: "/company" },
        ]}
      />
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-4xl text-gray-900">AbateIQ Company</h1>
        <p className="mt-4 text-gray-700">
          AbateIQ is industrial hygiene software built to manage asbestos surveys, air monitoring, exposure tracking, and compliance reporting.
        </p>
        <h2 className="mt-10 text-2xl text-gray-900">Mission</h2>
        <p className="mt-3 text-gray-700">
          We help industrial hygiene and environmental teams replace spreadsheet-heavy workflows with defensible, audit-ready systems.
        </p>
        <h2 className="mt-10 text-2xl text-gray-900">Contact</h2>
        <p className="mt-3 text-gray-700">Email: <a href="mailto:support@abateiq.com" className="text-[#2563eb] hover:underline">support@abateiq.com</a></p>
        <p className="mt-1 text-gray-700">Location: United States</p>
        <div className="mt-6 flex gap-4 text-sm">
          <a href="https://www.linkedin.com/company/abateiq" className="text-[#2563eb] hover:underline">LinkedIn</a>
          <a href="https://github.com/abateiq" className="text-[#2563eb] hover:underline">GitHub</a>
        </div>
      </section>
    </>
  );
}

export function BrandPressKitPage() {
  return (
    <>
      <SeoMeta
        primaryKeyword="AbateIQ press kit"
        category="Brand"
        path="/resources/brand/press-kit"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
          { name: "Brand Press Kit", path: "/resources/brand/press-kit" },
        ]}
      />
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-4xl text-gray-900">AbateIQ Brand Press Kit</h1>
        <p className="mt-4 text-gray-700">
          Official brand assets and copy for media, directories, and partners linking to AbateIQ.
        </p>

        <h2 className="mt-10 text-2xl text-gray-900">Logo Downloads</h2>
        <ul className="mt-3 space-y-2 text-gray-700">
          <li>• <a href="/assets/brand/logo.png" className="text-[#2563eb] hover:underline">Primary logo PNG</a></li>
        </ul>

        <h2 className="mt-10 text-2xl text-gray-900">LinkedIn Company Description</h2>
        <p className="mt-3 text-gray-700">
          AbateIQ is industrial hygiene software for asbestos surveys, air monitoring, exposure tracking, and compliance reporting. We help teams stay audit-ready with defensible documentation.
        </p>

        <h2 className="mt-10 text-2xl text-gray-900">GitHub Org Bio</h2>
        <p className="mt-3 text-gray-700">
          Industrial hygiene software for asbestos survey workflows, air monitoring, NEA generation, and compliance reporting.
        </p>

        <h2 className="mt-10 text-2xl text-gray-900">Product Hunt Tagline</h2>
        <p className="mt-3 text-gray-700">Industrial hygiene software for audit-ready compliance reporting.</p>

        <h2 className="mt-10 text-2xl text-gray-900">Crunchbase Short Description</h2>
        <p className="mt-3 text-gray-700">
          AbateIQ builds industrial hygiene software for asbestos, air monitoring, exposure data management, and compliance documentation.
        </p>
      </section>
    </>
  );
}

export function NotFoundSeoPage() {
  return (
    <>
      <SeoMeta
        primaryKeyword="industrial hygiene software"
        category="Pages"
        path="/404"
        breadcrumbs={[{ name: "Home", path: "/" }]}
      />
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h1 className="text-4xl text-gray-900">Page Not Found</h1>
        <p className="mt-4 text-gray-700">Use the links below to continue exploring AbateIQ authority content.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href="/resources/blog" className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:border-[#2563eb]">Resources Blog</a>
          <a href="/asbestos-survey-software" className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:border-[#2563eb]">Asbestos Survey Software</a>
          <a href="/air-monitoring-software" className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:border-[#2563eb]">Air Monitoring Software</a>
        </div>
      </section>
    </>
  );
}

export function getSeoPage(pathname: string): SeoPageContent | undefined {
  return seoPages.find((page) => page.slug === pathname);
}

export function getBlogPost(pathname: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === pathname);
}
