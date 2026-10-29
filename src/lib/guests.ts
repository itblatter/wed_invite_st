import guestsData from "@/data/guests.json";

export type Guest = {
  token: string;
  names: string[];
  greeting: string;
  text: string;
  facts: string;
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

export type LookupResult =
  | { status: "found"; guest: Guest }
  | { status: "ambiguous" }
  | { status: "not_found" };

/**
 * Ищет пару по введённому тексту. Пара с наибольшим числом совпавших имён
 * побеждает; если несколько пар совпали одинаково («Дарья» есть в двух парах) —
 * просим уточнить.
 */
export function findGuest(input: string): LookupResult {
  const words = normalizeName(input).split(" ").filter(Boolean);
  if (words.length === 0) return { status: "not_found" };

  const scored = guests
    .map((guest) => ({
      guest,
      score: guest.names.filter((n) => words.includes(normalizeName(n))).length,
    }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) return { status: "not_found" };
  if (scored.length > 1 && scored[0].score === scored[1].score) {
    return { status: "ambiguous" };
  }
  return { status: "found", guest: scored[0].guest };
}
