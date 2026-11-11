// Saytning umumiy SEO sozlamalari. Domenni .env faylida VITE_SITE_URL orqali bering.
export const SITE = {
  url: (import.meta.env.VITE_SITE_URL || 'https://example.uz').replace(/\/$/, ''),
  name: 'Polaris Guides School',
  shortName: 'Polaris',
  locale: 'uz_UZ',
  lang: 'uz',
  description:
    'Polaris Guides School — gidlikni o‘rganish va kasbiy rivojlanish maktabi. Videodarslar, sun’iy intellekt bilan mashq va ustoz nazoratidagi amaliyot bitta platformada.',
  ogImage: '/og-image.png',
  themeColor: '#12142A'
};

export const absoluteUrl = (path = '/') => SITE.url + (path.startsWith('/') ? path : '/' + path);
