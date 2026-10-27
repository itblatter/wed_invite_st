"use client";

import { useActionState, useState } from "react";
import { submitRsvp, type FormState } from "@/app/actions";

const inputClass =
  "rounded-md border border-stone-300 bg-white/80 px-4 py-3 text-base outline-none transition focus:border-stone-500";

export function RsvpForm({ token }: { token: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(
    submitRsvp,
    {},
  );
  const [attending, setAttending] = useState<"yes" | "no">("yes");

  if (state.success) {
    return (
      <p className="text-center text-lg text-stone-700">
        Спасибо! Мы получили ваш ответ.
      </p>
    );
  }

  return (
    <form action={action} className="flex w-full max-w-md flex-col gap-5">
      <input type="hidden" name="token" value={token} />

      <fieldset className="flex gap-3">
        <legend className="mb-2 text-sm uppercase tracking-widest text-stone-500">
          Сможете ли вы прийти?
        </legend>
        {(
          [
            ["yes", "Да, с радостью"],
            ["no", "К сожалению, нет"],
          ] as const
        ).map(([value, label]) => (
          <label
            key={value}
            className={`flex-1 cursor-pointer rounded-md border px-4 py-3 text-center transition ${
              attending === value
                ? "border-stone-800 bg-stone-800 text-stone-50"
                : "border-stone-300 bg-white/80"
            }`}
          >
            <input
              type="radio"
              name="attending"
              value={value}
              checked={attending === value}
              onChange={() => setAttending(value)}
              className="sr-only"
            />
            {label}
          </label>
        ))}
      </fieldset>

      {attending === "yes" && (
        <>
          <div className="flex flex-col gap-2">
            <span className="text-sm uppercase tracking-widest text-stone-500">
              Три ваших любимых блюда
            </span>
            {[1, 2, 3].map((i) => (
              <input
                key={i}
                name={`dish${i}`}
                required
                placeholder={`Блюдо ${i}`}
                className={inputClass}
              />
            ))}
          </div>
          <label className="flex flex-col gap-2">
            <span className="text-sm uppercase tracking-widest text-stone-500">
              Ваш любимый цвет
            </span>
            <input name="color" required className={inputClass} />
          </label>
        </>
      )}

      <label className="flex flex-col gap-2">
        <span className="text-sm uppercase tracking-widest text-stone-500">
          Пожелания или комментарий
        </span>
        <textarea name="comment" rows={3} className={inputClass} />
      </label>

      {state.error && (
        <p className="text-sm text-rose-700" role="alert">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-stone-800 px-6 py-3 text-base tracking-wide text-stone-50 transition hover:bg-stone-700 disabled:opacity-60"
      >
        {pending ? "Отправляем…" : "Отправить ответ"}
      </button>
    </form>
  );
}
