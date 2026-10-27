import type { ReactNode } from "react";
import { Greenery } from "./Greenery";

export function Card({ children }: { children: ReactNode }) {
  return (
    <main className="paper relative flex flex-1 items-center justify-center p-4 sm:p-8">
      <div className="relative flex min-h-[70vh] w-full max-w-md flex-col items-center justify-center overflow-hidden bg-[#e9e2d6] px-8 py-16 text-center shadow-[0_20px_60px_-30px_rgba(60,45,30,0.45)] sm:aspect-[3/4] sm:min-h-0">
        <Greenery className="pointer-events-none absolute -left-3 top-0 h-full w-28 sm:w-32" />
        <Greenery className="pointer-events-none absolute -right-3 top-0 h-full w-28 -scale-x-100 sm:w-32" />
        {children}
      </div>
    </main>
  );
}
