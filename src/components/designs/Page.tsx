import type { ReactNode } from "react";
import { FloralPattern } from "./FloralPattern";

/** Фон-бумага с узором для длинных страниц; контент — в овальных/скруглённых медальонах */
export function Page({ children }: { children: ReactNode }) {
  return (
    <main className="paper relative flex flex-1 flex-col items-center gap-10 overflow-hidden px-4 py-12 sm:py-16">
      <FloralPattern className="pointer-events-none absolute inset-0 h-full w-full" />
      {children}
    </main>
  );
}

export function Medallion({
  children,
  oval = false,
}: {
  children: ReactNode;
  oval?: boolean;
}) {
  const shape = oval ? "rounded-[50%] aspect-[2/3]" : "rounded-[8rem]";
  return (
    <section className={`relative w-full max-w-[26rem] ${shape}`}>
      <span className={`absolute inset-0 ${shape} border-[3px] border-sage bg-paper shadow-[0_25px_60px_-30px_rgba(47,58,50,0.5)]`} />
      <span className={`pointer-events-none absolute inset-2 ${shape} border border-sage`} />
      <div
        className={`relative flex h-full w-full flex-col items-center justify-center text-center ${
          oval ? "px-10 py-14 sm:px-14" : "px-8 py-12 sm:px-12"
        }`}
      >
        {children}
      </div>
    </section>
  );
}
