import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readdirSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

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
  plugins: [react()],
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
