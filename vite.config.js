import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// `vite preview` da /kirish → dist/kirish/index.html (toza URL), topilmasa → 404.html
const cleanUrls = () => ({
  name: 'clean-urls-preview',
  configurePreviewServer(server) {
    const dist = path.resolve(server.config.root, server.config.build.outDir);
    server.middlewares.use((req, res, next) => {
      const url = req.url.split('?')[0];
      if (url === '/' || path.extname(url)) return next();
      const clean = url.replace(/\/$/, '');
      if (fs.existsSync(path.join(dist, clean, 'index.html'))) {
        req.url = `${clean}/index.html`;
      } else {
        res.statusCode = 404;
        req.url = '/404.html';
      }
      next();
    });
  }
});

// GitHub Pages kabi sub-yo‘lda joylash uchun: BASE_PATH=/polaris-react/
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react(), cleanUrls()],
  build: { cssCodeSplit: false },
  // react-helmet-async CommonJS paket — prerender uchun SSR bundle ichiga olinadi
  ssr: { noExternal: ['react-helmet-async'] }
});
