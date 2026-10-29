import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Medallion, Page } from "@/components/designs/Page";
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

const label = "text-[11px] uppercase tracking-[0.35em] text-sage-dark";

export default async function InvitePage({
  params,
}: PageProps<"/invite/[token]">) {
  const { token } = await params;
  const guest = getGuestByToken(token);
  if (!guest) notFound();

  const [greetingWord, ...greetingRest] = guest.greeting.split(" ");
  const greetingNames = greetingRest.join(" ");
  const namesSize = greetingNames.length > 16 ? "text-[1.6rem]" : "text-3xl";

  return (
    <Page>
      <Medallion oval>
        <div className="flex flex-col items-center gap-7">
          <p className={label}>Приглашение</p>
          <h2 className="font-script leading-none">
            <span className="mb-2 block text-2xl text-ink/70 sm:text-3xl">
              {greetingWord}
            </span>
            <span className={`block whitespace-nowrap text-ink sm:text-4xl ${namesSize}`}>
              {greetingNames}
            </span>
          </h2>
          <span className="h-px w-16 bg-sage" />
          <p className="max-w-[17rem] text-pretty text-sm leading-relaxed text-ink/85">
            {guest.text}
          </p>
        </div>
      </Medallion>

      <Medallion>
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-1">
            <p className={label}>Когда</p>
            <p className="text-xl text-ink">
              {wedding.weekday}, {wedding.dateLabel}
            </p>
            <p className="text-lg text-sage-dark">{wedding.time}</p>
          </div>
          <span className="h-px w-12 bg-sage" />
          <div className="flex flex-col items-center gap-1">
            <p className={label}>Где</p>
            <p className="text-xl text-ink">{wedding.venue.name}</p>
            <p className="text-sm text-ink/70">{wedding.venue.address}</p>
            <a
              href={wedding.venue.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 border-b border-sage pb-0.5 text-[11px] uppercase tracking-[0.3em] text-sage-dark transition hover:border-sage-dark"
            >
              Открыть на карте ↗
            </a>
          </div>
          <span className="h-px w-12 bg-sage" />
          <div className="flex flex-col items-center gap-1">
            <p className={label}>Дресс-код</p>
            <p className="text-base text-ink">{wedding.dressCode.title}</p>
            <p className="max-w-[17rem] text-sm leading-relaxed text-ink/75">
              {wedding.dressCode.note}
            </p>
          </div>
        </div>
      </Medallion>

      <Medallion>
        <div className="flex w-full flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <p className={label}>Подтверждение</p>
            <p className="max-w-[18rem] text-sm leading-relaxed text-ink/85">
              Дорогие {guest.names.join(" и ")}, пожалуйста, ответьте, сможете
              ли вы быть с нами, чтобы мы могли всё подготовить.
            </p>
          </div>
          <RsvpForm token={guest.token} />
        </div>
      </Medallion>

      {guest.facts && (
        <Medallion>
          <div className="flex flex-col items-center gap-4">
            <p className={label}>Интересные факты</p>
            <p className="max-w-[18rem] text-pretty text-sm leading-relaxed text-ink/85">
              {guest.facts}
            </p>
          </div>
        </Medallion>
      )}
    </Page>
  );
}
