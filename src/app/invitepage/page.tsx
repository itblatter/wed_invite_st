import { Card } from "@/components/designs/Card";
import { NameForm } from "@/components/NameForm";

export default function InvitePage() {
  return (
    <Card>
      <div className="relative flex w-full flex-col items-center gap-10 px-4">
        <p className="max-w-xs text-pretty text-sm leading-loose text-ink/80 sm:text-base">
          Приглашаем вас разделить с нами этот значимый для нас день. Для
          каждого из приглашённых нами гостей мы составили личный
          пригласительный. Для получения введите в поле ниже имена вашей пары.
        </p>

        <NameForm />
      </div>
    </Card>
  );
}
