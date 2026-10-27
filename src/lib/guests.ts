import guestsData from "@/data/guests.json";

export type Guest = {
  token: string;
  names: string[];
  greeting: string;
  text: string;
};

export const guests: Guest[] = guestsData;

export function normalizeName(value: string): string {
  return value
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/[^a-zа-я\s-]/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

export function getGuestByToken(token: string): Guest | undefined {
  return guests.find((g) => g.token === token);
}

/**
 * Ищет пару по введённому тексту: достаточно указать имя одного из гостей
 * («Ольга», «Ростислав и Ольга», «Ольга Иванова»).
 */
export function findGuest(input: string): Guest | undefined {
  const words = normalizeName(input).split(" ").filter(Boolean);
  if (words.length === 0) return undefined;

  return guests.find((g) =>
    g.names.some((name) => words.includes(normalizeName(name))),
  );
}
