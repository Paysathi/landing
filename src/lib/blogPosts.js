const modules = import.meta.glob('/content/blog/*.md', { eager: true });

export function getAllPosts() {
  return Object.values(modules)
    .map((mod) => ({
      ...mod.default,
      heroImage: `/assets/blog/${mod.default.slug}.png`,
      heroAlt: mod.default.title,
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostBySlug(slug) {
  return getAllPosts().find((p) => p.slug === slug) || null;
}

export function getSlugs() {
  return getAllPosts().map((p) => p.slug);
}
