import { useEffect } from "react";
import type { FaqItem } from "./content";

interface SeoMetaProps {
  primaryKeyword: string;
  category: string;
  path: string;
  titleOverride?: string;
  descriptionOverride?: string;
  faqs?: FaqItem[];
  breadcrumbs?: Array<{ name: string; path: string }>;
}

const SITE_URL = "https://abateiq.com";

function upsertMetaDescription(content: string) {
  let tag = document.querySelector('meta[name="description"]');
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", "description");
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

export function SeoMeta({
  primaryKeyword,
  category,
  path,
  titleOverride,
  descriptionOverride,
  faqs = [],
  breadcrumbs = [],
}: SeoMetaProps) {
  const pageUrl = `${SITE_URL}${path}`;
  const title = titleOverride || `${primaryKeyword} | ${category} | AbateIQ`;
  const description =
    descriptionOverride ||
    `Industrial hygiene software for ${primaryKeyword}. Manage compliance, reporting, and exposure data with AbateIQ.`;

  useEffect(() => {
    document.title = title;
    upsertMetaDescription(description);
    upsertCanonical(pageUrl);
  }, [description, pageUrl, title]);

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AbateIQ",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "AbateIQ",
    category: "Industrial Hygiene Software",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: SITE_URL,
    description,
    featureList: [
      "Asbestos survey workflows",
      "Air monitoring reporting",
      "NEA reporting",
      "Exposure data management",
      "Compliance documentation",
    ],
  };

  const faqSchema = faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
    : null;

  const breadcrumbSchema = breadcrumbs.length
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: `${SITE_URL}${crumb.path}`,
        })),
      }
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      {faqSchema ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      ) : null}
      {breadcrumbSchema ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      ) : null}
    </>
  );
}
