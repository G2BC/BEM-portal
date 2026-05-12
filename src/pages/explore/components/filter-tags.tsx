import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

interface FilterTagsProps {
  search: string;
  bem: string;
  bemLabel: string;
  distributions: string[];
  onClearSearch: () => void;
  onClearBem: () => void;
  onClearDistributions: () => void;
}

function Tag({
  prefix,
  value,
  onRemove,
}: {
  prefix?: string;
  value: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-primary/20 text-primary text-sm font-medium px-3 py-1 rounded-full whitespace-nowrap max-w-[320px]">
      {prefix ? <span className="opacity-70 shrink-0">{prefix}:</span> : null}
      <span className="truncate">{value}</span>
      <button
        onClick={onRemove}
        className="hover:text-primary/70 transition-colors flex items-center shrink-0"
        aria-label={`Remover filtro ${prefix ?? value}`}
      >
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}

export function FilterTags({
  search,
  bem,
  bemLabel,
  distributions,
  onClearSearch,
  onClearBem,
  onClearDistributions,
}: FilterTagsProps) {
  const { t } = useTranslation();

  const distributionValue = distributions.join(", ");

  const tags = [
    search
      ? {
          id: "search",
          prefix: t("explore_page.search_tag_label"),
          value: search,
          onRemove: onClearSearch,
        }
      : null,
    bem
      ? {
          id: "bem",
          value: bemLabel || bem,
          onRemove: onClearBem,
        }
      : null,
    distributions.length
      ? {
          id: "distributions",
          prefix: t("explore_page.select_distributions"),
          value: distributionValue,
          onRemove: onClearDistributions,
        }
      : null,
  ].filter(Boolean) as Array<{ id: string; prefix?: string; value: string; onRemove: () => void }>;

  if (!tags.length) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {tags.map((tag) => (
        <Tag key={tag.id} prefix={tag.prefix} value={tag.value} onRemove={tag.onRemove} />
      ))}
    </div>
  );
}
