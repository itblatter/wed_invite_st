import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { RsvpForm } from "@/components/RsvpForm";
import { wedding } from "@/data/wedding";
import { getGuestByToken, guests } from "@/lib/guests";

export function generateStaticParams() {
  return guests.map(({ token }) => ({ token }));
}

export async function generateMetadata({
  params,
}: PageProps<"/invite/[token]">): Promise<Metadata> {
  const { token } = await params;
  const guest = getGuestByToken(token);
  return {
    title: guest
      ? `Приглашение для ${guest.names.join(" и ")}`
      : "Приглашение на свадьбу",
    robots: { index: false, follow: false },
  };
}

export default async function InvitePage({
  params,
}: PageProps<"/invite/[token]">) {
  const { token } = await params;
  const guest = getGuestByToken(token);
  if (!guest) notFound();

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-16 px-6 py-16">
      <section className="flex flex-col items-center gap-1 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-stone-500">
          Приглашение на свадьбу
        </p>
        <h1 className="font-script text-6xl text-stone-800 sm:text-7xl">
          {wedding.couple.genitive}
        </h1>
        <p className="mt-3 text-lg text-stone-600">
          {wedding.dateLabel} в {wedding.time}
        </p>
      </section>

      <section className="flex flex-col gap-4 text-center">
        <h2 className="font-script text-4xl text-stone-800">{guest.greeting}</h2>
        <p className="text-pretty text-lg leading-relaxed text-stone-700">
          {guest.text}
        </p>
      </section>

      <section className="grid gap-6 text-center sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm uppercase tracking-widest text-stone-500">
            Место
          </h3>
          <p className="text-lg">{wedding.venue.name}</p>
          <p className="text-stone-600">{wedding.venue.address}</p>
          <a
            href={wedding.venue.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="text-stone-800 underline underline-offset-4"
          >
            Открыть на карте
          </a>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-sm uppercase tracking-widest text-stone-500">
            Дресс-код
          </h3>
          <p className="text-lg">{wedding.dressCode}</p>
        </div>
      </section>

      <section className="flex flex-col items-center gap-6">
        <h2 className="text-sm uppercase tracking-[0.3em] text-stone-500">
          Подтверждение
        </h2>
        <p className="max-w-md text-center text-stone-700">
          Пожалуйста, ответьте до {wedding.dateLabel}, чтобы мы могли всё
          подготовить.
        </p>
        <RsvpForm token={guest.token} />
      </section>
    </main>
  );
}
