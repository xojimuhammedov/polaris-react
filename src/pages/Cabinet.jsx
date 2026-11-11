import { Link } from 'react-router-dom';
import Seo from '../seo/Seo.jsx';
import Icon from '../components/Icon.jsx';
import CabinetLayout, { Bar } from '../components/CabinetLayout.jsx';
import { COURSE, USER } from '../data/course.js';

const STATS = [
  { label: 'O‘zlashtirish', value: '29%', bar: 29, note: '10 / 34 dars' },
  { label: 'Modullar', value: '2', of: '/ 8', note: 'tugallangan' },
  { label: 'Test bali', value: '86', note: '2 ta modul testi o‘rtachasi' },
  { label: 'Video vazifalar', value: '2', of: '/ 8', note: '1 tasi ustozda tekshirilmoqda' }
];

const DEADLINES = [
  { d: '30', m: 'Okt', title: 'Jonli dars: savol-javob', sub: '19:00 · onlayn', dark: true },
  { d: '3', m: 'Noy', title: 'Amaliyot: Registon', sub: '10:00 · Samarqand' },
  { d: '5', m: 'Noy', title: 'Bo‘lib to‘lash: 3-oy', sub: '[summa] · Click yoki Payme', pay: true }
];

export default function Cabinet() {
  return (
    <>
      <Seo title="Mening kurslarim" path="/kabinet" noindex />
      <CabinetLayout>
        <div className="topbar">
          <div className="topbar__greet">
            <h1>Xayrli kech, <em>{USER.first}</em></h1>
            <p>Bugun sizni 1 ta dars va jonli savol-javob kutmoqda.</p>
          </div>
          <div className="topbar__tools">
            <form role="search" className="field field--pill topbar__search" onSubmit={(e) => e.preventDefault()}>
              <Icon name="search" size={18} style={{ color: 'var(--muted)', flexShrink: 0 }} />
              <label htmlFor="qidiruv" className="sr-only">Darslar va materiallardan qidirish</label>
              <input id="qidiruv" type="search" className="field__input" placeholder="Darslardan qidirish" />
            </form>
            <button type="button" className="bell" aria-label="Bildirishnomalar, 2 ta yangi">
              <Icon name="bell" size={20} strokeWidth={1.6} />
              <span className="bell__dot" aria-hidden="true" />
            </button>
          </div>
        </div>

        <section aria-labelledby="davom-title" className="continue">
          <Link to="/kabinet/dars" aria-label="Darsni ko‘rishda davom etish" className="continue__thumb ph-dark">
            <span className="circle circle--accent" aria-hidden="true"><Icon name="play" size={22} /></span>
            <span className="continue__thumb-bar" aria-hidden="true"><span style={{ width: '52%' }} /></span>
          </Link>
          <div className="continue__body">
            <span className="kicker kicker--gold">Davom ettirish</span>
            <span className="fs-15" style={{ color: 'var(--on-dark-2)' }}>{COURSE.title} · 3-modul · 2-dars</span>
            <h2 id="davom-title">Registon ansambli: uch madrasa tarixi</h2>
            <div className="continue__progress">
              <div className="row-between fs-14" style={{ color: 'var(--on-dark)' }}>
                <span>12:40 / 24:10 ko‘rildi</span><span>52%</span>
              </div>
              <Bar value={52} accent dark label="Dars ko‘rilishi" />
            </div>
            <div className="btn-row" style={{ gap: 10, marginTop: 8 }}>
              <Link to="/kabinet/dars" className="btn btn--accent"><Icon name="play" size={15} />Davom ettirish</Link>
              <Link to="/kabinet/kurs" className="btn btn--ghost">Kurs dasturi</Link>
            </div>
          </div>
        </section>

        <div className="cols">
          <div className="cols__main">
            <section aria-labelledby="nat-title" className="stack" style={{ gap: 16 }}>
              <div className="row-between">
                <h2 id="nat-title" className="title t-26">Natijalarim</h2>
                <a href="#" className="link fs-15">Batafsil</a>
              </div>
              <div className="stats">
                {STATS.map((s) => (
                  <div className="stat" key={s.label}>
                    <span className="stat__label">{s.label}</span>
                    <span className="stat__value">{s.value}{s.of && <small> {s.of}</small>}</span>
                    {s.bar !== undefined && <Bar value={s.bar} />}
                    <span className="stat__note" style={s.bar !== undefined ? { marginTop: 0 } : undefined}>{s.note}</span>
                  </div>
                ))}
              </div>
            </section>

            <section aria-labelledby="kurs-title" className="stack" style={{ gap: 16 }}>
              <div className="row-between">
                <h2 id="kurs-title" className="title t-26">Mening kurslarim</h2>
                <span className="fs-15 muted">2 ta kurs</span>
              </div>
              <div className="courses">
                <article className="course-card card-hover">
                  <div className="course-card__cover ph-light">
                    Kurs muqovasi
                    <span className="course-card__tag">Sotib olingan</span>
                  </div>
                  <div className="course-card__body">
                    <div className="stack" style={{ gap: 6 }}>
                      <h3 className="title t-24">{COURSE.title}</h3>
                      <span className="fs-14 muted">8 modul · 34 dars · test va video vazifalar</span>
                    </div>
                    <div className="progress-row">
                      <Bar value={29} accent label="Kurs o‘zlashtirilishi" />
                      <span className="fs-14 fw-6">29%</span>
                    </div>
                    <span className="fs-14 muted">Keyingi: <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>3.2 Registon ansambli</strong></span>
                    <Link to="/kabinet/kurs" className="btn btn--ink">Kursga o‘tish <Icon name="arrowRight" size={16} strokeWidth={1.8} /></Link>
                  </div>
                </article>

                <article className="course-card card-hover">
                  <div className="course-card__cover ph-light">
                    Kurs muqovasi
                    <span className="course-card__tag course-card__tag--light">Bepul</span>
                  </div>
                  <div className="course-card__body">
                    <div className="stack" style={{ gap: 6 }}>
                      <h3 className="title t-24">Boshlang‘ich mini-kurs</h3>
                      <span className="fs-14 muted">1 modul · 5 dars</span>
                    </div>
                    <div className="progress-row">
                      <Bar value={100} label="Mini-kurs o‘zlashtirilishi" />
                      <span className="fs-14 fw-6">100%</span>
                    </div>
                    <span className="done-label"><Icon name="check" size={16} strokeWidth={2} />Tugallangan</span>
                    <a href="#" className="btn btn--outline-ink">Qayta ko‘rish</a>
                  </div>
                </article>
              </div>
            </section>
          </div>

          <div className="cols__side">
            <section aria-labelledby="muddat-title" className="panel" style={{ gap: 6 }}>
              <div className="row-between" style={{ marginBottom: 8 }}>
                <h2 id="muddat-title" className="title t-22">Yaqin muddatlar</h2>
                <a href="#" className="link fs-14">Jadval</a>
              </div>
              <ul className="deadlines">
                {DEADLINES.map((d) => (
                  <li key={d.title}>
                    <span className={`date-box ${d.dark ? 'date-box--dark' : ''}`}>
                      <b>{d.d}</b><small>{d.m}</small>
                    </span>
                    <span className="deadlines__body">
                      <span className="deadlines__title">{d.title}</span>
                      <span className="fs-14 muted">{d.sub}</span>
                    </span>
                    {d.pay && <a href="#" className="btn btn--sm btn--outline-ink">To‘lash</a>}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="ustoz-title" className="panel panel--dark">
              <div className="row-between" style={{ alignItems: 'center' }}>
                <h2 id="ustoz-title" className="kicker kicker--gold" style={{ margin: 0 }}>Ustoz fikri</h2>
                <span className="new-badge">Yangi</span>
              </div>
              <span className="fs-14" style={{ color: 'var(--on-dark-2)' }}>1-modul · video vazifa</span>
              <blockquote className="quote">“Hikoya tuzilmasi yaxshi. Sanalarni sekinroq ayting va turist bilan ko‘z aloqasini ushlang.”</blockquote>
              <a href="#" className="link-gold">Barcha izohlar <Icon name="arrowRight" size={15} strokeWidth={1.8} /></a>
            </section>

            <section aria-labelledby="ai-title" className="panel panel--sand" style={{ gap: 12 }}>
              <span className="circle circle--ink" aria-hidden="true"><Icon name="sparkle" size={20} strokeWidth={1.6} /></span>
              <h2 id="ai-title" className="title t-22">AI yordamchi</h2>
              <p className="fs-15 muted" style={{ margin: 0, lineHeight: 1.6 }}>Dars bo‘yicha savol bering yoki turist rolida suhbatni mashq qiling.</p>
              <Link to="/kabinet/dars" className="btn btn--ink" style={{ alignSelf: 'flex-start', height: 46, padding: '3px 20px 0' }}>Mashqni boshlash</Link>
            </section>
          </div>
        </div>
      </CabinetLayout>
    </>
  );
}
