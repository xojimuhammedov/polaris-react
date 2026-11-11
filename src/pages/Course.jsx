import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../seo/Seo.jsx';
import Icon from '../components/Icon.jsx';
import CabinetLayout, { Bar } from '../components/CabinetLayout.jsx';
import { COURSE, MODULES } from '../data/course.js';

const STATUS_TEXT = { done: 'Ko‘rildi', todo: 'Boshlanmagan', locked: 'Yopiq' };
const MODULE_LABEL = { done: 'Tugallangan', progress: 'Jarayonda', locked: 'Yopiq' };
const SCORES = [
  ['1-modul · Gidlik kasbiga kirish', 92],
  ['2-modul · Tarix va madaniyat', 80],
  ['3-modul · Shaharlar va obidalar', null]
];

export default function Course() {
  const [open, setOpen] = useState(3);

  return (
    <>
      <Seo title={COURSE.title} path="/kabinet/kurs" noindex />
      <CabinetLayout gap={24}>
        <nav aria-label="Sahifa yo‘li" className="crumbs">
          <ol>
            <li><Link to="/kabinet" className="link">Mening kurslarim</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{COURSE.title}</li>
          </ol>
        </nav>

        <section aria-labelledby="kurs-title" className="course-hero">
          <div className="course-hero__copy">
            <span className="badge-ring">Sotib olingan kurs</span>
            <h1 id="kurs-title">{COURSE.title}</h1>
            <p>8 modul, har birida 3–6 ta video dars. Har moduldan keyin test va video vazifa, yakunda — sertifikat.</p>
            <div className="btn-row" style={{ marginTop: 6 }}>
              <Link to="/kabinet/dars" className="btn btn--accent"><Icon name="play" size={15} />Davom ettirish: 3.2-dars</Link>
            </div>
          </div>

          <div className="course-hero__stats">
            <div className="ring">
              <svg viewBox="0 0 140 140" width="140" height="140" role="img" aria-label={`Kurs ${COURSE.progress} foiz o‘zlashtirildi`}>
                <circle cx="70" cy="70" r="58" fill="none" stroke="rgba(244,239,228,.12)" strokeWidth="10" />
                <circle cx="70" cy="70" r="58" fill="none" stroke="var(--accent)" strokeWidth="10" strokeLinecap="round"
                  strokeDasharray={`${(COURSE.progress / 100) * 364.4} 365`} />
              </svg>
              <div className="ring__label" aria-hidden="true">
                <b>{COURSE.progress}%</b>
                <small>o‘zlashtirildi</small>
              </div>
            </div>
            <dl className="dl-plain">
              <div><dt>Darslar</dt><dd>{COURSE.lessonsDone} / {COURSE.lessonsTotal}</dd></div>
              <div><dt>Modullar</dt><dd>{COURSE.modulesDone} / {COURSE.modulesTotal}</dd></div>
              <div><dt>Test bali (o‘rtacha)</dt><dd>{COURSE.avgScore}</dd></div>
            </dl>
          </div>
        </section>

        <div className="cols" style={{ gap: 24 }}>
          <section aria-labelledby="mod-title" className="cols__main" style={{ gap: 14 }}>
            <div className="row-between">
              <h2 id="mod-title" className="title t-26">Modullar va darslar</h2>
              <span className="fs-15 muted">8 modul · 34 dars</span>
            </div>
            <ol className="modules">
              {MODULES.map((m) => (
                <Module key={m.n} m={m} isOpen={open === m.n} onToggle={() => setOpen(open === m.n ? 0 : m.n)} />
              ))}
            </ol>
          </section>

          <div className="cols__side" style={{ paddingTop: 50 }}>
            <section aria-labelledby="ozl-title" className="panel" style={{ gap: 16 }}>
              <h2 id="ozl-title" className="title t-22">O‘zlashtirish</h2>
              {[['Darslar', '10 / 34', 29], ['Modul testlari', '2 / 8', 25], ['Video vazifalar', '2 / 8', 25]].map(([k, v, p]) => (
                <div className="stack" style={{ gap: 8 }} key={k}>
                  <div className="row-between fs-15"><span>{k}</span><span className="fw-6">{v}</span></div>
                  <Bar value={p} />
                </div>
              ))}
            </section>

            <section aria-labelledby="test-title" className="panel" style={{ gap: 4 }}>
              <h2 id="test-title" className="title t-22" style={{ marginBottom: 8 }}>Test natijalari</h2>
              {SCORES.map(([name, score]) => (
                <div className="score-row" key={name} style={score === null ? { color: 'var(--muted)' } : undefined}>
                  <span>{name}</span>
                  {score === null ? <span className="fs-13">Darslardan keyin</span> : <b>{score}</b>}
                </div>
              ))}
            </section>

            <section aria-labelledby="sert-title" className="panel panel--dark" style={{ gap: 12 }}>
              <span className="circle circle--ring" aria-hidden="true"><Icon name="medal" size={20} strokeWidth={1.6} /></span>
              <h2 id="sert-title" className="title t-22">Sertifikat</h2>
              <p className="fs-15" style={{ margin: 0, lineHeight: 1.6, color: 'var(--on-dark)' }}>
                Barcha 8 modul tugagach, to‘plangan ballar asosida beriladi. O‘quv markazidan offlayn olinadi.
              </p>
              <div className="progress-row" style={{ marginTop: 4 }}>
                <div className="cert-segments" aria-hidden="true">
                  {Array.from({ length: 8 }, (_, i) => <span key={i} className={i < 2 ? 'on' : ''} />)}
                </div>
                <span className="fs-14 fw-6" style={{ color: 'var(--gold)' }}>2 / 8</span>
              </div>
            </section>
          </div>
        </div>
      </CabinetLayout>
    </>
  );
}

function Module({ m, isOpen, onToggle }) {
  const total = m.lessons.length;
  const doneN = m.lessons.filter((l) => l.s === 'done').length;
  const pct = Math.round((doneN / total) * 100);
  let meta = `${total} dars · ${doneN} / ${total} bajarildi`;
  if (m.s === 'done') meta = `${total} dars · test: ${m.test[1].split('· ')[1]}`;
  if (m.s === 'locked') meta = `${total} dars · ${m.n - 1}-modul tugagach ochiladi`;
  const panelId = `modul-${m.n}`;

  return (
    <li className="module">
      <h3>
        <button type="button" className="module__btn" aria-expanded={isOpen} aria-controls={panelId} onClick={onToggle}>
          {m.s === 'done' && <span className="circle circle--ink" aria-hidden="true"><Icon name="check" size={18} strokeWidth={2} /></span>}
          {m.s === 'progress' && (
            <span className="module__ring" aria-hidden="true">
              <svg viewBox="0 0 44 44" width="44" height="44">
                <circle cx="22" cy="22" r="19" fill="none" stroke="var(--line)" strokeWidth="3" />
                <circle cx="22" cy="22" r="19" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round"
                  strokeDasharray={`${(pct * 1.194).toFixed(1)} 120`} />
              </svg>
              <span>{m.n}</span>
            </span>
          )}
          {m.s === 'locked' && <span className="circle circle--lock" aria-hidden="true"><Icon name="lock" size={18} strokeWidth={1.6} /></span>}

          <span className="module__info">
            <span className="module__kicker">{m.n}-modul · {MODULE_LABEL[m.s]}</span>
            <span className="module__title">{m.title}</span>
            <span className="module__meta">{meta}</span>
          </span>

          <span className="module__bar" aria-hidden="true">
            <Bar value={pct} />
            <span>{pct}%</span>
          </span>

          <Icon name="chevronDown" size={20} strokeWidth={1.8} className={`module__chev ${isOpen ? 'open' : ''}`} />
        </button>
      </h3>

      {isOpen && (
        <div id={panelId} className="module__panel">
          <ul className="lessons">
            {m.lessons.map((l) => <LessonRow key={l.code} l={l} />)}
          </ul>
          <div className="module__extras">
            <Extra
              icon={m.test[0] === 'done' ? 'checklist' : 'lock'}
              state={m.test[0]}
              title={`${m.n}-modul testi`}
              text={m.test[1]}
            />
            <Extra
              icon={m.task[0] === 'done' ? 'video' : m.task[0] === 'review' ? 'clock' : 'lock'}
              state={m.task[0]}
              title="Video vazifa"
              text={m.task[1]}
            />
          </div>
        </div>
      )}
    </li>
  );
}

function LessonRow({ l }) {
  const inner = (
    <>
      {l.s === 'done' && <span className="circle circle--ink" aria-hidden="true"><Icon name="check" size={15} strokeWidth={2} /></span>}
      {l.s === 'progress' && <span className="circle circle--accent" aria-hidden="true"><Icon name="play" size={13} style={{ marginLeft: 2 }} /></span>}
      {l.s === 'todo' && <span className="circle circle--line" aria-hidden="true"><Icon name="playOutline" size={13} strokeWidth={1.6} style={{ marginLeft: 2 }} /></span>}
      {l.s === 'locked' && <span className="circle circle--lock" aria-hidden="true"><Icon name="lock" size={14} strokeWidth={1.6} /></span>}
      <span className="lesson__code">{l.code}</span>
      <span className="lesson__info">
        <span className="lesson__title">{l.title}</span>
        <span className="lesson__sub">Video · {l.dur} · konspekt va materiallar</span>
        {l.s === 'progress' && <Bar value={l.pct} accent className="bar--thin" />}
      </span>
      <span className={`lesson__status ${l.s === 'progress' ? 'lesson__status--accent' : ''}`}>
        {l.s === 'progress' ? `${l.pct}% · davom ettirish` : STATUS_TEXT[l.s]}
      </span>
    </>
  );
  return (
    <li>
      {l.s === 'locked' ? (
        <div className="lesson" aria-disabled="true">{inner}</div>
      ) : (
        <Link to="/kabinet/dars" className={`lesson ${l.s === 'progress' ? 'lesson--current' : ''}`}>{inner}</Link>
      )}
    </li>
  );
}

function Extra({ icon, state, title, text }) {
  const cls = state === 'done' ? 'circle--ink' : state === 'review' ? 'circle--review' : 'circle--lock';
  return (
    <div className="extra">
      <span className={`circle ${cls}`} aria-hidden="true"><Icon name={icon} size={state === 'locked' ? 15 : 17} strokeWidth={1.6} /></span>
      <span className="extra__body">
        <span className="extra__title">{title}</span>
        <span className="fs-13 muted">{text}</span>
      </span>
    </div>
  );
}
