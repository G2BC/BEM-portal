import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SPECIES_REQUEST_STEPS } from "@/pages/species-request/constants";

type StepProgressProps = {
  currentStep: number;
};

export function StepProgress({ currentStep }: StepProgressProps) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
      {SPECIES_REQUEST_STEPS.map((step, index) => {
        const active = index === currentStep;
        const done = index < currentStep;

        return (
          <div
            key={step}
            className={`flex items-center gap-2 rounded-md border px-3 py-2 text-xs ${
              active
                ? "border-primary/60 bg-primary/10 text-primary"
                : done
                  ? "border-slate-200 bg-slate-100 text-slate-700"
                  : "border-slate-200 bg-white text-slate-500"
            }`}
          >
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
                active ? "bg-primary/15" : done ? "bg-slate-200" : "bg-slate-100"
              }`}
            >
              {done ? <Check className="h-3 w-3" /> : index + 1}
            </span>
            <span className="truncate">{t(`species_request.steps.${step}`)}</span>
          </div>
        );
      })}
    </div>
  );
}
