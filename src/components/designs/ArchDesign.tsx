import { wedding } from "@/data/wedding";
import { Card } from "./Card";
import { NextButton } from "./NextButton";

export function ArchDesign() {
  return (
    <Card>
      <div className="relative flex flex-col items-center gap-10">
        <p className="text-[11px] uppercase tracking-[0.4em] text-terracotta">
          {wedding.city}
        </p>

        <div className="relative flex flex-col items-center gap-8 py-4 sm:gap-10">
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none font-serif text-[11rem] italic leading-none text-[#8a7a68] opacity-20 sm:text-[13rem]"
          >
            &amp;
          </span>
          <h1 className="relative z-10 text-4xl uppercase tracking-[0.2em] text-ink sm:text-5xl">
            {wedding.couple.second}
          </h1>
          <h1 className="relative z-10 text-4xl uppercase tracking-[0.2em] text-ink sm:text-5xl">
            {wedding.couple.first}
          </h1>
        </div>

        <p className="text-base tracking-[0.3em] text-ink/80 sm:text-lg">
          {wedding.dateParts.join(" / ")}
        </p>
      </div>

      <p className="absolute inset-x-14 bottom-20 text-[11px] uppercase leading-relaxed tracking-[0.3em] text-terracotta sm:bottom-24 sm:inset-x-20">
        Приглашаем вас разделить с нами этот день
      </p>

      <NextButton href="/invitepage" />
    </Card>
  );
}
