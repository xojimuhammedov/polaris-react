import { Link, useNavigate } from 'react-router-dom';
import Seo from '../seo/Seo.jsx';
import Icon from '../components/Icon.jsx';
import AuthLayout, { PhoneField, PasswordField } from '../components/AuthLayout.jsx';

const PERKS = [
  { icon: 'play', title: 'Videodarslar', desc: 'Ko‘rilgan joyidan davom ettirasiz' },
  { icon: 'chart', title: 'Natijalarim', desc: 'O‘tilgan darslar, baholar va vazifalar' },
  { icon: 'chat', title: 'AI yordamchi', desc: 'O‘rganish va turist bilan mashq uchun' }
];

export default function Login() {
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: API orqali autentifikatsiya
    navigate('/kabinet');
  };

  return (
    <>
      <Seo
        title="Kabinetga kirish"
        path="/kirish"
        description="Polaris Guides School shaxsiy kabinetiga kiring: videodarslarni davom ettiring, test natijalari va ustoz fikrini kuzating."
      />
      <AuthLayout
        eyebrow="Shaxsiy kabinet"
        title="Darsingiz sizni"
        emphasis="kutmoqda"
        text="Ko‘rilgan joyidan davom eting, natijalaringizni kuzating va ustoz fikrini oling."
        perks={PERKS}
      >
        <form className="auth-form auth-form--narrow" aria-labelledby="kirish-title" onSubmit={onSubmit}>
          <div className="auth-form__head">
            <h1 id="kirish-title" className="auth-form__title">Kabinetga kirish</h1>
            <p className="auth-form__sub">Telefon raqamingiz va parolingizni kiriting.</p>
          </div>

          <PhoneField />
          <PasswordField
            placeholder="Parolingiz"
            autoComplete="current-password"
            aside={<a href="#" className="link fs-14">Parolni unutdingizmi?</a>}
          />

          <label className="check">
            <input type="checkbox" name="remember" />
            <span>Meni eslab qol</span>
          </label>

          <button type="submit" className="btn btn--lg btn--accent btn--block">
            Kirish <Icon name="arrowRight" size={18} strokeWidth={1.8} />
          </button>

          <div className="divider"><span>Hisobingiz yo‘qmi?</span></div>

          <Link to="/royxat" className="btn btn--lg btn--outline-ink btn--block" style={{ height: 56 }}>
            Ro‘yxatdan o‘tish
          </Link>
        </form>
      </AuthLayout>
    </>
  );
}
