import type { ReactNode } from "react";
import { FloralPattern } from "./FloralPattern";

/** Полноэкранная «бумага» с гравюрным узором и овальный медальон по центру */
export function Card({ children }: { children: ReactNode }) {
  return (
    <main className="paper relative flex flex-1 items-center justify-center overflow-hidden px-4 py-8 sm:py-12">
      <FloralPattern className="sway pointer-events-none absolute inset-0 h-full w-full" />

      <section className="relative flex aspect-[2/3] w-full max-w-[26rem] items-center justify-center">
        <span className="absolute inset-0 rounded-[50%] border-[3px] border-sage bg-paper shadow-[0_25px_60px_-30px_rgba(47,58,50,0.5)]" />
        <span className="pointer-events-none absolute inset-2 rounded-[50%] border border-sage" />
        <div className="relative flex h-full w-full flex-col items-center justify-center px-10 py-14 text-center sm:px-14">
          {children}
        </div>
      </section>
    </main>
  );
}
