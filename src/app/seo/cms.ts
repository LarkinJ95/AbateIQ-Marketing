import type { BlogPost, SeoPageContent } from "./content";

interface CmsIndex {
  files: string[];
}

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

function pathnameToPageFile(pathname: string): string | null {
  if (!pathname || pathname === "/") {
    return null;
  }

  if (pathname.includes("/")) {
    const topLevelOnly = /^\/[a-z0-9-]+$/i.test(pathname);
    if (!topLevelOnly) {
      return null;
    }
  }

  return `${pathname.replace(/^\//, "")}.json`;
}

function pathnameToPostFile(pathname: string): string | null {
  const prefix = "/resources/blog/";
  if (!pathname.startsWith(prefix)) {
    return null;
  }

  const slug = pathname.slice(prefix.length);
  if (!slug || slug.includes("/")) {
    return null;
  }

  return `${slug}.json`;
}

export async function loadCmsSeoPage(pathname: string): Promise<SeoPageContent | null> {
  const file = pathnameToPageFile(pathname);
  if (!file) {
    return null;
  }
  return loadJson<SeoPageContent>(`/content/pages/${file}`);
}

export async function loadCmsBlogPost(pathname: string): Promise<BlogPost | null> {
  const file = pathnameToPostFile(pathname);
  if (!file) {
    return null;
  }
  return loadJson<BlogPost>(`/content/posts/${file}`);
}

export async function loadAllCmsBlogPosts(): Promise<BlogPost[]> {
  const index = await loadJson<CmsIndex>("/content/posts/index.json");
  const fileNames =
    index?.files?.filter((file) => typeof file === "string" && file.endsWith(".json")) || [];

  if (!fileNames.length) {
    return [];
  }

  const posts = await Promise.all(
    fileNames.map((file) => loadJson<BlogPost>(`/content/posts/${file}`)),
  );

  return posts
    .filter((post): post is BlogPost => Boolean(post))
    .sort((a, b) => a.title.localeCompare(b.title));
}
