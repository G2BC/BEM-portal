import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { TFunction } from "i18next";
import type { UseFormReturn } from "react-hook-form";
import type { SpeciesEditFormValues } from "../types";

type SpeciesVisibilityFieldProps = {
  form: UseFormReturn<SpeciesEditFormValues>;
  t: TFunction;
};

export function SpeciesVisibilityField({ form, t }: SpeciesVisibilityFieldProps) {
  return (
    <FormField
      control={form.control}
      name="is_visible"
      render={({ field }) => (
        <FormItem className="gap-2">
          <FormLabel className="text-sm font-medium tracking-normal text-slate-600">
            {t("panel_page.species_edit_field_is_visible")}
          </FormLabel>
          <FormControl>
            <ToggleGroup
              type="single"
              variant="outline"
              value={field.value}
              onValueChange={(value) => {
                if (!value) return;
                field.onChange(value);
              }}
              className="w-fit"
            >
              <ToggleGroupItem
                value="true"
                className="data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground hover:data-[state=on]:bg-primary/90"
              >
                {t("species_page.attributes.yes")}
              </ToggleGroupItem>
              <ToggleGroupItem
                value="false"
                className="data-[state=on]:border-rose-600 data-[state=on]:bg-rose-600 data-[state=on]:text-white hover:data-[state=on]:bg-rose-700"
              >
                {t("species_page.attributes.no")}
              </ToggleGroupItem>
            </ToggleGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
