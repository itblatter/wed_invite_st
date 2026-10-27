type Leaf = { x: number; y: number; r: number; w: number; h: number; g: string; o?: number };

/** Листья вдоль вертикальной ветки; ветка идёт из левого края внутрь карточки */
const leaves: Leaf[] = [
  { x: 22, y: 40, r: -40, w: 20, h: 52, g: "g1" },
  { x: 50, y: 72, r: 25, w: 18, h: 46, g: "g2" },
  { x: 16, y: 122, r: -70, w: 18, h: 50, g: "g3" },
  { x: 58, y: 142, r: 40, w: 20, h: 54, g: "g1", o: 0.9 },
  { x: 30, y: 194, r: -25, w: 22, h: 58, g: "g4" },
  { x: 64, y: 224, r: 55, w: 16, h: 42, g: "g3" },
  { x: 14, y: 264, r: -60, w: 20, h: 54, g: "g2" },
  { x: 52, y: 294, r: 15, w: 22, h: 60, g: "g1", o: 0.92 },
  { x: 26, y: 348, r: -35, w: 18, h: 50, g: "g4" },
  { x: 62, y: 372, r: 48, w: 18, h: 46, g: "g2" },
  { x: 18, y: 424, r: -75, w: 20, h: 52, g: "g3", o: 0.9 },
  { x: 50, y: 454, r: 28, w: 20, h: 56, g: "g1" },
  { x: 34, y: 506, r: -20, w: 22, h: 60, g: "g4" },
];

const berries: [number, number, number][] = [
  [44, 100, 3], [40, 250, 2.6], [46, 330, 3], [36, 410, 2.4], [58, 490, 2.8],
];

const dots: [number, number][] = [
  [84, 60], [96, 112], [78, 200], [100, 252], [88, 332], [74, 412], [98, 472],
  [106, 150], [70, 292], [92, 522], [110, 380], [104, 40],
];

function leafPath(w: number, h: number) {
  const hw = w / 2, hh = h / 2;
  return `M0 ${-hh} C ${hw} ${-hh / 2}, ${hw} ${hh / 2}, 0 ${hh} C ${-hw} ${hh / 2}, ${-hw} ${-hh / 2}, 0 ${-hh} Z`;
}

export function Greenery({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 560" className={`sway ${className ?? ""}`} aria-hidden>
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8fb07a" />
          <stop offset="1" stopColor="#4f7a4a" />
        </linearGradient>
        <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a9c49a" />
          <stop offset="1" stopColor="#6b8f63" />
        </linearGradient>
        <linearGradient id="g3" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7fa39a" />
          <stop offset="1" stopColor="#3f6b5f" />
        </linearGradient>
        <linearGradient id="g4" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c3cf9c" />
          <stop offset="1" stopColor="#7c9a5f" />
        </linearGradient>
        <radialGradient id="berry">
          <stop offset="0" stopColor="#d8b36a" />
          <stop offset="1" stopColor="#a4863f" />
        </radialGradient>
      </defs>

      <path
        d="M4 10 C 30 120, 18 220, 36 320 S 28 480, 44 556"
        fill="none"
        stroke="#5e7a4c"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.8"
      />

      {leaves.map((l, i) => (
        <g
          key={i}
          className="leaf"
          style={{ animationDelay: `${(i % 5) * 0.7}s` }}
          transform={`translate(${l.x} ${l.y}) rotate(${l.r})`}
          opacity={l.o ?? 1}
        >
          <path d={leafPath(l.w, l.h)} fill={`url(#${l.g})`} />
          <path
            d={leafPath(l.w * 0.55, l.h * 0.85)}
            fill="#ffffff"
            opacity="0.14"
            transform={`translate(${-l.w * 0.12} 0)`}
          />
          <line
            y1={-l.h / 2.1}
            y2={l.h / 2.1}
            stroke="#2f4a35"
            strokeWidth="0.7"
            opacity="0.55"
          />
          {[-0.3, -0.1, 0.1, 0.3].map((t) => (
            <line
              key={t}
              x1={0}
              y1={t * l.h}
              x2={l.w * 0.38}
              y2={t * l.h - l.h * 0.12}
              stroke="#2f4a35"
              strokeWidth="0.4"
              opacity="0.35"
            />
          ))}
        </g>
      ))}

      {berries.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="url(#berry)" opacity="0.9" />
      ))}

      {dots.map(([x, y], i) => (
        <circle
          key={i}
          className="twinkle"
          style={{ animationDelay: `${(i % 4) * 0.9}s` }}
          cx={x}
          cy={y}
          r={i % 3 === 0 ? 2.4 : 1.4}
          fill="#b89a5e"
        />
      ))}
    </svg>
  );
}
