const modules = import.meta.glob('/content/blog/*.md', { eager: true });

let _posts = null;

export function getAllPosts() {
  if (_posts) return _posts;
  _posts = Object.values(modules)
    .map((mod) => mod.default)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  return _posts;
}

export function getPostBySlug(slug) {
  return getAllPosts().find((p) => p.slug === slug) || null;
}

export function getSlugs() {
  return getAllPosts().map((p) => p.slug);
}
