import { wedding } from "@/data/wedding";

/** Имена пары каллиграфией: «Даниил / & Мария» */
export function CoupleNames({ className = "" }: { className?: string }) {
  return (
    <h1 className={`font-script leading-[0.95] text-sage-dark ${className}`}>
      <span className="block text-5xl sm:text-6xl">{wedding.couple.first}</span>
      <span className="block text-5xl sm:text-6xl">
        <span className="mr-2 text-4xl sm:text-5xl">&amp;</span>
        {wedding.couple.second}
      </span>
    </h1>
  );
}
