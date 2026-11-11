import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';

export { ROUTES, DISALLOW } from './routes.js';
export { SITE } from './seo/site.js';

export function render(url) {
  const helmetContext = {};
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  );
  const { helmet } = helmetContext;
  const head = [helmet.title, helmet.priority, helmet.meta, helmet.link, helmet.script]
    .map((t) => t.toString())
    .filter(Boolean)
    .join('\n    ');
  return { html, head };
}
