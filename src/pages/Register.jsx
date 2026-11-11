import { Link, useNavigate } from 'react-router-dom';
import Seo from '../seo/Seo.jsx';
import Icon from '../components/Icon.jsx';
import AuthLayout, { PhoneField, PasswordField } from '../components/AuthLayout.jsx';
import Steps from '../components/Steps.jsx';

const PERKS = [
  { icon: 'play', title: 'Boshlang‘ich mini-kurs', desc: 'Gidlikka birinchi qadam' },
  { icon: 'bookmark', title: 'Materiallarni saqlash', desc: 'Kerakli qo‘llanmalar bir joyda' },
  { icon: 'checklist', title: 'Ayrim testlar', desc: 'Bilimingizni tekshirib ko‘ring' }
];

export default function Register() {
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    const phone = new FormData(e.currentTarget).get('phone') || '';
    // TODO: API orqali ro‘yxatdan o‘tkazish va SMS yuborish
    navigate('/tasdiqlash', { state: { phone } });
  };

  return (
    <>
      <Seo
        title="Ro‘yxatdan o‘tish"
        path="/royxat"
        description="Polaris Guides School’da bepul ro‘yxatdan o‘ting — boshlang‘ich gidlik mini-kursi, foydali materiallar va testlar darhol ochiladi."
      />
      <AuthLayout
        eyebrow="Bepul ro‘yxatdan o‘tish"
        title="Gidlik yo‘lingizni"
        emphasis="boshlang"
        text="Ro‘yxatdan o‘ting — boshlang‘ich mini-kurs va foydali materiallar darhol ochiladi."
        perks={PERKS}
        note="To‘liq kurs, topshiriqlar, ustoz fikri va AI mashqlari — kurs o‘quvchilari uchun."
      >
        <form className="auth-form" aria-labelledby="royxat-title" onSubmit={onSubmit} style={{ gap: 20 }}>
          <Steps current={1} />

          <div className="auth-form__head">
            <h1 id="royxat-title" className="auth-form__title">Ro‘yxatdan o‘tish</h1>
            <p className="auth-form__sub">Bir daqiqa vaqt oladi. Telefon raqamingizga tasdiqlash kodi yuboriladi.</p>
          </div>

          <div className="two-cols">
            <div className="form-group">
              <label htmlFor="ism" className="label">Ism</label>
              <div className="field">
                <input id="ism" name="firstName" className="field__input" type="text" autoComplete="given-name" placeholder="Ismingiz" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="familiya" className="label">Familiya</label>
              <div className="field">
                <input id="familiya" name="lastName" className="field__input" type="text" autoComplete="family-name" placeholder="Familiyangiz" required />
              </div>
            </div>
          </div>

          <PhoneField />
          <PasswordField placeholder="Yangi parol" autoComplete="new-password" hint="Kamida 8 ta belgi: harf va raqam" />

          <label className="check check--top">
            <input type="checkbox" name="terms" required />
            <span>
              <a href="#" className="link">Foydalanish shartlari</a> va <a href="#" className="link">maxfiylik siyosati</a>ga roziman
            </span>
          </label>

          <button type="submit" className="btn btn--lg btn--accent btn--block">
            Davom etish <Icon name="arrowRight" size={18} strokeWidth={1.8} />
          </button>

          <p className="fs-15 muted" style={{ margin: 0, textAlign: 'center' }}>
            Hisobingiz bormi? <Link to="/kirish" className="link" style={{ fontWeight: 700 }}>Kirish</Link>
          </p>
        </form>
      </AuthLayout>
    </>
  );
}
