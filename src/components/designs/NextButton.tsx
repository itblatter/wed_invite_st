import Link from "next/link";
import type { Route } from "next";

export function NextButton({ href }: { href: Route }) {
  return (
    <Link
      href={href}
      className="absolute bottom-6 right-6 inline-flex items-center gap-2 rounded-full border border-terracotta bg-terracotta px-5 py-2.5 text-xs uppercase tracking-[0.25em] text-cream shadow-sm transition hover:bg-[#9e6349] sm:bottom-8 sm:right-8"
    >
      Далее
      <span aria-hidden>→</span>
    </Link>
  );
}
