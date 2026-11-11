import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import './styles/global.css';

const app = (
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);

const root = document.getElementById('root');
// Prerender qilingan HTML bo‘lsa — hydrate, aks holda (dev rejimi) — oddiy render
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
