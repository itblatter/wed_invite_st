type Props = { className?: string };

/** Оливковая веточка: горизонтальная, направлена вправо */
export function OliveBranch({ className }: Props) {
  return (
    <svg
      viewBox="0 0 120 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      <path d="M4 16 C 40 14, 80 14, 116 16" />
      {[18, 36, 54, 72, 90].map((x) => (
        <g key={x}>
          <path d={`M${x} 15 C ${x + 4} 6, ${x + 10} 4, ${x + 12} 3 C ${x + 8} 8, ${x + 6} 12, ${x} 15 Z`} fill="currentColor" fillOpacity="0.25" />
          <path d={`M${x + 9} 17 C ${x + 13} 26, ${x + 19} 28, ${x + 21} 29 C ${x + 17} 24, ${x + 15} 20, ${x + 9} 17 Z`} fill="currentColor" fillOpacity="0.25" />
        </g>
      ))}
      <circle cx="108" cy="12" r="1.8" fill="currentColor" />
      <circle cx="100" cy="20" r="1.8" fill="currentColor" />
    </svg>
  );
}

/** Угловой орнамент: завиток для левого верхнего угла, остальные получаются поворотом */
export function CornerFlourish({ className }: Props) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      <path d="M2 46 V 14 Q 2 2, 14 2 H 46" />
      <path d="M8 40 V 16 Q 8 8, 16 8 H 40" opacity="0.6" />
      <path d="M14 14 c 4 -4, 8 -2, 8 2 s -4 6, -8 2" />
      <circle cx="22" cy="22" r="1.2" fill="currentColor" />
    </svg>
  );
}
