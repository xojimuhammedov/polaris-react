import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from './Icon.jsx';
import { Logo } from './Brand.jsx';

export const NAV_LINKS = [
  { href: '/', label: 'Bosh sahifa' },
  { href: '/#imkoniyatlar', label: 'Biz haqimizda' },
  { href: '/#bepul-dars', label: 'Gidlik kursi' },
  { href: '/#ariza', label: 'Gidlar uchun' },
  { href: '/#bepul-dars', label: 'Bilimlar kutubxonasi' },
  { href: '/#natijalar', label: 'Bitiruvchilar' }
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="nav-wrap">
      <nav className="nav" aria-label="Asosiy menyu">
        <Logo />

        <ul className="nav__links">
          {NAV_LINKS.map((l, i) => (
            <li key={l.label}>
              <Link to={l.href} className="nav__link" aria-current={i === 0 ? 'page' : undefined}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav__actions">
          <Link to="/kirish" className="nav__cabinet" aria-label="Shaxsiy kabinet">
            <Icon name="user" size={18} />
            <span className="nav__cabinet-label">Shaxsiy kabinet</span>
          </Link>
          <button
            type="button"
            className="nav__menu-btn"
            aria-label={open ? 'Menyuni yopish' : 'Menyuni ochish'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? 'close' : 'menu'} size={20} />
          </button>
        </div>

        {open && (
          <div id="mobile-menu" className="mobile-menu">
            <ul>
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  <Link to={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
}
