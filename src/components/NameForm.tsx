"use client";

import { useActionState } from "react";
import { lookupGuest, type FormState } from "@/app/actions";
import { buttonClass } from "@/components/designs/NextButton";

export function NameForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(
    lookupGuest,
    {},
  );

  return (
    <form action={action} className="flex w-full max-w-[16rem] flex-col items-center gap-4">
      <input
        name="name"
        aria-label="Имена вашей пары"
        required
        autoComplete="off"
        placeholder="Даниил и Мария"
        className="w-full border-b border-sage bg-transparent px-2 py-2 text-center text-base text-ink outline-none transition placeholder:text-ink/35 focus:border-sage-dark"
      />
      {state.error && (
        <p className="text-xs leading-relaxed text-[#9a4b3c]" role="alert">
          {state.error}
        </p>
      )}
      <button type="submit" disabled={pending} className={buttonClass}>
        {pending ? "Ищем…" : "Открыть приглашение"}
      </button>
    </form>
  );
}
