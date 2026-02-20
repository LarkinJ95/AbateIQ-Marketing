import type { BlogPost, SeoPageContent } from "./content";

const PAGE_FILES: Record<string, string> = {
  "/asbestos-survey-software": "asbestos-survey-software.json",
  "/air-monitoring-software": "air-monitoring-software.json",
  "/industrial-hygiene-software": "industrial-hygiene-software.json",
  "/nea-reporting-software": "nea-reporting-software.json",
  "/environmental-compliance-software": "environmental-compliance-software.json",
};

const POST_FILES: Record<string, string> = {
  "/resources/blog/how-to-create-a-negative-exposure-assessment-nea":
    "how-to-create-a-negative-exposure-assessment-nea.json",
  "/resources/blog/osha-asbestos-documentation-requirements-explained":
    "osha-asbestos-documentation-requirements-explained.json",
  "/resources/blog/air-monitoring-reports-required-osha-elements":
    "air-monitoring-reports-required-osha-elements.json",
};

async function loadJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      return null;
    }
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function loadCmsSeoPage(pathname: string): Promise<SeoPageContent | null> {
  const file = PAGE_FILES[pathname];
  if (!file) {
    return null;
  }
  return loadJson<SeoPageContent>(`/content/pages/${file}`);
}

export async function loadCmsBlogPost(pathname: string): Promise<BlogPost | null> {
  const file = POST_FILES[pathname];
  if (!file) {
    return null;
  }
  return loadJson<BlogPost>(`/content/posts/${file}`);
}

export async function loadAllCmsBlogPosts(): Promise<BlogPost[]> {
  const posts = await Promise.all(
    Object.values(POST_FILES).map((file) => loadJson<BlogPost>(`/content/posts/${file}`)),
  );
  return posts.filter((post): post is BlogPost => Boolean(post));
}
