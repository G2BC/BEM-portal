import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import type { ISpecie } from "@/api/species/types/ISpecie";
import { BookOpenText } from "lucide-react";
import { getCountryName } from "@/lib/country-names";

interface TaxonomyCardProps {
  show: boolean;
  sectionCardClass: string;
  sectionCardContentClass: string;
  sectionTitleWrapClass: string;
  sectionIconWrapClass: string;
  sectionTitleClass: string;
  rowLabelClass: string;
  rowValueClass: string;
  species: ISpecie | null;
}

type TaxonomyRow = { label: string; value: string; level: number; italicValue: boolean };

export function TaxonomyCard({
  show,
  sectionCardClass,
  sectionCardContentClass,
  sectionTitleWrapClass,
  sectionIconWrapClass,
  sectionTitleClass,
  species,
  rowLabelClass,
  rowValueClass,
}: TaxonomyCardProps) {
  const { t, i18n } = useTranslation();

  if (!show || !species) return null;

  const taxonomy = species.taxonomy;

  const taxonomyRows: TaxonomyRow[] = [
    {
      label: t("species_page.taxonomy.kingdom"),
      value: taxonomy?.kingdom ?? "",
      level: 0,
      italicValue: false,
    },
    {
      label: t("species_page.taxonomy.phylum"),
      value: taxonomy?.phylum ?? "",
      level: 1,
      italicValue: false,
    },
    {
      label: t("species_page.taxonomy.class"),
      value: taxonomy?.class_name ?? "",
      level: 2,
      italicValue: false,
    },
    {
      label: t("species_page.taxonomy.order"),
      value: taxonomy?.order ?? "",
      level: 3,
      italicValue: false,
    },
    {
      label: t("species_page.taxonomy.family"),
      value: taxonomy?.family ?? "",
      level: 4,
      italicValue: false,
    },
    {
      label: t("species_page.taxonomy.genus"),
      value: taxonomy?.genus ?? "",
      level: 5,
      italicValue: true,
    },
    {
      label: t("species_page.taxonomy.epithet"),
      value: taxonomy?.specific_epithet ?? "",
      level: 6,
      italicValue: true,
    },
    {
      label: t("species_page.taxonomy.section"),
      value: taxonomy?.section ?? "",
      level: 6,
      italicValue: false,
    },
    {
      label: t("species_page.taxonomy.infraspecific_taxon"),
      value: taxonomy?.group ?? "",
      level: 6,
      italicValue: false,
    },
    {
      label: t("species_page.taxonomy.authors"),
      value: taxonomy?.authors ?? "",
      level: 0,
      italicValue: false,
    },
    {
      label: t("species_page.taxonomy.year_of_publication"),
      value: taxonomy?.years_of_effective_publication ?? "",
      level: 0,
      italicValue: false,
    },
    {
      label: t("species_page.taxonomy.basionym"),
      value: taxonomy?.basionym ?? "",
      level: 0,
      italicValue: false,
    },
    {
      label: t("species_page.taxonomy.synonyms"),
      value: taxonomy?.synonyms ?? "",
      level: 0,
      italicValue: false,
    },
    {
      label: t("species_page.taxonomy.type_country"),
      value: getCountryName(species?.type_country, i18n.language),
      level: 0,
      italicValue: false,
    },
  ];

  return (
    <Card className={sectionCardClass}>
      <CardContent className={sectionCardContentClass}>
        <div className={sectionTitleWrapClass}>
          <span className={sectionIconWrapClass}>
            <BookOpenText className="h-4 w-4" />
          </span>
          <p className={sectionTitleClass}>{t("common.taxonomy")}</p>
        </div>
        <div className="space-y-2">
          {taxonomyRows
            .filter((row) => Boolean(String(row.value || "").trim()))
            .map((row) => {
              const isLong = row.value.length > 50;
              return (
                <div
                  key={row.label}
                  className={`flex border-b border-slate-200 pb-2 last:border-b-0 ${isLong ? "flex-col gap-0.5" : "flex-wrap items-start justify-between gap-1"}`}
                >
                  <div
                    className="flex items-center gap-2 shrink-0"
                    style={{ marginLeft: `${row.level * 12}px` }}
                  >
                    {row.level > 0 ? <span className="text-slate-400">↳</span> : null}
                    <p className={rowLabelClass}>{row.label}</p>
                  </div>
                  <p
                    className={`${rowValueClass} ${row.italicValue ? "italic" : ""} ${isLong ? "" : "max-w-[65%] text-right"}`}
                  >
                    {row.value}
                  </p>
                </div>
              );
            })}
        </div>
      </CardContent>
    </Card>
  );
}
