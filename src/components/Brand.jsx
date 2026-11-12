import { Link } from 'react-router-dom';

export function StarMark({ size = 30, className, double = true }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d="M12 1.5c.7 5.6 4.9 9.8 10.5 10.5-5.6.7-9.8 4.9-10.5 10.5-.7-5.6-4.9-9.8-10.5-10.5C7.1 11.3 11.3 7.1 12 1.5z" />
      {double && (
        <path
          fillOpacity="0.45"
          transform="rotate(45 12 12)"
          d="M12 5.5c.4 3.4 3.1 6.1 6.5 6.5-3.4.4-6.1 3.1-6.5 6.5-.4-3.4-3.1-6.1-6.5-6.5 3.4-.4 6.1-3.1 6.5-6.5z"
        />
      )}
    </svg>
  );
}

/** To‘liq logotip: yulduz + "Polaris / Guides School" */
export function Logo({ to = '/', size = 'md', className = '' }) {
  return (
    <Link to={to} className={`logo logo--${size} ${className}`} aria-label="Polaris Guides School — bosh sahifa">
      <StarMark size={size === 'sm' ? 28 : 30} className="logo__mark" />
      <span className="logo__text">
        <span className="logo__name sc">Polaris</span>
        <span className="logo__tag">Guides School</span>
      </span>
    </Link>
  );
}

/** Aylanadigan yulduz izlari (hero va qorong‘i panellar foni) */
const RINGS = {
  hero: [
    [110, 0.22, '1 7'], [180, 0.18, '46 14'], [260, 0.14, '120 30 8 30'], [350, 0.16, '2 12'],
    [450, 0.12, '210 44'], [560, 0.14, '64 22 4 22'], [680, 0.1, '320 60'], [790, 0.12, '4 16']
  ],
  panel: [
    [90, 0.24, '1 7'], [160, 0.18, '40 14'], [240, 0.15, '110 28 6 28'], [330, 0.16, '2 12'],
    [430, 0.12, '200 44'], [540, 0.13, '60 20 4 20'], [660, 0.1, '3 14']
  ],
  cta: [
    [200, 0.16, '2 10'], [320, 0.12, '90 24'], [460, 0.14, '1 8'], [610, 0.1, '240 50 6 50'], [760, 0.12, '3 14']
  ]
};

const STARS = [
  [180, 240, 1.6], [320, 520, 1.1], [140, 820, 1.8], [260, 1120, 1.2], [420, 1380, 1.6], [560, 180, 1.2],
  [690, 420, 1], [1020, 300, 1.5], [1180, 140, 1.1], [1320, 420, 1.8], [1460, 260, 1.2], [1500, 700, 1.5],
  [1380, 980, 1.1], [1240, 1260, 1.7], [1080, 1480, 1.2], [900, 1360, 1.4], [700, 1180, 1], [520, 960, 1.6],
  [380, 700, 1.2], [1120, 860, 1.5], [1280, 640, 1], [980, 620, 1.3], [620, 640, 1.1], [860, 1040, 1.6],
  [1460, 1180, 1.2], [200, 1440, 1.5], [760, 90, 1.2], [1540, 1460, 1.4]
];

export function StarTrails({ variant = 'hero', className }) {
  const size = variant === 'panel' ? 1400 : 1600;
  const c = size / 2;
  const scale = size / 1600;
  return (
    <svg className={`trails ${className || ''}`} aria-hidden="true" viewBox={`0 0 ${size} ${size}`}>
      <g className="trails__rings" fill="none" strokeLinecap="round">
        {RINGS[variant].map(([r, o, d]) => (
          <circle key={r} cx={c} cy={c} r={r} strokeOpacity={o} strokeDasharray={d} />
        ))}
      </g>
      {variant !== 'cta' && (
        <g className="trails__stars">
          {STARS.slice(0, variant === 'panel' ? 12 : STARS.length).map(([x, y, r], i) => (
            <circle key={i} cx={x * scale} cy={y * scale} r={r} fillOpacity={0.45 + (i % 4) * 0.05} />
          ))}
        </g>
      )}
    </svg>
  );
}
