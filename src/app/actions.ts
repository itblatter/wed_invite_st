"use server";

import { redirect } from "next/navigation";
import { findGuest, getGuestByToken } from "@/lib/guests";
import { sendTelegramMessage } from "@/lib/telegram";

export type FormState = { error?: string; success?: boolean; attending?: boolean };

const sendError = { error: "Не удалось отправить ответ. Попробуйте ещё раз позже." };

export async function lookupGuest(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const name = String(formData.get("name") ?? "");
  const result = findGuest(name);
  if (result.status === "ambiguous") {
    return { error: "Пожалуйста, укажите оба имени вашей пары." };
  }
  if (result.status === "not_found") {
    return {
      error:
        "Мы не нашли вас в списке гостей. Проверьте написание имени или напишите нам.",
    };
  }
  redirect(`/invite/${result.guest.token}`);
}

export async function submitRsvp(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const token = String(formData.get("token") ?? "");
  const guest = getGuestByToken(token);
  if (!guest) return { error: "Гость не найден." };

  const attending = formData.get("attending") === "yes";
  const text = [
    `💌 RSVP: ${guest.names.join(" и ")}`,
    attending ? "✅ Придут" : "❌ Не смогут прийти",
  ].join("\n");

  try {
    await sendTelegramMessage(text);
  } catch (e) {
    console.error("Telegram error", e);
    return sendError;
  }
  return { success: true, attending };
}

export async function submitPreferences(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const token = String(formData.get("token") ?? "");
  const guest = getGuestByToken(token);
  if (!guest) return { error: "Гость не найден." };

  const drinks = formData.getAll("drinks").map(String);
  const drinksOther = String(formData.get("drinksOther") ?? "").trim();
  const allergies = String(formData.get("allergies") ?? "").trim();

  const detailField: Record<string, string> = {
    Пиво: "beerDetail",
    Вино: "wineDetail",
    Сок: "juiceDetail",
  };
  const withDetail = (d: string) => {
    const detail = String(formData.get(detailField[d] ?? "") ?? "").trim();
    return detail ? `${d} (${detail})` : d;
  };

  const drinkList = [
    ...drinks.filter((d) => d !== "other").map(withDetail),
    drinksOther,
  ].filter(Boolean);
  if (drinkList.length === 0) {
    return { error: "Выберите хотя бы один вариант напитков." };
  }

  const text = [
    `🍷 Предпочтения: ${guest.names.join(" и ")}`,
    `Напитки: ${drinkList.join(", ")}`,
    `Не любят / аллергия: ${allergies || "—"}`,
  ].join("\n");

  try {
    await sendTelegramMessage(text);
  } catch (e) {
    console.error("Telegram error", e);
    return sendError;
  }
  return { success: true };
}
