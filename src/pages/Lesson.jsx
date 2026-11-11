import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../seo/Seo.jsx';
import Icon from '../components/Icon.jsx';
import { StarMark } from '../components/Brand.jsx';
import { Bar } from '../components/CabinetLayout.jsx';
import { COURSE, MODULES, USER } from '../data/course.js';

const TABS = [
  { id: 'konspekt', label: 'Konspekt' },
  { id: 'materiallar', label: 'Materiallar · 3' },
  { id: 'topshiriq', label: 'Topshiriq' },
  { id: 'ai', label: 'AI yordamchi' }
];
const FORMATS = [
  { id: 'matn', label: 'Matn', drop: 'Matn faylini yuklang', accept: '.txt,.doc,.docx,.pdf' },
  { id: 'audio', label: 'Audio', drop: 'Audio yozuvni yuklang', accept: 'audio/*' },
  { id: 'video', label: 'Video', drop: 'Video faylni yuklang', accept: 'video/*' }
];
const FILES = [
  { icon: 'doc', title: 'Dars taqdimoti', meta: 'PDF · 4,2 MB' },
  { icon: 'headphones', title: 'Audio konspekt', meta: 'MP3 · 18 daqiqa' },
  { icon: 'book', title: 'Me’morchilik atamalari lug‘ati', meta: 'DOCX · 320 KB' }
];
const MODULE = MODULES[2];
const CURRENT = '3.2';

export default function Lesson() {
  const [tab, setTab] = useState('konspekt');

  const onTabKey = (e) => {
    const i = TABS.findIndex((t) => t.id === tab);
    const next = e.key === 'ArrowRight' ? (i + 1) % TABS.length : e.key === 'ArrowLeft' ? (i - 1 + TABS.length) % TABS.length : null;
    if (next === null) return;
    e.preventDefault();
    setTab(TABS[next].id);
    document.getElementById(`tab-${TABS[next].id}`)?.focus();
  };

  return (
    <>
      <Seo title="3.2 Registon ansambli: uch madrasa tarixi" path="/kabinet/dars" noindex type="article" />

      <header className="lesson-top">
        <Link to="/" className="lesson-top__brand" aria-label="Polaris Guides School — bosh sahifa">
          <StarMark size={26} double={false} />
          <span className="sc">Polaris</span>
        </Link>
        <Link to="/kabinet/kurs" className="btn btn--ghost" style={{ height: 44, padding: '3px 16px 0 12px', gap: 8, fontWeight: 400 }}>
          <Icon name="arrowLeft" size={16} strokeWidth={1.8} />Kursga qaytish
        </Link>
        <div className="lesson-top__progress">
          <div><span>{COURSE.title}</span><span>{COURSE.progress}% o‘zlashtirildi</span></div>
          <Bar value={COURSE.progress} accent dark className="bar--thin" label="Kurs o‘zlashtirilishi" />
        </div>
        <Link to="/kabinet" className="avatar avatar--44" aria-label="Shaxsiy kabinet">{USER.initials}</Link>
      </header>

      <div className="lesson-wrap">
        <main className="lesson-main">
          <div className="stack" style={{ gap: 12 }}>
            <span className="kicker" style={{ fontSize: 13, letterSpacing: '.18em' }}>3-modul · Shaharlar va obidalar · 2-dars</span>
            <h1>Registon ansambli: uch madrasa tarixi</h1>
            <div className="pills">
              {['Video · 24 daqiqa', 'Konspekt', '3 ta material', 'Topshiriq'].map((p) => (
                <span key={p} className="pill pill--outline">{p}</span>
              ))}
            </div>
          </div>

          <section aria-labelledby="maqsad-title" className="panel" style={{ borderRadius: 22, padding: '20px 22px', gap: 12 }}>
            <h2 id="maqsad-title" className="kicker" style={{ margin: 0, letterSpacing: '.2em' }}>Dars maqsadi</h2>
            <ul className="goals">
              {['Uch madrasaning qurilish davri va homiylarini bilish', 'Ansambl haqida 2 daqiqalik hikoya tuzish', 'Turistlar ko‘p beradigan savollarga javob tayyorlash'].map((g) => (
                <li key={g}><Icon name="star" size={14} />{g}</li>
              ))}
            </ul>
          </section>

          <Player />

          <div className="stack" style={{ gap: 18 }}>
            <div className="tabs" role="tablist" aria-label="Dars bo‘limlari" onKeyDown={onTabKey}>
              {TABS.map((t) => (
                <button
                  key={t.id}
                  id={`tab-${t.id}`}
                  type="button"
                  role="tab"
                  className="tab"
                  aria-selected={tab === t.id}
                  aria-controls={`panel-${t.id}`}
                  tabIndex={tab === t.id ? 0 : -1}
                  onClick={() => setTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {tab === 'konspekt' && <Konspekt />}
            {tab === 'materiallar' && <Materials />}
            {tab === 'topshiriq' && <Assignment />}
            {tab === 'ai' && <Assistant />}
          </div>

          <nav aria-label="Darslar orasida" className="lesson-pager">
            <Link to="/kabinet/kurs" className="pager-link">
              <Icon name="arrowLeft" size={18} strokeWidth={1.8} />
              <span><small>Oldingi dars</small><b>3.1 Samarqand: shahar bilan tanishuv</b></span>
            </Link>
            <Link to="/kabinet/kurs" className="pager-link pager-link--next">
              <span><small>Darsni tugatish</small><b>Keyingisi: 3.3 Shohi Zinda va Bibixonim</b></span>
              <Icon name="arrowRight" size={18} strokeWidth={1.8} />
            </Link>
          </nav>
        </main>

        <aside aria-labelledby="modul-title" className="lesson-aside">
          <section className="panel" style={{ padding: 20 }}>
            <div className="stack" style={{ gap: 6 }}>
              <span className="kicker" style={{ letterSpacing: '.2em' }}>{MODULE.n}-modul</span>
              <h2 id="modul-title" className="title t-22">{MODULE.title}</h2>
            </div>
            <div className="progress-row">
              <Bar value={20} className="bar--5" label="Modul o‘zlashtirilishi" />
              <span className="fs-14 fw-6">1 / 5 dars</span>
            </div>

            <ol className="mini-lessons">
              {MODULE.lessons.map((l) => {
                const current = l.code === CURRENT;
                return (
                  <li key={l.code}>
                    <Link to="/kabinet/dars" className="mini-lesson" aria-current={current ? 'page' : undefined}>
                      {l.s === 'done' && <span className="circle circle--ink" aria-hidden="true"><Icon name="check" size={14} strokeWidth={2} /></span>}
                      {current && <span className="circle circle--accent" aria-hidden="true"><Icon name="play" size={12} style={{ marginLeft: 2 }} /></span>}
                      {l.s === 'todo' && <span className="circle circle--line" aria-hidden="true"><Icon name="playOutline" size={12} strokeWidth={1.6} style={{ marginLeft: 2 }} /></span>}
                      <span className="mini-lesson__body">
                        <span className="mini-lesson__title">{l.code} {l.title}</span>
                        <span className="mini-lesson__sub">
                          {l.s === 'done' ? `Ko‘rildi · ${l.dur}` : current ? `Hozir · ${l.pct}% ko‘rildi` : l.dur}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>

            <div className="mini-extras">
              <div>
                <span className="circle circle--lock" aria-hidden="true"><Icon name="lock" size={14} strokeWidth={1.6} /></span>
                <span className="stack" style={{ gap: 2 }}><span className="fs-15">3-modul testi</span><span className="fs-13 muted" style={{ fontSize: 12 }}>Barcha darslar tugagach ochiladi</span></span>
              </div>
              <div>
                <span className="circle circle--lock" aria-hidden="true"><Icon name="lock" size={14} strokeWidth={1.6} /></span>
                <span className="stack" style={{ gap: 2 }}><span className="fs-15">Video vazifa</span><span className="fs-13 muted" style={{ fontSize: 12 }}>Test topshirilgach ochiladi</span></span>
              </div>
            </div>
          </section>

          <Link to="/kabinet/kurs" className="btn btn--outline-ink">Barcha modullar</Link>
        </aside>
      </div>
    </>
  );
}

function Player() {
  return (
    <section aria-label="Videodars" className="player ph-dark">
      <span className="player__resume"><Icon name="clock" size={15} strokeWidth={1.6} />Ko‘rilgan joyidan davom etadi · 12:40</span>
      <span className="ph-label player__ph">Video muqovasi</span>

      <div className="big-play big-play--sm">
        <span className="big-play__ring pulse" aria-hidden="true" />
        <button type="button" aria-label="Videoni ijro etish"><Icon name="play" size={28} /></button>
      </div>

      <div className="player__controls">
        <div className="player__track" role="progressbar" aria-label="Video holati" aria-valuenow={52} aria-valuemin={0} aria-valuemax={100}>
          <span style={{ width: '52%' }} />
          <span className="player__knob" style={{ left: '52%' }} aria-hidden="true" />
        </div>
        <div className="player__row">
          <button type="button" className="icon-btn" aria-label="Ijro etish"><Icon name="play" size={18} /></button>
          <button type="button" className="icon-btn" aria-label="Ovoz"><Icon name="volume" size={20} strokeWidth={1.6} /></button>
          <span className="player__time">12:40 / 24:10</span>
          <span className="spacer" />
          <button type="button" className="icon-btn player__speed" aria-label="Ijro tezligi: 1x">1x</button>
          <button type="button" className="icon-btn" aria-label="Subtitrlar"><Icon name="cc" size={20} strokeWidth={1.6} /></button>
          <button type="button" className="icon-btn" aria-label="To‘liq ekran"><Icon name="fullscreen" size={20} strokeWidth={1.6} /></button>
        </div>
      </div>
    </section>
  );
}

function Konspekt() {
  return (
    <section role="tabpanel" id="panel-konspekt" aria-labelledby="tab-konspekt" className="tabpanel">
      <p className="prose">Registon — Samarqandning markaziy maydoni. Ansambl uch madrasadan iborat va ular uch xil davrda qurilgan.</p>
      <dl className="facts">
        <div><dt>Ulug‘bek madrasasi</dt><dd>1417–1420-yillar</dd></div>
        <div><dt>Sherdor madrasasi</dt><dd>1619–1636-yillar</dd></div>
        <div><dt>Tillakori madrasasi</dt><dd>1646–1660-yillar</dd></div>
      </dl>
      <p className="prose">
        Ulug‘bek madrasasi o‘z davrining yirik ilm markazlaridan biri bo‘lgan. Sherdor peshtoqidagi sher va quyosh tasviri
        hamda Tillakori ichidagi zarhal bezaklar turistlar e’tiborini eng ko‘p tortadi.
      </p>
      <aside className="tip">
        <Icon name="star" size={18} />
        <div className="tip__body">
          <span className="kicker kicker--gold" style={{ letterSpacing: '.2em' }}>Gid uchun izoh</span>
          <p>
            Turistlar ko‘pincha «Nega uchta madrasa bir maydonda?» deb so‘raydi. Javobni ikki jumlada tayyorlang: qurilish
            davrlari va maydonning shahar markazi sifatidagi o‘rni.
          </p>
        </div>
      </aside>
    </section>
  );
}

function Materials() {
  return (
    <section role="tabpanel" id="panel-materiallar" aria-labelledby="tab-materiallar" className="tabpanel tabpanel--list">
      {FILES.map((f) => (
        <div className="file-row" key={f.title}>
          <span className="circle circle--ink file-row__icon" aria-hidden="true"><Icon name={f.icon} size={20} strokeWidth={1.6} /></span>
          <span className="file-row__body"><span style={{ fontSize: 16, fontWeight: 600 }}>{f.title}</span><span className="fs-13 muted">{f.meta}</span></span>
          <a href="#" className="file-row__dl" aria-label={`Yuklab olish: ${f.title}`}><Icon name="download" size={18} /></a>
        </div>
      ))}
    </section>
  );
}

function Assignment() {
  const [fmt, setFmt] = useState('video');
  const [file, setFile] = useState(null);
  const [over, setOver] = useState(false);
  const current = FORMATS.find((f) => f.id === fmt);

  return (
    <section role="tabpanel" id="panel-topshiriq" aria-labelledby="tab-topshiriq" className="tabpanel">
      <div className="row-between" style={{ flexWrap: 'wrap', alignItems: 'flex-start', gap: '12px 24px' }}>
        <div className="stack" style={{ flex: '1 1 320px', minWidth: 0, gap: 8 }}>
          <h2 className="title t-24" style={{ lineHeight: 1.25 }}>Registon haqida 2 daqiqalik ekskursiya</h2>
          <p className="muted" style={{ margin: 0, fontSize: 16, lineHeight: 1.6 }}>
            Turist guruhiga gapirayotgandek tayyorlang. AI tuzilma va tilni tahlil qiladi, yakuniy bahoni ustoz beradi.
          </p>
        </div>
        <span className="pill pill--sand"><Icon name="clock" size={15} strokeWidth={1.6} />Muddat: 6-noyabr</span>
      </div>

      <div className="stack" style={{ gap: 10 }}>
        <span id="shakl-label" className="label">Topshirish shakli</span>
        <div className="segmented" role="group" aria-labelledby="shakl-label" style={{ maxWidth: 420 }}>
          {FORMATS.map((f) => (
            <button key={f.id} type="button" aria-pressed={fmt === f.id} onClick={() => { setFmt(f.id); setFile(null); }} style={{ height: 44 }}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <label
        htmlFor="vazifa-fayl"
        className={`drop ${over ? 'drop--over' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => { e.preventDefault(); setOver(false); setFile(e.dataTransfer.files[0] || null); }}
      >
        <span className="circle circle--ink" aria-hidden="true"><Icon name="upload" size={22} /></span>
        <span style={{ fontSize: 16, fontWeight: 600 }}>{file ? file.name : current.drop}</span>
        <span className="fs-14 muted">{file ? 'Boshqa fayl tanlash uchun bosing' : 'Faylni shu yerga tashlang yoki bosib tanlang'}</span>
        <input id="vazifa-fayl" type="file" className="sr-only" accept={current.accept} onChange={(e) => setFile(e.target.files[0] || null)} />
      </label>

      <div className="row-between" style={{ flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
        <span className="fs-14 muted">Ustoz fikri shu sahifada ko‘rinadi</span>
        <button type="button" className="btn btn--accent" disabled={!file} style={{ padding: '3px 26px 0' }}>
          Topshirish <Icon name="arrowRight" size={17} strokeWidth={1.8} />
        </button>
      </div>
    </section>
  );
}

function Assistant() {
  const [messages, setMessages] = useState([
    { me: false, text: 'Salom! Shu dars bo‘yicha savolingiz bormi yoki turist rolida suhbatni mashq qilamizmi?' }
  ]);
  const [draft, setDraft] = useState('');

  const send = (text) => {
    if (!text.trim()) return;
    // TODO: AI API bilan ulash
    setMessages((m) => [...m, { me: true, text }, { me: false, text: 'Yaxshi savol! Bu javob kurs materiallari asosida tayyorlanadi (demo).' }]);
    setDraft('');
  };

  return (
    <section role="tabpanel" id="panel-ai" aria-labelledby="tab-ai" className="tabpanel tabpanel--chat">
      <div className="stack" style={{ gap: 12 }} aria-live="polite">
        {messages.map((m, i) => (
          <div key={i} className={`ai-msg ${m.me ? 'ai-msg--me' : ''}`}>
            {!m.me && <span className="circle circle--ink" aria-hidden="true"><Icon name="sparkle" size={17} strokeWidth={1.6} /></span>}
            <div className="ai-msg__text">{m.text}</div>
          </div>
        ))}
      </div>
      <div className="quick-replies">
        {['Mavzuni soddaroq tushuntir', 'Menga savol ber', 'Turist rolida mashq'].map((q) => (
          <button key={q} type="button" onClick={() => send(q)}>{q}</button>
        ))}
      </div>
      <form className="field chat-field" onSubmit={(e) => { e.preventDefault(); send(draft); }}>
        <label htmlFor="ai-savol" className="sr-only">AI yordamchiga xabar</label>
        <input id="ai-savol" className="field__input" type="text" placeholder="Savolingizni yozing…" value={draft} onChange={(e) => setDraft(e.target.value)} />
        <button type="button" className="icon-btn" aria-label="Ovozli xabar"><Icon name="mic" size={19} strokeWidth={1.6} /></button>
        <button type="submit" className="icon-btn icon-btn--ink" aria-label="Yuborish"><Icon name="arrowUp" size={18} strokeWidth={1.8} /></button>
      </form>
      <span className="fs-13 muted" style={{ paddingLeft: 4 }}>AI ustoz tasdiqlagan materiallarga tayanadi va manbani ko‘rsatadi.</span>
    </section>
  );
}
