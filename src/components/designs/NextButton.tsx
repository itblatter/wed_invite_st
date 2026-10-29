import Link from "next/link";
import type { Route } from "next";

export const buttonClass =
  "inline-flex items-center gap-2 rounded-full border border-sage-dark bg-sage-dark px-6 py-2.5 text-xs uppercase tracking-[0.25em] text-paper shadow-sm transition hover:bg-sage disabled:opacity-60";

export function NextButton({ href }: { href: Route }) {
  return (
    <Link href={href} className={buttonClass}>
      Далее
      <span aria-hidden>→</span>
    </Link>
  );
}
