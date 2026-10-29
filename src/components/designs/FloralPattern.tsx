/** Гравюрный растительный узор: розы, листья и акантовые завитки в шалфейном цвете */
export function FloralPattern({ className }: { className?: string }) {
  return (
    <svg className={className} aria-hidden>
      <defs>
        <g id="rose" fill="none" stroke="#5f7a63" strokeWidth="1.1" strokeLinecap="round">
          <circle r="4" fill="#fbfaf6" />
          <path d="M-3 -2 C -1 -5, 3 -5, 4 -1" />
          <path d="M3 2 C 1 5, -3 5, -4 1" />
          <path d="M-7 -3 C -4 -10, 5 -11, 9 -4 C 11 1, 8 7, 3 9" />
          <path d="M7 3 C 4 10, -5 11, -9 4 C -11 -1, -8 -7, -3 -9" />
          <path d="M-12 -4 C -9 -15, 8 -17, 14 -6 C 17 2, 13 11, 5 14" />
          <path d="M12 4 C 9 15, -8 17, -14 6 C -17 -2, -13 -11, -5 -14" />
          <path d="M-16 0 C -14 -18, 12 -22, 19 -6" opacity="0.7" />
          <path d="M16 0 C 14 18, -12 22, -19 6" opacity="0.7" />
          <path d="M-14 10 C -18 14, -22 14, -26 10 C -22 8, -18 8, -14 10 Z" fill="#9fb5a1" fillOpacity="0.55" />
          <path d="M14 -10 C 18 -14, 22 -14, 26 -10 C 22 -8, 18 -8, 14 -10 Z" fill="#9fb5a1" fillOpacity="0.55" />
        </g>

        <g id="leaf" fill="#8ea893" fillOpacity="0.6" stroke="#5f7a63" strokeWidth="0.9">
          <path d="M0 0 C 8 -6, 18 -6, 26 0 C 18 6, 8 6, 0 0 Z" />
          <path d="M1 0 H 24" strokeWidth="0.6" />
          <path d="M6 0 L 9 -3 M11 0 L 14 -3.5 M16 0 L 19 -3 M6 0 L 9 3 M11 0 L 14 3.5 M16 0 L 19 3" strokeWidth="0.45" opacity="0.8" />
        </g>

        <g id="scroll" fill="none" stroke="#6f8a72" strokeWidth="1.3" strokeLinecap="round">
          <path d="M0 40 C 10 20, 30 10, 50 14 C 66 17, 70 32, 60 40 C 52 46, 42 40, 46 32 C 49 27, 56 29, 55 35" />
          <path d="M0 40 C -4 50, 4 62, 16 62 C 26 62, 30 52, 24 48 C 20 45, 14 48, 16 53" />
          <path d="M20 26 C 26 18, 36 16, 44 20" strokeWidth="0.8" opacity="0.7" />
          <path d="M8 30 C 4 38, 6 46, 12 50" strokeWidth="0.8" opacity="0.7" />
        </g>

        <pattern id="floral" width="260" height="300" patternUnits="userSpaceOnUse">
          <use href="#rose" x="60" y="60" />
          <use href="#rose" x="200" y="210" transform="rotate(30 200 210)" />
          <use href="#rose" x="40" y="250" transform="scale(0.75) translate(13 83) rotate(-20 40 250)" />

          <use href="#scroll" x="90" y="20" />
          <use href="#scroll" x="150" y="120" transform="scale(-1 1) translate(-300 0) rotate(15 150 120)" />
          <use href="#scroll" x="10" y="150" transform="rotate(-70 40 190)" />
          <use href="#scroll" x="180" y="240" transform="scale(0.8) rotate(200 225 300)" />

          <use href="#leaf" x="20" y="110" transform="rotate(-50 20 110)" />
          <use href="#leaf" x="110" y="80" transform="rotate(40 110 80)" />
          <use href="#leaf" x="160" y="180" transform="rotate(-110 160 180)" />
          <use href="#leaf" x="230" y="100" transform="rotate(120 230 100)" />
          <use href="#leaf" x="80" y="200" transform="rotate(20 80 200)" />
          <use href="#leaf" x="120" y="270" transform="rotate(-30 120 270)" />
          <use href="#leaf" x="220" y="40" transform="rotate(-150 220 40)" />

          <path d="M60 85 C 70 120, 50 160, 80 200 S 110 250, 100 290" fill="none" stroke="#6f8a72" strokeWidth="1" opacity="0.8" />
          <path d="M200 185 C 190 150, 220 120, 215 80 S 230 30, 250 10" fill="none" stroke="#6f8a72" strokeWidth="1" opacity="0.8" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#floral)" />
    </svg>
  );
}
