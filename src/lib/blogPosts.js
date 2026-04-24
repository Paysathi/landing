import matter from 'gray-matter';
import { marked } from 'marked';

const rawFiles = import.meta.glob('/content/blog/*.md', { query: '?raw', import: 'default', eager: true });

function parsePost(raw, filepath) {
  const { data, content } = matter(raw);
  const slug = data.slug || filepath.split('/').pop().replace(/\.md$/, '');
  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    author: data.author || 'Takkada Team',
    category: data.category || '',
    meta_description: data.meta_description || '',
    primary_keyword: data.primary_keyword || '',
    excerpt: data.excerpt || '',
    html: marked(content),
  };
}

let _posts = null;

export function getAllPosts() {
  if (_posts) return _posts;
  _posts = Object.entries(rawFiles)
    .map(([filepath, raw]) => parsePost(raw, filepath))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  return _posts;
}

export function getPostBySlug(slug) {
  return getAllPosts().find((p) => p.slug === slug) || null;
}

export function getSlugs() {
  return getAllPosts().map((p) => p.slug);
}
