import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';
import { Logo } from './Brand.jsx';
import { NAV_LINKS } from './SiteHeader.jsx';

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container stack" style={{ gap: 48 }}>
        <div className="footer__cols">
          <div className="footer__brand">
            <Logo />
            <p>Gidlikni o‘rganish va kasbiy rivojlanish maktabi.</p>
            <div className="socials">
              {/* Haqiqiy havolalarni qo‘ying */}
              <a href="#" aria-label="Telegram" rel="noopener"><Icon name="telegram" size={18} strokeWidth={1.6} /></a>
              <a href="#" aria-label="Instagram" rel="noopener"><Icon name="instagram" size={18} strokeWidth={1.6} /></a>
              <a href="#" aria-label="YouTube" rel="noopener"><Icon name="youtube" size={18} strokeWidth={1.6} /></a>
            </div>
          </div>

          <nav className="footer__col" aria-label="Platforma">
            <span className="kicker">Platforma</span>
            {NAV_LINKS.slice(1).map((l) => (
              <Link key={l.label} to={l.href}>{l.label}</Link>
            ))}
          </nav>

          <nav className="footer__col" aria-label="O‘quvchilar">
            <span className="kicker">O‘quvchilar</span>
            <Link to="/kirish">Shaxsiy kabinet</Link>
            <Link to="/kabinet/dars">AI yordamchi</Link>
            <a href="#">Hamjamiyat «Aylana»</a>
            <a href="#">Ko‘p beriladigan savollar</a>
          </nav>

          <address className="footer__col footer__col--wide" style={{ fontStyle: 'normal' }}>
            <span className="kicker">Aloqa</span>
            <span>[Telefon raqam]</span>
            <span>[Email]</span>
            <span>[O‘quv markazi manzili]</span>
          </address>
        </div>

        <div className="footer__word" aria-hidden="true">Polaris</div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Polaris Guides School</span>
          <span>To‘lovlar: Click · Payme</span>
        </div>
      </div>
    </footer>
  );
}
