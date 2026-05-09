import React from "react";
import { SlidersHorizontal } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ComboboxAsync, type ComboboxOption } from "@/components/combobox-async";
import { selectDistributions } from "@/api/species";
import { useIsMobile } from "@/hooks/use-is-mobile";
import type { Locale } from "@/lib/lang";

type FilterModalApplyFilters = {
  search: string;
  distributions: string[];
  distributionLabels: Record<string, string>;
};

interface FilterModalProps {
  search: string;
  distributions: string[];
  filterLabels: { distributions: Record<string, string> };
  onApply: (_filters: FilterModalApplyFilters) => void;
}

export function FilterModal({ search, distributions, filterLabels, onApply }: FilterModalProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Locale;
  const isMobile = useIsMobile();
  const [open, setOpen] = React.useState(false);

  const [draftSearch, setDraftSearch] = React.useState(search);
  const [draftDistributions, setDraftDistributions] = React.useState<string[]>(distributions);
  const [draftDistributionLabels, setDraftDistributionLabels] = React.useState<
    Record<string, string>
  >(filterLabels.distributions);

  React.useEffect(() => {
    if (open) {
      setDraftSearch(search);
      setDraftDistributions(distributions);
      setDraftDistributionLabels(filterLabels.distributions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const activeCount = [search, ...distributions].filter(Boolean).length;

  const fetchDistributionOptions = React.useCallback(
    async (_query: string, signal: AbortController["signal"]): Promise<ComboboxOption[]> => {
      const res = await selectDistributions(signal);
      const isPt = lang === "pt";
      return res.map((item) => ({
        id: item.slug,
        label: `${item.slug} - ${isPt ? item.label_pt : item.label_en}`,
      }));
    },
    [lang]
  );

  const distributionInitialOptions = React.useMemo<ComboboxOption[]>(
    () => Object.entries(draftDistributionLabels).map(([id, label]) => ({ id, label })),
    // only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleApply = () => {
    onApply({
      search: draftSearch,
      distributions: draftDistributions,
      distributionLabels: draftDistributionLabels,
    });
    setOpen(false);
  };

  const hasActiveFilters = !!(search || distributions.length);

  const handleClear = () => {
    setDraftSearch("");
    setDraftDistributions([]);
    setDraftDistributionLabels({});
    if (hasActiveFilters) {
      onApply({
        search: "",
        distributions: [],
        distributionLabels: {},
      });
      setOpen(false);
    }
  };

  const triggerButton = (
    <Button
      variant="outline"
      className="relative gap-2 h-11 w-full md:w-fit border-primary/60 bg-transparent text-primary hover:bg-primary/15 hover:text-primary"
    >
      <SlidersHorizontal className="w-4 h-4" />
      {t("explore_page.filters")}
      {activeCount > 0 && (
        <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {activeCount}
        </span>
      )}
    </Button>
  );

  const formContent = (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2 px-4">
      <label className="sm:col-span-2 flex flex-col gap-1.5">
        <span className="text-sm text-muted-foreground">{t("explore_page.input_placeholder")}</span>
        <Input
          value={draftSearch}
          onChange={(e) => setDraftSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleApply()}
          placeholder={t("common.search")}
        />
      </label>
      <label className="sm:col-span-2 flex flex-col gap-1.5">
        <span className="text-sm text-muted-foreground">
          {t("explore_page.select_distributions")}
        </span>
        <ComboboxAsync
          variant="light"
          multiple
          fetchOptions={fetchDistributionOptions}
          initialKnownOptions={distributionInitialOptions}
          value={draftDistributions}
          onSelect={(ids) => setDraftDistributions(ids.map(String))}
          onSelectOption={(opts) => {
            const labels: Record<string, string> = {};
            for (const opt of opts) labels[String(opt.id)] = opt.label;
            setDraftDistributionLabels(labels);
          }}
        />
      </label>
    </div>
  );

  const backdrop = open && (
    <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setOpen(false)} />
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen} modal={false}>
        <DrawerTrigger asChild>{triggerButton}</DrawerTrigger>
        {backdrop}
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{t("explore_page.filters")}</DrawerTitle>
          </DrawerHeader>
          {formContent}
          <DrawerFooter>
            <Button
              onClick={handleApply}
              className="bg-primary text-primary-foreground font-semibold hover:bg-primary/90"
            >
              {t("explore_page.filter_apply")}
            </Button>
            <Button variant="ghost" onClick={handleClear}>
              {t("explore_page.filter_clear")}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      {backdrop}
      <DialogContent className="sm:max-w-2xl" onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>{t("explore_page.filters")}</DialogTitle>
        </DialogHeader>
        {formContent}
        <DialogFooter>
          <Button variant="ghost" onClick={handleClear}>
            {t("explore_page.filter_clear")}
          </Button>
          <Button
            onClick={handleApply}
            className="bg-primary text-primary-foreground font-semibold hover:bg-primary/90"
          >
            {t("explore_page.filter_apply")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
