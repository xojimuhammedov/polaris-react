import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';
import { Logo, StarMark, StarTrails } from './Brand.jsx';

/**
 * Kirish / Ro‘yxat / Tasdiqlash sahifalari uchun umumiy karkas:
 * chapda qorong‘i promo-panel, o‘ngda forma.
 */
export default function AuthLayout({ eyebrow, title, emphasis, text, perks, note, back = { to: '/', label: 'Bosh sahifa' }, children }) {
  return (
    <div className="auth">
      <aside className="auth__aside">
        <StarTrails variant="panel" className="auth__trails" />
        <svg className="auth__star twinkle" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1.5c.7 5.6 4.9 9.8 10.5 10.5-5.6.7-9.8 4.9-10.5 10.5-.7-5.6-4.9-9.8-10.5-10.5C7.1 11.3 11.3 7.1 12 1.5z" />
        </svg>

        <Logo />

        <div className="auth__intro">
          <span className="eyebrow eyebrow--gold">{eyebrow}</span>
          <p className="auth__title">
            {title} <em>{emphasis}</em>
          </p>
          <p className="lead lead--dark">{text}</p>
        </div>

        <div className="auth__perks-wrap">
          <ul className="perks">
            {perks.map((p) => (
              <li className="perk" key={p.title}>
                <span className="circle circle--ring" aria-hidden="true">
                  <Icon name={p.icon} size={p.icon === 'play' ? 16 : 18} strokeWidth={1.6} style={p.icon === 'play' ? { marginLeft: 2 } : undefined} />
                </span>
                <span className="perk__body">
                  <span className="perk__title">{p.title}</span>
                  <span className="perk__desc">{p.desc}</span>
                </span>
              </li>
            ))}
          </ul>
          {note && <p className="auth__note">{note}</p>}
        </div>
      </aside>

      <main className="auth__main">
        <div className="auth__top">
          <Link to="/" className="auth__logo-sm" aria-label="Polaris Guides School — bosh sahifa">
            <StarMark size={26} double={false} />
            <span className="sc">Polaris</span>
          </Link>
          <Link to={back.to} className="btn btn--outline auth__back">
            <Icon name="arrowLeft" size={16} strokeWidth={1.8} />
            {back.label}
          </Link>
        </div>

        <div className="auth__center">{children}</div>

        <p className="auth__copy">© 2026 Polaris Guides School</p>
      </main>
    </div>
  );
}

export function PhoneField({ id = 'tel', value, onChange }) {
  return (
    <div className="form-group">
      <label htmlFor={id} className="label">Telefon raqam</label>
      <div className="field">
        <span className="field__prefix">+998</span>
        <input
          id={id}
          name="phone"
          className="field__input"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="90 123 45 67"
          value={value}
          onChange={onChange}
          required
        />
      </div>
    </div>
  );
}

export function PasswordField({ id = 'parol', label = 'Parol', placeholder, autoComplete, hint, aside }) {
  const [shown, setShown] = useState(false);
  return (
    <div className="form-group">
      <div className="row-between">
        <label htmlFor={id} className="label">{label}</label>
        {aside}
      </div>
      <div className="field">
        <input
          id={id}
          name="password"
          className="field__input"
          type={shown ? 'text' : 'password'}
          autoComplete={autoComplete}
          placeholder={placeholder}
          aria-describedby={hint ? `${id}-hint` : undefined}
          minLength={hint ? 8 : undefined}
          required
        />
        <button
          type="button"
          className="icon-btn"
          aria-label={shown ? 'Parolni yashirish' : 'Parolni ko‘rsatish'}
          aria-pressed={shown}
          onClick={() => setShown(!shown)}
        >
          <Icon name={shown ? 'eyeOff' : 'eye'} size={20} strokeWidth={1.6} />
        </button>
      </div>
      {hint && <span id={`${id}-hint`} className="hint">{hint}</span>}
    </div>
  );
}
