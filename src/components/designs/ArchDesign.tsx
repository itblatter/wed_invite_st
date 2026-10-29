import { wedding } from "@/data/wedding";
import { Card } from "./Card";
import { CoupleNames } from "./CoupleNames";
import { NextButton } from "./NextButton";

export function ArchDesign() {
  return (
    <Card>
      <div className="flex flex-col items-center gap-8">
        <CoupleNames />

        <span className="h-px w-16 bg-sage" />

        <div className="flex flex-col items-center gap-2">
          <p className="text-[11px] uppercase tracking-[0.35em] text-sage-dark">
            {wedding.city}
          </p>
          <p className="text-2xl tracking-[0.25em] text-ink">
            {wedding.dateParts.join(" / ")}
          </p>
        </div>

        <p className="max-w-[16rem] text-pretty text-sm leading-relaxed text-ink/80">
          Приглашаем вас разделить с нами этот день
        </p>

        <NextButton href="/invitepage" />
      </div>
    </Card>
  );
}
