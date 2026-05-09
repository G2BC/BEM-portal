import type { ISpeciesStatistics } from "@/api/species";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import EdibleIcon from "@/assets/icons/comestiveis.svg?react";
import ExtinctionIcon from "@/assets/icons/riscoExtincao.svg?react";
import BrazilianType from "@/assets/icons/tipoBrasileiro.svg?react";

interface SpeciesStatisticsBarProps {
  statistics?: ISpeciesStatistics;
  loading?: boolean;
}

const statConfig = [
  {
    key: "edible_brazil_species",
    icon: EdibleIcon,
    labelKey: "explore_page.statistics.edible_brazil_species",
  },
  {
    key: "observations",
    icon: Search,
    labelKey: "explore_page.statistics.observations",
  },
  {
    key: "extinction_risk_species",
    icon: ExtinctionIcon,
    labelKey: "explore_page.statistics.extinction_risk_species",
  },
  {
    key: "brazilian_type_species",
    icon: BrazilianType,
    labelKey: "explore_page.statistics.brazilian_type_species",
  },
] as const;

export function SpeciesStatisticsBar({ statistics, loading }: SpeciesStatisticsBarProps) {
  const { t, i18n } = useTranslation();
  const numberFormatter = new Intl.NumberFormat(i18n.language);

  return (
    <section className="w-full bg-[#131313] text-white">
      <div className="container mx-auto grid min-h-[136px] grid-cols-2 items-center gap-x-6 gap-y-7 px-4 py-7 md:grid-cols-4 md:gap-x-10 md:py-8">
        {statConfig.map(({ key, icon: Icon, labelKey }) => (
          <div key={key} className="grid grid-cols-[40px_1fr] items-center gap-4 md:gap-6">
            <Icon className="h-8 w-8 shrink-0 text-white md:h-9 md:w-9" strokeWidth={2.6} />
            <div className="min-w-0 text-center md:text-left">
              <p className="text-[14px] font-bold leading-[1.08] text-white md:text-[16px]">
                {t(labelKey)}
              </p>
              {loading ? (
                <Skeleton className="mx-auto mt-4 h-5 w-12 bg-white/20 md:mx-0" />
              ) : (
                <p className="mt-3 text-[18px] font-bold leading-none text-white">
                  {numberFormatter.format(statistics?.[key] ?? 0)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
