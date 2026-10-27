"use client";

import { useActionState } from "react";
import { lookupGuest, type FormState } from "@/app/actions";

export function NameForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(
    lookupGuest,
    {},
  );

  return (
    <form action={action} className="flex w-full max-w-xs flex-col items-center gap-4">
      <input
        name="name"
        aria-label="Имена вашей пары"
        required
        autoComplete="off"
        placeholder="Даниил и Мария"
        className="w-full border-b border-ink/40 bg-transparent px-2 py-2 text-center text-base tracking-wide text-ink outline-none transition placeholder:text-ink/40 focus:border-terracotta"
      />
      {state.error && (
        <p className="text-xs leading-relaxed text-terracotta" role="alert">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-2 rounded-full border border-terracotta bg-terracotta px-6 py-2.5 text-xs uppercase tracking-[0.25em] text-cream shadow-sm transition hover:bg-[#9e6349] disabled:opacity-60"
      >
        {pending ? "Ищем…" : "Открыть приглашение"}
      </button>
    </form>
  );
}
