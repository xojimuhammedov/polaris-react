import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../seo/Seo.jsx';
import { organizationSchema, websiteSchema, courseSchema } from '../seo/schema.js';
import Icon from '../components/Icon.jsx';
import { StarTrails } from '../components/Brand.jsx';
import SiteHeader from '../components/SiteHeader.jsx';
import SiteFooter from '../components/SiteFooter.jsx';

const MARQUEE = ['Samarqand', 'Buxoro', 'Xiva', 'Toshkent', 'Tarix va madaniyat', 'Me’morchilik', 'English', 'Italiano', 'Français', 'Gidlik mahorati'];

const LESSON_OUTLINE = ['Dars maqsadi', 'Video', 'Qisqa konspekt', 'Qo‘shimcha manbalar', 'Topshiriq va tekshiruv'];

export default function Home() {
  return (
    <>
      <Seo
        path="/"
        description="Polaris Guides School — gidlik kursi: 8 modul videodarslar, AI bilan turist savollariga javob berish mashqi, ustoz fikri va sertifikat. Samarqand, Buxoro, Xiva bo‘yicha ekskursiya mahorati."
        jsonLd={[organizationSchema(), websiteSchema(), courseSchema()]}
      />
      <a href="#asosiy" className="skip-link">Asosiy kontentga o‘tish</a>

      <header className="hero">
        <StarTrails className="hero__trails" />
        <svg className="hero__star twinkle" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1.5c.7 5.6 4.9 9.8 10.5 10.5-5.6.7-9.8 4.9-10.5 10.5-.7-5.6-4.9-9.8-10.5-10.5C7.1 11.3 11.3 7.1 12 1.5z" />
        </svg>

        <SiteHeader />

        <div className="hero__body">
          <a href="#ariza" className="hero__badge">
            <span className="hero__dot" aria-hidden="true" />
            <span className="hero__badge-text">Keyingi guruhga qabul ochiq — [sana]</span>
            <span className="hero__badge-cta">
              Ariza <Icon name="arrowRight" size={14} strokeWidth={1.8} />
            </span>
          </a>

          <h1 className="hero__title">
            <span>Gidlikni <em>o‘rganing.</em></span>
            <span>Sun’iy intellekt bilan <em>tayyorlaning.</em></span>
            <span>Amaliyotda <em>tajriba</em> orttiring.</span>
          </h1>

          <p className="hero__lead">
            Polaris Guides School — gidlikni o‘rganish va kasbiy rivojlanish maktabi. Bilim, AI bilan mashq va
            ustoz nazoratidagi amaliyot — bitta platformada.
          </p>

          <div className="hero__ctas">
            <a href="#imkoniyatlar" className="btn btn--lg btn--accent btn-hero">
              <span className="btn-hero__label">Kurs bilan tanishish</span>
              <span className="btn-hero__icon" aria-hidden="true"><Icon name="arrowRight" size={18} strokeWidth={1.8} /></span>
            </a>
            <a href="#bepul-dars" className="btn btn--lg btn--outline">Bepul materiallarni ko‘rish</a>
          </div>
        </div>
      </header>

      <main id="asosiy">
        <div className="marquee" aria-hidden="true">
          <div className="marquee__track">
            {MARQUEE.concat(MARQUEE).map((w, i) => (
              <div className="marquee__item" key={i}>
                <span className="marquee__word">{w}</span>
                <Icon name="star" size={14} />
              </div>
            ))}
          </div>
        </div>

        <Features />
        <FreeLesson />
        <Results />
        <Apply />
      </main>

      <SiteFooter />
    </>
  );
}

function Features() {
  return (
    <section id="imkoniyatlar" aria-labelledby="imk-title" className="section">
      <div className="container stack" style={{ gap: 56 }}>
        <div className="section-head">
          <div className="section-head__main">
            <span className="eyebrow"><Icon name="star" />Polaris kursi</span>
            <h2 id="imk-title" className="display-2">Bir platformada — dars, mashq va ustoz fikri</h2>
          </div>
          <p className="lead section-head__aside">
            O‘quvchi ekskursiya matnini tayyorlaydi, AI bilan turist savollariga javob berishni mashq qiladi, so‘ng
            ustozdan fikr oladi.
          </p>
        </div>

        <div className="features">
          <article className="feat-ai card-hover">
            <div className="feat-ai__copy">
              <span className="circle circle--ring" style={{ width: 48, height: 48 }} aria-hidden="true">
                <Icon name="video" size={22} strokeWidth={1.6} />
              </span>
              <span className="kicker kicker--gold">Amaliy vazifa · AI tahlil</span>
              <h3 className="title feat-ai__title">Gid sifatida videoga oling — AI nutqingizni tahlil qiladi</h3>
              <p className="feat-ai__text">
                Masalan, Registonda turistlarga ingliz, italyan yoki fransuz tilida gapirasiz. AI xatolar ro‘yxati
                bilan aniq fikr beradi, yakuniy bahoni ustoz qo‘yadi.
              </p>
              <ol className="flow" aria-label="Tahlil bosqichlari">
                {['Nutq', 'Matn', 'Grammatika va speaking'].map((s) => (
                  <li key={s} className="flow__item" style={{ display: 'contents' }}>
                    <span className="flow__step">{s}</span>
                    <span className="flow__arrow" aria-hidden="true">→</span>
                  </li>
                ))}
                <li className="flow__step flow__step--final">Feedback</li>
              </ol>
            </div>

            <div className="feat-ai__demo">
              <div className="demo-video ph-dark">
                <span className="circle demo-video__play" aria-hidden="true">
                  <Icon name="play" size={18} style={{ marginLeft: 2 }} />
                </span>
                <span className="demo-video__tag">Registon · English</span>
              </div>
              <div className="stack" style={{ gap: 8 }}>
                <span className="demo-label">Transkript</span>
                <p className="demo-transcript" lang="en">
                  “The Registan <del>are</del> <ins>is</ins> the heart of old Samarkand. It was <del>build</del>{' '}
                  <ins>built</ins> over three centuries…”
                </p>
              </div>
              <div className="stack" style={{ gap: 8 }}>
                <span className="demo-label">Xatolar ro‘yxati · 2</span>
                <ul className="errors">
                  <li><span className="errors__n">1</span><span><strong>are → is</strong> — ega va kesim moslashuvi</span></li>
                  <li><span className="errors__n">2</span><span><strong>build → built</strong> — o‘tgan zamon shakli</span></li>
                </ul>
              </div>
            </div>
          </article>

          <article className="feat-chat card-hover">
            <div className="chat">
              <div className="bubble bubble--me">Bibixonim masjidi qachon qurilgan?</div>
              <div className="bubble bubble--ai">
                <span>1399–1404-yillarda, Amir Temurning Hindiston yurishidan so‘ng qurilgan.</span>
                <span className="source-chip"><Icon name="doc" size={13} strokeWidth={1.6} />Manba: kurs materiali</span>
              </div>
              <form className="chat-input" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="ai-q" className="sr-only">AI yordamchiga savol</label>
                <input id="ai-q" type="text" placeholder="Savolingizni yozing…" />
                <button type="submit" className="icon-btn icon-btn--ink" aria-label="Savolni yuborish">
                  <Icon name="arrowUp" size={18} strokeWidth={1.8} />
                </button>
              </form>
            </div>
            <div className="stack" style={{ gap: 12 }}>
              <span className="kicker kicker-icon"><Icon name="chat" size={15} strokeWidth={1.6} />AI chat</span>
              <h3 className="title feat-chat__title">O‘qish davomida istalgan savolni bering</h3>
              <p>
                AI ustoz tasdiqlagan materiallarga tayanadi va manbani ko‘rsatadi. Materiallarda javob bo‘lmasa,
                buni ochiq aytadi.
              </p>
            </div>
          </article>

          <SmallFeature icon="layers" title="8 modul, video darslar">
            Har modulda 3–6 ta video dars, qo‘llanma va materiallar. Ko‘rilgan joyidan davom ettirasiz.
            <span className="segments" aria-hidden="true">
              {Array.from({ length: 8 }, (_, i) => <span key={i} className={i < 3 ? 'on' : ''} />)}
            </span>
          </SmallFeature>
          <SmallFeature icon="checklist" title="Modul testlari">
            Har moduldan keyin test. Natija va ball profilingizga saqlanadi, so‘ng keyingi modulga o‘tasiz.
          </SmallFeature>
          <SmallFeature icon="chatCheck" title="Ustoz fikri">
            AI mashq qildiradi, bajarilgan ishga izoh va yakuniy kasbiy bahoni esa ustoz beradi.
          </SmallFeature>
          <SmallFeature icon="medal" title="Sertifikat">
            Barcha modullar tugagach, to‘plangan ballar asosida beriladi. O‘quv markazidan offlayn olinadi.
          </SmallFeature>
        </div>
      </div>
    </section>
  );
}

function SmallFeature({ icon, title, children }) {
  const [text, extra] = Array.isArray(children) ? children : [children];
  return (
    <article className="feat-small card-hover">
      <span className="circle circle--ink" aria-hidden="true"><Icon name={icon} size={20} strokeWidth={1.6} /></span>
      <h3 className="title">{title}</h3>
      <p>{text}</p>
      {extra}
    </article>
  );
}

function FreeLesson() {
  return (
    <section id="bepul-dars" aria-labelledby="dars-title" className="section">
      <div className="container free">
        <div className="free__copy">
          <span className="eyebrow"><Icon name="star" />Bepul namunaviy dars</span>
          <h2 id="dars-title" className="display-2">Bir darsni hoziroq, bepul ko‘ring</h2>
          <p className="lead">
            Ro‘yxatdan o‘tmasdan namunaviy videodarsni ko‘ring va kurs qanday tuzilganini o‘zingiz his qiling.
          </p>
          <ol className="outline-list" aria-label="Dars sahifasi tuzilmasi">
            {LESSON_OUTLINE.map((item, i) => (
              <li key={item}><span className="outline-list__n">0{i + 1}</span>{item}</li>
            ))}
          </ol>
          <div className="btn-row" style={{ marginTop: 8 }}>
            <Link to="/kabinet/dars" className="btn btn--ink" style={{ height: 54, fontSize: 16 }}>
              <Icon name="play" size={16} />Darsni boshlash
            </Link>
            <Link to="/royxat" className="btn btn--outline" style={{ height: 54, fontSize: 16, fontWeight: 500 }}>
              Barcha bepul materiallar
            </Link>
          </div>
        </div>

        <div className="free__media">
          <div className="player-cover ph-dark">
            <div className="player-cover__top">
              <span className="chip-dark">Bepul · [davomiyligi]</span>
              <span className="ph-label"><Icon name="camera" size={16} strokeWidth={1.5} />Video muqovasi</span>
            </div>
            <div className="big-play">
              <span className="big-play__ring pulse" aria-hidden="true" />
              <button type="button" aria-label="Namunaviy darsni ijro etish">
                <Icon name="play" size={30} />
              </button>
            </div>
            <div className="player-cover__info">
              <div className="player-cover__meta">
                <span className="serif" style={{ fontSize: 20, lineHeight: 1.2 }}>[Namunaviy dars nomi]</span>
                <span className="fs-13" style={{ color: 'var(--on-dark-2)' }}>1-modul · Polaris gidlik kursi</span>
              </div>
              <div className="bar bar--thin bar--dark bar--accent" aria-hidden="true"><span style={{ width: '0%' }} /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Results() {
  return (
    <section id="natijalar" aria-labelledby="nat-title" className="section results">
      <div className="container stack" style={{ gap: 56 }}>
        <div className="section-head">
          <div className="section-head__main">
            <span className="eyebrow"><Icon name="star" />Bitiruvchilar va natijalar</span>
            <h2 id="nat-title" className="display-2">Haqiqiy natijalar — bitiruvchilarning o‘z so‘zlari bilan</h2>
          </div>
          <a href="#" className="link-underline">
            Barcha bitiruvchilar <Icon name="arrowUpRight" size={16} strokeWidth={1.8} />
          </a>
        </div>

        <div className="results__grid">
          <article className="story card-hover">
            <div className="story__media ph-light">
              <span className="circle" aria-hidden="true"><Icon name="play" size={20} style={{ marginLeft: 3 }} /></span>
              <span className="story__tag">Video hikoya</span>
            </div>
            <div className="story__body">
              <blockquote className="story__quote">“[Bitiruvchining o‘z hikoyasi — roziligi bilan joylanadi]”</blockquote>
              <div className="person">
                <span className="person__avatar ph-light" aria-hidden="true" />
                <span className="stack" style={{ gap: 4 }}>
                  <span style={{ fontSize: 16, fontWeight: 600 }}>[Ism Familiya]</span>
                  <span className="fs-14 muted">[Shahar] · [Ish tili]</span>
                </span>
              </div>
            </div>
          </article>

          <article className="photo-card card-hover" aria-label="Amaliyotdan lavha">
            <div className="photo-card__ph ph-light">
              <Icon name="camera" size={22} strokeWidth={1.5} />
              <span>Rasm · birinchi tur yoki amaliyotdan lavha</span>
            </div>
            <div className="photo-card__caption">
              <span className="kicker kicker--gold">Amaliyotdan lavha</span>
              <span className="serif" style={{ fontSize: 20, lineHeight: 1.3 }}>[Joy nomi, guruh, sana]</span>
            </div>
          </article>

          <article className="profile card-hover">
            <div className="profile__head">
              <span className="profile__photo ph-dark" aria-hidden="true" />
              <div className="stack" style={{ gap: 6, paddingBottom: 4 }}>
                <span className="kicker kicker--gold">Professional profil</span>
                <span className="serif" style={{ fontSize: 24, lineHeight: 1.2 }}>[Ism Familiya]</span>
              </div>
            </div>
            <dl className="dl">
              <div><dt>Shahar</dt><dd>[Samarqand]</dd></div>
              <div><dt>Ish tili</dt><dd>[Ingliz, italyan]</dd></div>
              <div><dt>Yo‘nalish</dt><dd>[Tarixiy ekskursiyalar]</dd></div>
            </dl>
            <a href="#" className="btn btn--ghost-gold" style={{ marginTop: 'auto' }}>
              Profilni ko‘rish <Icon name="arrowRight" size={16} strokeWidth={1.8} />
            </a>
            <span className="fs-13" style={{ color: 'var(--on-dark-2)', textAlign: 'center' }}>
              Faqat rozilik bildirgan bitiruvchilar profili ko‘rsatiladi
            </span>
          </article>
        </div>
      </div>
    </section>
  );
}

function Apply() {
  const [choice, setChoice] = useState('kurs');
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: arizani backend / Telegram botga yuborish
    setSent(true);
  };

  return (
    <section id="ariza" aria-labelledby="ariza-title" className="section apply">
      <StarTrails variant="cta" className="apply__trails" />
      <div className="container apply__inner">
        <div className="apply__copy">
          <span className="eyebrow"><Icon name="star" />Ariza</span>
          <h2 id="ariza-title" className="display-2">Keyingi guruhga yoki ochiq darsga yoziling</h2>
          <p className="lead">Ariza qoldiring — kurs sharoitlari, narx va jadval bo‘yicha siz bilan bog‘lanamiz.</p>
          <dl className="dl dl--lg dl--light" style={{ marginTop: 8 }}>
            <div><dt>Keyingi guruh</dt><dd className="serif">[sana]</dd></div>
            <div><dt>Ochiq dars</dt><dd className="serif">[sana, vaqt]</dd></div>
            <div><dt>To‘lov</dt><dd>Click · Payme — to‘liq yoki bo‘lib</dd></div>
          </dl>
        </div>

        <form className="apply-form" aria-labelledby="forma-title" onSubmit={onSubmit}>
          <h3 id="forma-title" className="title" style={{ fontSize: 28 }}>Ariza qoldirish</h3>

          <div className="stack" style={{ gap: 10 }}>
            <span id="tur-label" className="label">Nimaga yozilmoqchisiz?</span>
            <div className="segmented" role="group" aria-labelledby="tur-label">
              <button type="button" aria-pressed={choice === 'kurs'} onClick={() => setChoice('kurs')}>Gidlik kursi</button>
              <button type="button" aria-pressed={choice === 'dars'} onClick={() => setChoice('dars')}>Ochiq dars</button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="ariza-ism" className="label">Ismingiz</label>
            <input id="ariza-ism" name="name" className="input" type="text" autoComplete="name" placeholder="Ism va familiya" required />
          </div>
          <div className="form-group">
            <label htmlFor="ariza-tel" className="label">Telefon raqamingiz</label>
            <input id="ariza-tel" name="phone" className="input" type="tel" autoComplete="tel" placeholder="+998 __ ___ __ __" required />
          </div>

          <button type="submit" className="btn btn--lg btn--accent" style={{ marginTop: 4 }}>
            Ariza yuborish <Icon name="arrowRight" size={18} strokeWidth={1.8} />
          </button>

          <div aria-live="polite">
            {sent && (
              <p className="success" style={{ margin: 0 }}>
                <span className="circle" aria-hidden="true"><Icon name="check" size={16} strokeWidth={2} /></span>
                <span>Rahmat! {choice === 'kurs' ? 'Gidlik kursi' : 'Ochiq dars'} bo‘yicha arizangiz qabul qilindi — tez orada bog‘lanamiz.</span>
              </p>
            )}
          </div>
          <p className="form-note">Tugmani bosib, siz bilan bog‘lanish uchun ma’lumotlaringizdan foydalanishga rozilik bildirasiz.</p>
        </form>
      </div>
    </section>
  );
}
