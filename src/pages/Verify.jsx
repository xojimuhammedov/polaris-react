import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Seo from '../seo/Seo.jsx';
import Icon from '../components/Icon.jsx';
import AuthLayout from '../components/AuthLayout.jsx';
import Steps from '../components/Steps.jsx';

const PERKS = [
  { icon: 'play', title: 'Boshlang‘ich mini-kurs', desc: 'Gidlikka birinchi qadam' },
  { icon: 'bookmark', title: 'Materiallarni saqlash', desc: 'Kerakli qo‘llanmalar bir joyda' },
  { icon: 'checklist', title: 'Ayrim testlar', desc: 'Bilimingizni tekshirib ko‘ring' }
];
const LENGTH = 6;
const RESEND_SECONDS = 45;

const maskPhone = (raw) => {
  const d = (raw || '').replace(/\D/g, '');
  if (d.length < 4) return '+998 90 *** ** 67';
  return `+998 ${d.slice(0, 2)} *** ** ${d.slice(-2)}`;
};

export default function Verify() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [digits, setDigits] = useState(Array(LENGTH).fill(''));
  const [seconds, setSeconds] = useState(RESEND_SECONDS);
  const [error, setError] = useState('');
  const refs = useRef([]);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const setAt = (i, v) => setDigits((prev) => prev.map((d, j) => (j === i ? v : d)));

  const onChange = (i, e) => {
    const v = e.target.value.replace(/\D/g, '');
    if (!v) return setAt(i, '');
    if (v.length > 1) return fillFrom(i, v);
    setAt(i, v);
    setError('');
    if (i < LENGTH - 1) refs.current[i + 1]?.focus();
  };

  const fillFrom = (start, str) => {
    setDigits((prev) => {
      const next = [...prev];
      str.split('').slice(0, LENGTH - start).forEach((ch, k) => (next[start + k] = ch));
      return next;
    });
    refs.current[Math.min(start + str.length, LENGTH - 1)]?.focus();
  };

  const onKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) refs.current[i - 1]?.focus();
    if (e.key === 'ArrowLeft' && i > 0) refs.current[i - 1]?.focus();
    if (e.key === 'ArrowRight' && i < LENGTH - 1) refs.current[i + 1]?.focus();
  };

  const onPaste = (i, e) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '');
    if (!text) return;
    e.preventDefault();
    fillFrom(i, text);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (digits.some((d) => !d)) {
      setError('Iltimos, 6 xonali kodni to‘liq kiriting.');
      return;
    }
    // TODO: kodni API orqali tekshirish
    navigate('/kabinet');
  };

  const mm = Math.floor(seconds / 60);
  const ss = String(seconds % 60).padStart(2, '0');

  return (
    <>
      <Seo title="Raqamni tasdiqlash" path="/tasdiqlash" noindex />
      <AuthLayout
        eyebrow="Bepul ro‘yxatdan o‘tish"
        title="Gidlik yo‘lingizni"
        emphasis="boshlang"
        text="Ro‘yxatdan o‘ting — boshlang‘ich mini-kurs va foydali materiallar darhol ochiladi."
        perks={PERKS}
        note="To‘liq kurs, topshiriqlar, ustoz fikri va AI mashqlari — kurs o‘quvchilari uchun."
        back={{ to: '/royxat', label: 'Ortga' }}
      >
        <form className="auth-form" aria-labelledby="tasdiq-title" onSubmit={onSubmit} style={{ gap: 24 }} noValidate>
          <Steps current={2} />

          <span className="circle circle--ink" style={{ width: 64, height: 64 }} aria-hidden="true">
            <Icon name="phone" size={26} strokeWidth={1.6} />
          </span>

          <div className="auth-form__head">
            <h1 id="tasdiq-title" className="auth-form__title">Raqamingizni tasdiqlang</h1>
            <p className="auth-form__sub">
              <strong>{maskPhone(state?.phone)}</strong> raqamiga SMS orqali 6 xonali kod yubordik.{' '}
              <Link to="/royxat" className="link">Raqamni o‘zgartirish</Link>
            </p>
          </div>

          <fieldset style={{ border: 0, margin: 0, padding: 0, minWidth: 0 }}>
            <legend className="sr-only">Tasdiqlash kodi</legend>
            <div className="otp">
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => (refs.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  autoComplete={i === 0 ? 'one-time-code' : 'off'}
                  maxLength={i === 0 ? LENGTH : 1}
                  aria-label={`${i + 1}-raqam`}
                  aria-invalid={!!error && !d}
                  value={d}
                  onChange={(e) => onChange(i, e)}
                  onKeyDown={(e) => onKeyDown(i, e)}
                  onPaste={(e) => onPaste(i, e)}
                  onFocus={(e) => e.target.select()}
                />
              ))}
            </div>
          </fieldset>
          <div aria-live="polite">{error && <p className="error-msg">{error}</p>}</div>

          <div className="resend">
            <span className="resend__timer">
              <Icon name="clock" size={18} strokeWidth={1.6} />
              {seconds > 0 ? <>Kodni qayta yuborish: <strong>{mm}:{ss}</strong></> : 'Kod kelmadimi?'}
            </span>
            <button type="button" disabled={seconds > 0} onClick={() => setSeconds(RESEND_SECONDS)}>
              Qayta yuborish
            </button>
          </div>

          <button type="submit" className="btn btn--lg btn--accent btn--block">
            Tasdiqlash va kabinetga o‘tish <Icon name="arrowRight" size={18} strokeWidth={1.8} />
          </button>
        </form>
      </AuthLayout>
    </>
  );
}
