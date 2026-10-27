import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="font-script text-4xl text-stone-800">
        Приглашение не найдено
      </h1>
      <p className="max-w-md text-stone-700">
        Похоже, ссылка указана неверно. Вернитесь на главную и введите своё имя.
      </p>
      <Link
        href="/"
        className="rounded-md bg-stone-800 px-6 py-3 text-stone-50 transition hover:bg-stone-700"
      >
        На главную
      </Link>
    </main>
  );
}
