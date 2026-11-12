import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../seo/Seo.jsx';
import Icon from '../components/Icon.jsx';
import CabinetLayout, { Bar } from '../components/CabinetLayout.jsx';
import { PasswordField } from '../components/AuthLayout.jsx';
import { COURSE, USER } from '../data/course.js';

const CITIES = ['Toshkent', 'Samarqand', 'Buxoro', 'Xiva', 'Namangan', 'Andijon', 'Farg‘ona', 'Qarshi', 'Nukus', 'Boshqa'];
const LANGS = ['O‘zbek', 'Rus', 'Ingliz', 'Nemis', 'Fransuz', 'Turk', 'Koreys', 'Xitoy'];
const NOTIFY = [
  { id: 'n-lessons', name: 'lessons', title: 'Yangi darslar va modullar', desc: 'Yangi dars ochilganda xabar beramiz', on: true },
  { id: 'n-deadlines', name: 'deadlines', title: 'Muddatlar va jonli darslar', desc: 'Test, vazifa va jonli dars eslatmalari', on: true },
  { id: 'n-feedback', name: 'feedback', title: 'Ustoz fikri', desc: 'Vazifangiz baholanganda', on: true },
  { id: 'n-news', name: 'news', title: 'Yangiliklar va takliflar', desc: 'Yangi kurslar va tadbirlar haqida', on: false }
];

// Demo ma'lumotlar — keyinchalik API'dan keladi
const INITIAL = {
  firstName: 'Aziza',
  lastName: 'Karimova',
  phone: '90 123 45 67',
  email: '',
  city: 'Samarqand',
  langs: ['O‘zbek', 'Rus', 'Ingliz']
};

export default function Profile() {
  const [form, setForm] = useState(INITIAL);
  const [saved, setSaved] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [pwState, setPwState] = useState(null); // null | 'ok' | 'mismatch'
  const fileRef = useRef(null);

  // Tanlangan rasm uchun yaratilgan vaqtinchalik URL'ni tozalash
  useEffect(() => () => photo && URL.revokeObjectURL(photo), [photo]);

  const update = (key) => (e) => {
    setSaved(false);
    setForm({ ...form, [key]: e.target.value });
  };
  const toggleLang = (lang) => {
    setSaved(false);
    setForm({ ...form, langs: form.langs.includes(lang) ? form.langs.filter((l) => l !== lang) : [...form.langs, lang] });
  };

  const onSave = (e) => {
    e.preventDefault();
    // TODO: API orqali profilni saqlash
    setSaved(true);
  };

  const onPhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // TODO: rasmni serverga yuklash
    setPhoto(URL.createObjectURL(file));
  };

  const onPassword = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get('newPassword') !== data.get('confirmPassword')) {
      setPwState('mismatch');
      return;
    }
    // TODO: API orqali parolni almashtirish
    setPwState('ok');
    e.currentTarget.reset();
  };

  const fullName = `${form.firstName} ${form.lastName}`.trim() || USER.name;
  const initials = `${form.firstName[0] || ''}${form.lastName[0] || ''}`.toUpperCase() || USER.initials;

  return (
    <>
      <Seo title="Profil" path="/kabinet/profil" noindex />
      <CabinetLayout>
        <div className="topbar">
          <div className="topbar__greet">
            <h1>Profil</h1>
            <p>Shaxsiy ma’lumotlaringiz, parol va bildirishnomalar.</p>
          </div>
        </div>

        <section aria-label="Profil kartasi" className="acc-hero">
          <div className="acc-hero__photo">
            {photo ? <img src={photo} alt="" /> : <span aria-hidden="true">{initials}</span>}
            <button type="button" className="acc-hero__cam" aria-label="Profil rasmini yangilash" onClick={() => fileRef.current?.click()}>
              <Icon name="camera" size={16} strokeWidth={1.8} />
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="sr-only" tabIndex={-1} aria-hidden="true" onChange={onPhoto} />
          </div>
          <div className="acc-hero__info">
            <span className="kicker">{USER.role}</span>
            <h2 className="acc-hero__name">{fullName}</h2>
            <div className="acc-hero__meta">
              <span><Icon name="phone" size={15} strokeWidth={1.7} />+998 {form.phone}</span>
              {form.city && <span><Icon name="star" size={11} />{form.city}</span>}
              <span><Icon name="calendar" size={15} strokeWidth={1.7} />Sentabr 2026 dan beri</span>
            </div>
          </div>
          <div className="acc-hero__course">
            <div className="row-between fs-14">
              <span className="fw-6">{COURSE.title}</span>
              <span className="muted">{COURSE.progress}%</span>
            </div>
            <Bar value={COURSE.progress} accent label="Kurs o‘zlashtirilishi" />
            <span className="fs-13 muted">{COURSE.lessonsDone} / {COURSE.lessonsTotal} dars · o‘rtacha ball {COURSE.avgScore}</span>
          </div>
        </section>

        <div className="cols">
          <div className="cols__main">
            <form className="panel acc-panel" aria-labelledby="malumot-title" onSubmit={onSave}>
              <div className="acc-panel__head">
                <h2 id="malumot-title" className="title t-22">Shaxsiy ma’lumotlar</h2>
                <p className="fs-14 muted" style={{ margin: 0 }}>Bu ma’lumotlar sertifikat va ustoz bilan aloqa uchun ishlatiladi.</p>
              </div>

              <div className="two-cols">
                <div className="form-group">
                  <label htmlFor="p-ism" className="label">Ism</label>
                  <div className="field">
                    <input id="p-ism" name="firstName" className="field__input" type="text" autoComplete="given-name" value={form.firstName} onChange={update('firstName')} required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="p-familiya" className="label">Familiya</label>
                  <div className="field">
                    <input id="p-familiya" name="lastName" className="field__input" type="text" autoComplete="family-name" value={form.lastName} onChange={update('lastName')} required />
                  </div>
                </div>
              </div>

              <div className="two-cols">
                <div className="form-group">
                  <label htmlFor="p-tel" className="label">Telefon raqam</label>
                  <div className="field">
                    <span className="field__prefix">+998</span>
                    <input id="p-tel" name="phone" className="field__input" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="90 123 45 67" value={form.phone} onChange={update('phone')} required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="p-email" className="label">Email <span className="hint">(ixtiyoriy)</span></label>
                  <div className="field">
                    <input id="p-email" name="email" className="field__input" type="email" autoComplete="email" placeholder="ism@pochta.uz" value={form.email} onChange={update('email')} />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="p-shahar" className="label">Shahar</label>
                <div className="field acc-select">
                  <select id="p-shahar" name="city" className="field__input" value={form.city} onChange={update('city')}>
                    {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <Icon name="chevronDown" size={18} strokeWidth={1.8} />
                </div>
              </div>

              <fieldset className="form-group acc-fieldset">
                <legend className="label">Ekskursiya tillari</legend>
                <div className="acc-chips">
                  {LANGS.map((l) => (
                    <button type="button" key={l} className="acc-chip" aria-pressed={form.langs.includes(l)} onClick={() => toggleLang(l)}>
                      {form.langs.includes(l) && <Icon name="check" size={14} strokeWidth={2.2} />}
                      {l}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="acc-actions">
                {saved && (
                  <span className="acc-saved" role="status"><Icon name="check" size={16} strokeWidth={2.2} />Saqlandi</span>
                )}
                <button type="button" className="btn btn--outline" onClick={() => { setForm(INITIAL); setSaved(false); }}>Bekor qilish</button>
                <button type="submit" className="btn btn--ink">Saqlash</button>
              </div>
            </form>

            <form className="panel acc-panel" aria-labelledby="parol-title" onSubmit={onPassword}>
              <div className="acc-panel__head">
                <h2 id="parol-title" className="title t-22">Parolni almashtirish</h2>
                <p className="fs-14 muted" style={{ margin: 0 }}>Kamida 8 ta belgi: harf va raqam.</p>
              </div>
              <PasswordField id="p-joriy" name="currentPassword" label="Joriy parol" autoComplete="current-password" />
              <div className="two-cols">
                <PasswordField id="p-yangi" name="newPassword" label="Yangi parol" autoComplete="new-password" minLength={8} />
                <PasswordField id="p-takror" name="confirmPassword" label="Yangi parolni takrorlang" autoComplete="new-password" minLength={8} />
              </div>
              {pwState === 'mismatch' && <p className="error-msg" role="alert">Yangi parollar bir xil emas.</p>}
              <div className="acc-actions">
                {pwState === 'ok' && (
                  <span className="acc-saved" role="status"><Icon name="check" size={16} strokeWidth={2.2} />Parol yangilandi</span>
                )}
                <button type="submit" className="btn btn--ink">Parolni yangilash</button>
              </div>
            </form>
          </div>

          <div className="cols__side">
            <form className="panel" aria-labelledby="xabar-title" onSubmit={(e) => e.preventDefault()}>
              <h2 id="xabar-title" className="title t-22">Bildirishnomalar</h2>
              <p className="fs-14 muted" style={{ margin: 0 }}>Telegram bot orqali yuboriladi.</p>
              <ul className="acc-toggles">
                {NOTIFY.map((n) => (
                  <li key={n.id}>
                    <label htmlFor={n.id} className="acc-toggle">
                      <span className="acc-toggle__body">
                        <span className="acc-toggle__title">{n.title}</span>
                        <span className="acc-toggle__desc">{n.desc}</span>
                      </span>
                      <input id={n.id} name={n.name} type="checkbox" role="switch" defaultChecked={n.on} className="switch" />
                    </label>
                  </li>
                ))}
              </ul>
            </form>

            <section className="panel" aria-labelledby="hisob-title">
              <h2 id="hisob-title" className="title t-22">Hisob</h2>
              <Link to="/kabinet" className="acc-link">
                <Icon name="book" size={18} strokeWidth={1.6} />Mening kurslarim
                <Icon name="arrowRight" size={16} strokeWidth={1.8} />
              </Link>
              <Link to="/kirish" className="btn btn--outline btn--block">
                <Icon name="logout" size={18} strokeWidth={1.6} />Hisobdan chiqish
              </Link>
            </section>
          </div>
        </div>
      </CabinetLayout>
    </>
  );
}
