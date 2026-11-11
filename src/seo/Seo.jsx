import { Helmet } from 'react-helmet-async';
import { SITE, absoluteUrl } from './site.js';

/**
 * Har bir sahifa uchun meta teglar: title, description, canonical,
 * robots, Open Graph, Twitter va JSON-LD strukturalangan ma’lumotlar.
 */
export default function Seo({
  title,
  description = SITE.description,
  path = '/',
  noindex = false,
  image = SITE.ogImage,
  type = 'website',
  jsonLd = []
}) {
  const fullTitle = title ? `${title} | ${SITE.name}` : `${SITE.name} — gidlik kursi va kasbiy rivojlanish`;
  const url = absoluteUrl(path);
  const img = image.startsWith('http') ? image : absoluteUrl(image);
  const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd];

  return (
    <Helmet prioritizeSeoTags>
      <html lang={SITE.lang} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta
        name="robots"
        content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1'}
      />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:locale" content={SITE.locale} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={SITE.name} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />

      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
