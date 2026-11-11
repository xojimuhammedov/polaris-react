// Prerender va sitemap uchun yagona marshrutlar ro‘yxati.
// sitemap: true — qidiruv tizimlari indekslashi kerak bo‘lgan ochiq sahifalar.
export const ROUTES = [
  { path: '/', sitemap: true, priority: '1.0', changefreq: 'weekly' },
  { path: '/kirish', sitemap: true, priority: '0.4', changefreq: 'yearly' },
  { path: '/royxat', sitemap: true, priority: '0.6', changefreq: 'yearly' },
  { path: '/tasdiqlash', sitemap: false },
  { path: '/kabinet', sitemap: false },
  { path: '/kabinet/kurs', sitemap: false },
  { path: '/kabinet/dars', sitemap: false },
  { path: '/404', sitemap: false }
];

// robots.txt da yopiladigan bo‘limlar
export const DISALLOW = ['/kabinet', '/tasdiqlash'];
