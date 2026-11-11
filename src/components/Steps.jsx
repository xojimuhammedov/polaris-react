import Icon from './Icon.jsx';

const STEPS = ['Ma’lumotlar', 'Tasdiqlash'];

export default function Steps({ current }) {
  return (
    <ol className="steps" aria-label="Ro‘yxatdan o‘tish bosqichlari">
      {STEPS.map((label, i) => {
        const n = i + 1;
        const done = n < current;
        return [
          i > 0 && <li key={`line-${n}`} aria-hidden="true" className={`steps__line ${done || n <= current ? 'steps__line--done' : ''}`} />,
          <li key={label} className={`steps__item ${done ? 'steps__item--done' : ''}`} aria-current={n === current ? 'step' : undefined}>
            <span className="steps__n">{done ? <Icon name="check" size={14} strokeWidth={2} /> : n}</span>
            <span className="steps__label">{label}{done && <span className="sr-only"> (bajarildi)</span>}</span>
          </li>
        ];
      })}
    </ol>
  );
}
