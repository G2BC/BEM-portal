import type { Taxonomy, TaxonomicName } from "@/api/species/types/ISpecie";
import { HoverPopover } from "@/components/hover-popover";
import { Button } from "@/components/ui/button";
import brazilianTypeSynonymIcon from "@/assets/flags/country_types/TS.png";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface TaxonomicSynonymsProps {
  taxonomy?: Taxonomy;
  currentScientificName: string;
  rowLabelClass: string;
  rowValueClass: string;
}

function isDifferentName(name: TaxonomicName, currentScientificName: string) {
  return (
    name.scientific_name.trim().toLocaleLowerCase() !==
    currentScientificName.trim().toLocaleLowerCase()
  );
}

function BrazilianTypeSynonymIcon() {
  const { t } = useTranslation();
  const description = t("species_page.taxonomy.brazilian_type_synonym");

  return (
    <HoverPopover
      trigger={
        <img src={brazilianTypeSynonymIcon} alt={description} className="h-5 w-5 shrink-0" />
      }
      triggerClassName="inline-flex shrink-0"
      content={<p>{description}</p>}
    />
  );
}

function TaxonomicNameLine({
  name,
  basionym = false,
}: {
  name: TaxonomicName;
  basionym?: boolean;
}) {
  const { t } = useTranslation();

  return (
    <li className="flex items-start gap-2 text-[0.98rem] font-medium text-slate-900">
      {name.is_brazilian_type_synonym ? <BrazilianTypeSynonymIcon /> : null}
      <span>
        <em>{name.scientific_name}</em>
        {name.authors?.trim() ? ` ${name.authors.trim()}` : null}
        {basionym ? ` — ${t("species_page.taxonomy.basionym")}` : null}
      </span>
    </li>
  );
}

export function TaxonomicSynonyms({
  taxonomy,
  currentScientificName,
  rowLabelClass,
  rowValueClass,
}: TaxonomicSynonymsProps) {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const synonyms = [...(taxonomy?.nomenclature?.synonyms ?? [])].sort((first, second) =>
    first.scientific_name.localeCompare(second.scientific_name, i18n.language, {
      sensitivity: "base",
    })
  );
  const basionym = taxonomy?.nomenclature?.basionym;
  const visibleBasionym =
    basionym && isDifferentName(basionym, currentScientificName) ? basionym : null;
  const hasNames = synonyms.length > 0 || Boolean(visibleBasionym);

  return (
    <div className="border-b border-slate-200 pb-2 last:border-b-0">
      <div className="flex flex-wrap items-center justify-between gap-1">
        <p className={rowLabelClass}>{t("species_page.taxonomy.synonyms")}</p>
        <Button
          type="button"
          variant="link"
          size="sm"
          className={`${rowValueClass} h-auto px-0 py-0`}
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="taxonomic-synonyms"
        >
          {isOpen
            ? t("species_page.taxonomy.hide_synonyms")
            : t("species_page.taxonomy.view_synonyms")}
        </Button>
      </div>

      {isOpen ? (
        <div id="taxonomic-synonyms" className="pt-2">
          {hasNames ? (
            <ul className="space-y-1.5">
              {synonyms.map((synonym) => (
                <TaxonomicNameLine
                  key={`${synonym.scientific_name}-${synonym.authors ?? ""}`}
                  name={synonym}
                />
              ))}
              {visibleBasionym ? <TaxonomicNameLine name={visibleBasionym} basionym /> : null}
            </ul>
          ) : (
            <p className={rowValueClass}>{t("species_page.taxonomy.no_synonyms")}</p>
          )}
        </div>
      ) : null}
    </div>
  );
}
