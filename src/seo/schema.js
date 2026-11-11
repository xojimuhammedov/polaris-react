import { SITE, absoluteUrl } from './site.js';

// Schema.org JSON-LD obyektlari (Google rich results uchun)

export const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  '@id': absoluteUrl('/#organization'),
  name: SITE.name,
  alternateName: SITE.shortName,
  url: absoluteUrl('/'),
  logo: absoluteUrl('/icon-512.png'),
  image: absoluteUrl(SITE.ogImage),
  description: SITE.description,
  areaServed: { '@type': 'Country', name: 'O‘zbekiston' },
  knowsLanguage: ['uz', 'en', 'it', 'fr']
  // Ijtimoiy tarmoqlar tayyor bo‘lganda qo‘shing:
  // sameAs: ['https://t.me/...', 'https://instagram.com/...', 'https://youtube.com/@...']
});

export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': absoluteUrl('/#website'),
  name: SITE.name,
  url: absoluteUrl('/'),
  inLanguage: SITE.lang,
  publisher: { '@id': absoluteUrl('/#organization') }
});

export const courseSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Polaris gidlik kursi',
  description:
    '8 modul va video darslardan iborat gidlik kursi: tarix va madaniyat, shaharlar va obidalar, hikoya qilish, guruh bilan ishlash va xorijiy tilda ekskursiya. Har moduldan keyin test va video vazifa, yakunda sertifikat.',
  inLanguage: SITE.lang,
  url: absoluteUrl('/#imkoniyatlar'),
  provider: {
    '@type': 'EducationalOrganization',
    name: SITE.name,
    sameAs: absoluteUrl('/')
  },
  educationalCredentialAwarded: 'Sertifikat',
  teaches: [
    'Gidlik mahorati',
    'O‘zbekiston tarixi va madaniyati',
    'Ekskursiya matnini tuzish',
    'Turistlar guruhi bilan ishlash',
    'Xorijiy tilda ekskursiya'
  ],
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'Blended',
    inLanguage: SITE.lang
  }
});

export const breadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: absoluteUrl(item.path)
  }))
});
