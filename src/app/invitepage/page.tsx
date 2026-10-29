import { Card } from "@/components/designs/Card";
import { CoupleNames } from "@/components/designs/CoupleNames";
import { NameForm } from "@/components/NameForm";

export default function InvitePage() {
  return (
    <Card>
      <div className="flex flex-col items-center gap-8">
        <CoupleNames />

        <span className="h-px w-16 bg-sage" />

        <p className="max-w-[17rem] text-pretty text-sm leading-relaxed text-ink/85">
          Приглашаем вас разделить с нами этот значимый для нас день. Для
          каждого из приглашённых нами гостей мы составили личный
          пригласительный. Для получения введите в поле ниже имена вашей пары.
        </p>

        <NameForm />
      </div>
    </Card>
  );
}
