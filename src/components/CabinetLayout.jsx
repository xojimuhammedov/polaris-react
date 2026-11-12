import { Link, NavLink, useLocation } from 'react-router-dom';
import Icon from './Icon.jsx';
import { Logo } from './Brand.jsx';
import { USER } from '../data/course.js';

const ITEMS = [
  { to: '/kabinet', icon: 'book', label: 'Mening kurslarim', match: true },
  { to: '#', icon: 'chart', label: 'Natijalarim' },
  { to: '#', icon: 'clipboard', label: 'Topshiriqlar', badge: 1 },
  { to: '#', icon: 'calendar', label: 'Jadval' },
  { to: '/kabinet/dars', icon: 'sparkle', label: 'AI yordamchi' },
  { to: '#', icon: 'card', label: 'To‘lovlar' },
  { to: '/kabinet/profil', icon: 'user', label: 'Profil', nav: true }
];

export default function CabinetLayout({ children, gap = 28 }) {
  const { pathname } = useLocation();
  // Kurs va dars sahifalarida ham "Mening kurslarim" faol turadi, profil sahifasida esa yo‘q
  const coursesActive = pathname === '/kabinet' || pathname.startsWith('/kabinet/kurs') || pathname.startsWith('/kabinet/dars');
  return (
    <div className="cab">
      <aside className="side" aria-label="Kabinet menyusi">
        <Logo size="sm" />

        <nav aria-label="Kabinet bo‘limlari">
          <ul className="side__nav">
            {ITEMS.map((it) => (
              <li key={it.label}>
                {it.match ? (
                  <Link to={it.to} className={`side__link ${coursesActive ? 'active' : ''}`} aria-current={coursesActive ? 'page' : undefined}>
                    <Icon name={it.icon} size={20} strokeWidth={1.6} />
                    {it.label}
                  </Link>
                ) : it.nav ? (
                  <NavLink to={it.to} className={({ isActive }) => `side__link ${isActive ? 'active' : ''}`}>
                    <Icon name={it.icon} size={20} strokeWidth={1.6} />
                    {it.label}
                  </NavLink>
                ) : (
                  <SmartLink to={it.to} className="side__link">
                    <Icon name={it.icon} size={20} strokeWidth={1.6} />
                    {it.label}
                    {it.badge && <span className="side__badge" aria-label={`${it.badge} ta yangi`}>{it.badge}</span>}
                  </SmartLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="side__foot">
          <NavLink to="/kabinet/profil" className={({ isActive }) => `side__me ${isActive ? 'active' : ''}`} aria-label={`${USER.name} — profil`}>
            <span className="avatar" aria-hidden="true">{USER.initials}</span>
            <span className="side__user">
              <span className="side__user-name">{USER.name}</span>
              <span className="side__user-role">{USER.role}</span>
            </span>
          </NavLink>
          <Link to="/kirish" className="side__logout" aria-label="Chiqish">
            <Icon name="logout" size={20} strokeWidth={1.6} />
          </Link>
        </div>
      </aside>

      <main className="cab__main" style={{ gap }}>{children}</main>
    </div>
  );
}

// Hali tayyor bo‘lmagan sahifalar uchun "#" — oddiy <a>, qolganlari router Link
export function SmartLink({ to, ...props }) {
  return to.startsWith('/') ? <Link to={to} {...props} /> : <a href={to} {...props} />;
}

export function Bar({ value, accent, dark, className = '', label }) {
  const aria = label
    ? { role: 'progressbar', 'aria-label': label, 'aria-valuenow': value, 'aria-valuemin': 0, 'aria-valuemax': 100 }
    : { 'aria-hidden': true };
  return (
    <div className={`bar ${accent ? 'bar--accent' : ''} ${dark ? 'bar--dark' : ''} ${className}`} {...aria}>
      <span style={{ width: `${value}%` }} />
    </div>
  );
}
