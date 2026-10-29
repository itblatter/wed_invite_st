import Link from "next/link";
import { Card } from "@/components/designs/Card";
import { buttonClass } from "@/components/designs/NextButton";

export default function NotFound() {
  return (
    <Card>
      <div className="flex flex-col items-center gap-6">
        <h1 className="font-script text-4xl text-sage-dark">
          Приглашение не найдено
        </h1>
        <p className="max-w-[16rem] text-sm leading-relaxed text-ink/85">
          Похоже, ссылка указана неверно. Вернитесь назад и введите имена вашей
          пары.
        </p>
        <Link href="/invitepage" className={buttonClass}>
          Ввести имена
        </Link>
      </div>
    </Card>
  );
}
