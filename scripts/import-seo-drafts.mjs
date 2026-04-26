#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');
const draftPath = resolve(repoRoot, 'content/blog-drafts/seo-batch-1.md');
const outDir = resolve(repoRoot, 'content/blog');

const TODAY = '2026-04-25';
const AUTHOR = 'Takkada Team';

const CATEGORY_BY_TYPE = {
  'Problem Deep-Dive': 'Tally Mobile',
  'Comparison': 'Comparisons',
  'How-To': 'How-To',
  'India Market Reality': 'Market Reality',
};

const META_KEYS = [
  'Target keyword',
  'Domain',
  'Article type',
  'Word count',
  'Meta title',
  'Meta description',
  'Slug',
];

const KNOWN_TOP_SECTIONS = new Set([
  'Key Highlights',
  'In This Article',
  'Frequently Asked Questions',
  'Internal Links',
]);

function splitSegments(raw) {
  // Treat both ---ARTICLE BREAK--- and ---END--- as segment separators.
  return raw
    .split(/^---ARTICLE BREAK---$|^---END---$/m)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function parseSegment(seg) {
  const lines = seg.split('\n');
  // Title line: starts with "<n>. "
  const titleMatch = lines[0].match(/^(\d+)\.\s+(.*)$/);
  if (!titleMatch) return null;
  const articleNum = Number(titleMatch[1]);
  const title = titleMatch[2].trim();

  const meta = { articleNum, title };
  let i = 1;
  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === '') {
      i++;
      break;
    }
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) {
      i++;
      continue;
    }
    const key = line.slice(0, colonIdx).trim();
    const val = line.slice(colonIdx + 1).trim();
    if (META_KEYS.includes(key)) {
      meta[key] = val;
    }
    i++;
  }

  if (!meta.Slug) return null;

  const bodyLines = lines.slice(i);
  return { meta, bodyLines };
}

function inferSectionHeadings(bodyLines) {
  // Find the "In This Article" block; collect its items as section heading candidates.
  const headings = new Set(KNOWN_TOP_SECTIONS);
  let inItaList = false;
  let inKeyHighlights = false;
  for (let i = 0; i < bodyLines.length; i++) {
    const line = bodyLines[i].trim();
    if (line === 'In This Article') {
      inItaList = true;
      continue;
    }
    if (line === 'Key Highlights') {
      inKeyHighlights = true;
      continue;
    }
    if (inItaList) {
      if (line === '') {
        // Continue scanning until first non-empty after blank — but the list
        // items follow immediately. A second blank ends the list.
        if (headings.size > KNOWN_TOP_SECTIONS.size) {
          inItaList = false;
        }
        continue;
      }
      // Stop when we hit something that looks like body prose start (very long line).
      if (line.length > 140) {
        inItaList = false;
        continue;
      }
      headings.add(line);
    }
    if (inKeyHighlights) {
      if (line === '') continue;
      // first non-blank ends key highlights "section name" detection — bullets follow
      inKeyHighlights = false;
    }
  }
  return headings;
}

function renderBody(bodyLines) {
  const inferred = inferSectionHeadings(bodyLines);
  // Headings inferred from the "In This Article" list, minus the top sections.
  const sectionHeadings = new Set(
    [...inferred].filter((h) => !KNOWN_TOP_SECTIONS.has(h))
  );
  const out = [];
  let mode = 'prose'; // prose | bullets | faq | links
  let prevBlank = true;
  let blankRun = 0;
  let itemsInList = 0;

  // Sentinel headings: "What ... is, in one sentence" and "What about ...?"
  const oneSentenceRegex = /^What .+ is, in one sentence$/;
  const subQuestionRegex = /^What about .+\?$/;

  function isTopSection(t) {
    return KNOWN_TOP_SECTIONS.has(t);
  }
  function isInferredSection(t) {
    return (
      sectionHeadings.has(t) ||
      oneSentenceRegex.test(t) ||
      subQuestionRegex.test(t)
    );
  }

  for (let i = 0; i < bodyLines.length; i++) {
    const trimmed = bodyLines[i].replace(/\s+$/, '').trim();

    if (trimmed === '') {
      if (!prevBlank) out.push('');
      prevBlank = true;
      blankRun++;
      // A blank ends a bullet/link list once at least one item has been emitted.
      // FAQ stays in faq mode (Q/A entries are tightly packed in the source).
      if ((mode === 'bullets' || mode === 'links') && itemsInList > 0) {
        mode = 'prose';
        itemsInList = 0;
      }
      continue;
    }

    // Top-section transitions always render as headings and switch mode.
    if (isTopSection(trimmed)) {
      if (!prevBlank) out.push('');
      out.push(`## ${trimmed}`);
      out.push('');
      prevBlank = true;
      blankRun = 0;
      itemsInList = 0;
      mode =
        trimmed === 'Key Highlights' ? 'bullets'
        : trimmed === 'In This Article' ? 'bullets'
        : trimmed === 'Frequently Asked Questions' ? 'faq'
        : trimmed === 'Internal Links' ? 'links'
        : 'prose';
      continue;
    }

    // Inferred section headings only become headings in prose mode.
    if (mode === 'prose' && isInferredSection(trimmed)) {
      if (!prevBlank) out.push('');
      out.push(`## ${trimmed}`);
      out.push('');
      prevBlank = true;
      blankRun = 0;
      continue;
    }

    blankRun = 0;

    // Bullets (Key Highlights, In This Article)
    if (mode === 'bullets') {
      out.push(`- ${trimmed}`);
      prevBlank = false;
      itemsInList++;
      continue;
    }

    // FAQ — Q: / A: pairs
    if (mode === 'faq') {
      if (/^Q:\s*/.test(trimmed)) {
        if (!prevBlank) out.push('');
        out.push(`**${trimmed}**`);
        out.push('');
        prevBlank = true;
        continue;
      }
      if (/^A:\s*/.test(trimmed)) {
        out.push(trimmed);
        out.push('');
        prevBlank = true;
        continue;
      }
      out.push(trimmed);
      prevBlank = false;
      continue;
    }

    // Internal Links — short bullet lines; long lines fall through to prose
    // (the trailing CTA paragraph after the link list).
    if (mode === 'links') {
      if (trimmed.length < 110) {
        out.push(`- ${trimmed}`);
        prevBlank = false;
        itemsInList++;
        continue;
      }
      mode = 'prose';
      itemsInList = 0;
      // Fall through to prose handling.
    }

    // Prose paragraph
    out.push(trimmed);
    out.push('');
    prevBlank = true;
  }

  while (out.length && out[out.length - 1] === '') out.pop();
  return out.join('\n') + '\n';
}

function categoryFor(meta) {
  return CATEGORY_BY_TYPE[meta['Article type']] || 'Distributor Playbook';
}

function escapeYaml(s) {
  // Wrap in double quotes; escape internal double quotes and backslashes.
  return `"${String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

function buildFrontmatter({ meta, category, excerpt }) {
  const fields = [
    ['title', meta.title],
    ['slug', meta.Slug],
    ['meta_title', meta['Meta title'] || meta.title],
    ['meta_description', meta['Meta description'] || ''],
    ['primary_keyword', meta['Target keyword'] || ''],
    ['date', TODAY],
    ['author', AUTHOR],
    ['category', category],
    ['excerpt', excerpt],
  ];
  const lines = ['---'];
  for (const [k, v] of fields) lines.push(`${k}: ${escapeYaml(v)}`);
  lines.push('---');
  return lines.join('\n');
}

function deriveExcerpt(bodyLines) {
  // First substantive paragraph after "In This Article" list.
  let pastIta = false;
  let blankAfter = 0;
  for (let i = 0; i < bodyLines.length; i++) {
    const t = bodyLines[i].trim();
    if (t === 'In This Article') {
      pastIta = true;
      continue;
    }
    if (!pastIta) continue;
    if (t === '') {
      blankAfter++;
      continue;
    }
    // Skip the section-name list lines (short lines after "In This Article")
    if (blankAfter < 2 && t.length < 140) continue;
    // First long line is the first paragraph of the first section, OR a section heading.
    // Skip section headings (short lines).
    if (t.length < 80) continue;
    return t;
  }
  return '';
}

function main() {
  const raw = readFileSync(draftPath, 'utf-8');
  const segments = splitSegments(raw);
  const parsed = segments.map(parseSegment).filter(Boolean);
  console.log(`Parsed ${parsed.length} segments`);

  // Group by slug; keep last occurrence (later versions supersede).
  const bySlug = new Map();
  for (const p of parsed) {
    bySlug.set(p.meta.Slug, p);
  }
  console.log(`Unique slugs: ${bySlug.size}`);

  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

  for (const [slug, { meta, bodyLines }] of bySlug) {
    const category = categoryFor(meta);
    const excerpt = deriveExcerpt(bodyLines) || meta['Meta description'] || '';
    const frontmatter = buildFrontmatter({
      meta: { ...meta, Slug: slug, title: meta.title },
      category,
      excerpt,
    });
    const body = renderBody(bodyLines);
    const file = `${frontmatter}\n\n${body}`;
    const outPath = resolve(outDir, `${slug}.md`);
    writeFileSync(outPath, file);
    console.log(`wrote ${slug}.md (${body.length} chars)`);
  }
}

main();
