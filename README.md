# Polaris Guides School — React sayt

Vite + React 18 + React Router. Har bir sahifa build vaqtida **statik HTML ga prerender** qilinadi (SSG),
shuning uchun Google, Yandex va ijtimoiy tarmoqlar to‘liq kontent va meta teglarni JavaScript’siz ko‘radi.

## Ishga tushirish

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # dist/ — prerender + sitemap.xml + robots.txt
npm run preview    # build natijasini ko‘rish (http://localhost:4173)
```

Build’dan oldin domenni ko‘rsating (`.env.example` → `.env`):

```
VITE_SITE_URL=https://sizning-domen.uz
```

## Sahifalar

| URL | Sahifa | Indekslanadi |
|---|---|---|
| `/` | Bosh sahifa | ✅ |
| `/kirish` | Kabinetga kirish | ✅ |
| `/royxat` | Ro‘yxatdan o‘tish | ✅ |
| `/kabinet` | Mening kurslarim | ❌ noindex |
| `/kabinet/kurs` | Kurs ichi — modullar va darslar | ❌ noindex |
| `/kabinet/dars` | Dars sahifasi | ❌ noindex |
| boshqa | 404 | ❌ noindex |

## SEO’da nimalar qilingan

- **Prerender (SSG)** — `scripts/prerender.js` har bir marshrutni `dist/<yo‘l>/index.html` ga yozadi.
- **Har sahifa uchun meta** (`src/seo/Seo.jsx`): `title`, `description`, `canonical`, `robots`,
  Open Graph (`og:*`, `og:locale=uz_UZ`), Twitter Card.
- **JSON-LD strukturalangan ma’lumotlar** (`src/seo/schema.js`): `EducationalOrganization`, `WebSite`, `Course`.
- **sitemap.xml** va **robots.txt** avtomatik yaratiladi (`src/routes.js` dagi ro‘yxatdan). Kabinet sahifalari yopilgan.
- **OG rasm** 1200×630 (`public/og-image.png`), favicon, apple-touch-icon, `site.webmanifest`.
- Semantik HTML: bitta `h1`, to‘g‘ri sarlavhalar ierarxiyasi, `nav`/`main`/`footer`/`address`, `lang="uz"`,
  rasm o‘rniga dekorativ SVG’larda `aria-hidden`, “asosiy kontentga o‘tish” havolasi.
- Shriftlar `preconnect` + `display=swap`, CSS bitta faylda, animatsiyalar `prefers-reduced-motion` ni hurmat qiladi.

## Hostingga joylash

`dist/` papkasini istalgan statik hostingga yuklang. Server `/kirish` so‘roviga `kirish/index.html` ni,
topilmagan sahifaga `404.html` ni berishi kerak.

**Nginx:**

```nginx
location / {
  try_files $uri $uri/index.html =404;
}
error_page 404 /404.html;
```

**Netlify** — sozlamasiz ishlaydi (pretty URLs).

## Hali to‘ldirilishi kerak

- `[sana]`, `[Ism Familiya]`, `[Telefon raqam]` kabi joy egalari — haqiqiy ma’lumotlar bilan.
- Ijtimoiy tarmoq havolalari (`SiteFooter.jsx`) va `schema.js` dagi `sameAs`.
- Formalar (`Home.jsx` ariza, `Login`, `Register`) va AI chat — hozircha demo, `TODO` izohlari bor joyda API’ga ulanadi.
- Rasm va video muqovalari hozir chiziqli placeholder.
