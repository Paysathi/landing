import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readdirSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { marked } from 'marked';

const __dirname = dirname(fileURLToPath(import.meta.url));

function markdownPlugin() {
  return {
    name: 'vite-plugin-markdown',
    transform(code, id) {
      if (!id.endsWith('.md')) return null;
      const { data, content } = matter(code);
      const filename = id.split('/').pop().replace(/\.md$/, '');
      const slug = data.slug || filename;
      const html = marked(content);
      return {
        code: `export default ${JSON.stringify({ ...data, slug, html })}`,
        map: null,
      };
    },
  };
}

function getBlogSlugs() {
  const blogDir = resolve(__dirname, 'content/blog');
  try {
    return readdirSync(blogDir)
      .filter((f) => f.endsWith('.md'))
      .map((f) => {
        const raw = readFileSync(resolve(blogDir, f), 'utf-8');
        const slugMatch = raw.match(/^slug:\s*"?([^"\n]+)"?/m);
        return slugMatch ? slugMatch[1].trim() : f.replace(/\.md$/, '');
      });
  } catch {
    return [];
  }
}

export default defineConfig({
  base: '/',
  plugins: [markdownPlugin(), react()],
  server: {
    port: 5173,
    host: true,
  },
  ssgOptions: {
    dirStyle: 'nested',
    formatting: 'minify',
    includedRoutes(paths) {
      const blogSlugs = getBlogSlugs();
      return [
        ...paths,
        '/blog',
        ...blogSlugs.map((slug) => `/blog/${slug}`),
      ];
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
});
