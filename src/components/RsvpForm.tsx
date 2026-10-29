"use client";

import { useActionState, useState } from "react";
import { submitPreferences, submitRsvp, type FormState } from "@/app/actions";
import { buttonClass } from "@/components/designs/NextButton";

const labelClass = "text-[11px] uppercase tracking-[0.3em] text-sage-dark";
const inputClass =
  "w-full border-b border-sage bg-transparent px-2 py-2 text-center text-sm text-ink outline-none transition placeholder:text-ink/35 focus:border-sage-dark";

function ErrorText({ text }: { text?: string }) {
  return text ? (
    <p className="text-xs leading-relaxed text-[#9a4b3c]" role="alert">
      {text}
    </p>
  ) : null;
}

function Thanks() {
  return (
    <p className="font-script text-3xl text-sage-dark">
      Спасибо! Мы получили ваш ответ
    </p>
  );
}

export function RsvpForm({ token }: { token: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(
    submitRsvp,
    {},
  );
  const [attending, setAttending] = useState<"yes" | "no">("yes");

  if (state.success) {
    return state.attending ? <PreferencesForm token={token} /> : <Thanks />;
  }

  return (
    <form action={action} className="flex w-full max-w-[18rem] flex-col items-center gap-6">
      <input type="hidden" name="token" value={token} />

      <fieldset className="flex w-full flex-col items-center gap-3">
        <legend className={`mb-3 ${labelClass}`}>Сможете ли вы прийти?</legend>
        <div className="flex w-full gap-2">
          {(
            [
              ["yes", "Да, с радостью"],
              ["no", "К сожалению, нет"],
            ] as const
          ).map(([value, text]) => (
            <label
              key={value}
              className={`flex-1 cursor-pointer rounded-full border px-3 py-2 text-xs transition ${
                attending === value
                  ? "border-sage-dark bg-sage-dark text-paper"
                  : "border-sage text-ink/80 hover:border-sage-dark"
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
              {text}
            </label>
          ))}
        </div>
      </fieldset>

      <ErrorText text={state.error} />

      <button type="submit" disabled={pending} className={buttonClass}>
        {pending ? "Отправляем…" : "Отправить ответ"}
      </button>
    </form>
  );
}

const drinkOptions = ["Пиво", "Вино", "Сок"];

function PreferencesForm({ token }: { token: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(
    submitPreferences,
    {},
  );
  const [selected, setSelected] = useState<string[]>([]);
  const [other, setOther] = useState(false);

  if (state.success) return <Thanks />;

  const toggle = (d: string) =>
    setSelected((s) => (s.includes(d) ? s.filter((x) => x !== d) : [...s, d]));

  const chip = (active: boolean) =>
    `cursor-pointer rounded-full border px-4 py-1.5 text-xs transition ${
      active
        ? "border-sage-dark bg-sage-dark text-paper"
        : "border-sage text-ink/80 hover:border-sage-dark"
    }`;

  return (
    <form action={action} className="flex w-full max-w-[18rem] flex-col items-center gap-6">
      <input type="hidden" name="token" value={token} />

      <p className="font-script text-2xl text-sage-dark">
        Ответьте на один простой вопрос
      </p>

      <fieldset className="flex w-full flex-col items-center gap-3">
        <legend className={`mb-3 ${labelClass}`}>
          1. Какие у вас предпочтения по напиткам?
        </legend>
        <div className="flex flex-wrap justify-center gap-2">
          {drinkOptions.map((d) => (
            <label key={d} className={chip(selected.includes(d))}>
              <input
                type="checkbox"
                name="drinks"
                value={d}
                checked={selected.includes(d)}
                onChange={() => toggle(d)}
                className="sr-only"
              />
              {d}
            </label>
          ))}
          <label className={chip(other)}>
            <input
              type="checkbox"
              name="drinks"
              value="other"
              checked={other}
              onChange={() => setOther((o) => !o)}
              className="sr-only"
            />
            Свой вариант
          </label>
        </div>
        {other && (
          <input
            name="drinksOther"
            required
            placeholder="Напишите, что предпочитаете"
            className={inputClass}
          />
        )}
      </fieldset>

      <label className="flex w-full flex-col items-center gap-2">
        <span className={labelClass}>
          2. Какие продукты вы не любите / у вас аллергия?
        </span>
        <input name="allergies" placeholder="Свой вариант" className={inputClass} />
      </label>

      <ErrorText text={state.error} />

      <button type="submit" disabled={pending} className={buttonClass}>
        {pending ? "Отправляем…" : "Отправить"}
      </button>
    </form>
  );
}
