// Build'dan keyin har bir marshrutni statik HTML ga aylantiradi (SSG),
// sitemap.xml va robots.txt yaratadi — qidiruv tizimlari to‘liq kontentni ko‘radi.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const serverEntry = pathToFileURL(path.join(root, 'dist-server', 'entry-server.js')).href;
const { render, ROUTES, DISALLOW, SITE } = await import(serverEntry);

for (const route of ROUTES) {
  const { html, head } = render(route.path);
  const page = template
    .replace('<!--app-head-->', () => head)
    .replace('<!--app-html-->', () => html);

  const file =
    route.path === '/' ? 'index.html' : route.path === '/404' ? '404.html' : path.join(route.path.slice(1), 'index.html');
  const out = path.join(dist, file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page);
  console.log('  prerender', route.path.padEnd(16), '→', file);
}

const today = new Date().toISOString().slice(0, 10);
const urls = ROUTES.filter((r) => r.sitemap)
  .map(
    (r) =>
      `  <url>\n    <loc>${SITE.url}${r.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`
  )
  .join('\n');
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);

fs.writeFileSync(
  path.join(dist, 'robots.txt'),
  ['User-agent: *', 'Allow: /', ...DISALLOW.map((p) => `Disallow: ${p}`), '', `Sitemap: ${SITE.url}/sitemap.xml`, ''].join('\n')
);

fs.rmSync(path.join(root, 'dist-server'), { recursive: true, force: true });
console.log('  sitemap.xml va robots.txt yaratildi →', SITE.url);
