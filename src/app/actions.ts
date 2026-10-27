"use server";

import { redirect } from "next/navigation";
import { findGuest, getGuestByToken } from "@/lib/guests";
import { sendTelegramMessage } from "@/lib/telegram";

export type FormState = { error?: string; success?: boolean };

export async function lookupGuest(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const name = String(formData.get("name") ?? "");
  const guest = findGuest(name);
  if (!guest) {
    return {
      error:
        "Мы не нашли вас в списке гостей. Проверьте написание имени или напишите нам.",
    };
  }
  redirect(`/invite/${guest.token}`);
}

export async function submitRsvp(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const token = String(formData.get("token") ?? "");
  const guest = getGuestByToken(token);
  if (!guest) return { error: "Гость не найден." };

  const attending = formData.get("attending") === "yes";
  const dishes = [1, 2, 3]
    .map((i) => String(formData.get(`dish${i}`) ?? "").trim())
    .filter(Boolean);
  const color = String(formData.get("color") ?? "").trim();
  const comment = String(formData.get("comment") ?? "").trim();

  if (attending && (dishes.length < 3 || !color)) {
    return { error: "Пожалуйста, укажите три блюда и любимый цвет." };
  }

  const lines = [
    `💌 RSVP: ${guest.names.join(" и ")}`,
    attending ? "✅ Придут" : "❌ Не смогут прийти",
  ];
  if (attending) {
    lines.push(`🍽 Блюда: ${dishes.join(", ")}`, `🎨 Цвет: ${color}`);
  }
  if (comment) lines.push(`💬 ${comment}`);

  try {
    await sendTelegramMessage(lines.join("\n"));
  } catch (e) {
    console.error("Telegram error", e);
    return { error: "Не удалось отправить ответ. Попробуйте ещё раз позже." };
  }
  return { success: true };
}
