import { DomainComboboxAsync } from "@/components/domain-combobox-async";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { SpeciesRequestFormValues } from "@/pages/species-request/types";
import type { ReactNode } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

type SpeciesDataStepProps = {
  form: UseFormReturn<SpeciesRequestFormValues>;
};

function StepSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-1">
      <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
      <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-4">{children}</div>
    </div>
  );
}

export function SpeciesDataStep({ form }: SpeciesDataStepProps) {
  const { t, i18n } = useTranslation();
  const monthOptions = Array.from({ length: 12 }, (_, index) => {
    const month = index + 1;
    const label = new Intl.DateTimeFormat(i18n.language, { month: "long" }).format(
      new Date(2020, index, 1)
    );
    return {
      value: String(month),
      label: label.charAt(0).toUpperCase() + label.slice(1),
    };
  });

  return (
    <section className="space-y-4">
      <StepSection title={t("species_page.sections.characteristics_trophic")}>
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="growth_forms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("species_request.growth_forms")}</FormLabel>
                <FormControl>
                  <DomainComboboxAsync
                    domain="growth_form"
                    multiple
                    value={field.value ?? []}
                    onSelect={field.onChange}
                    placeholder={t("species_request.domain_multi_placeholder")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nutrition_modes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("species_request.nutrition_modes")}</FormLabel>
                <FormControl>
                  <DomainComboboxAsync
                    domain="nutrition_mode"
                    multiple
                    value={field.value ?? []}
                    onSelect={field.onChange}
                    placeholder={t("species_request.domain_multi_placeholder")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="size_cm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("species_request.size_cm")}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    step="0.1"
                    value={field.value ?? ""}
                    onChange={(event) => field.onChange(event.target.value)}
                    placeholder={t("species_request.size_cm_placeholder")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="colors"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("species_request.colors")}</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    placeholder={t("species_request.colors_placeholder")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </StepSection>

      <StepSection title={t("species_page.sections.characteristics_substrate")}>
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="substrates"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("species_request.substrates")}</FormLabel>
                <FormControl>
                  <DomainComboboxAsync
                    domain="substrate"
                    multiple
                    value={field.value ?? []}
                    onSelect={field.onChange}
                    placeholder={t("species_request.domain_multi_placeholder")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="decay_types"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("species_request.decay_types")}</FormLabel>
                <FormControl>
                  <DomainComboboxAsync
                    domain="decay_type"
                    multiple
                    value={field.value ?? []}
                    onSelect={field.onChange}
                    placeholder={t("species_request.domain_multi_placeholder")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </StepSection>

      <StepSection title={t("species_page.sections.characteristics_habitat")}>
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="habitats"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("species_request.habitats")}</FormLabel>
                <FormControl>
                  <DomainComboboxAsync
                    domain="habitat"
                    multiple
                    value={field.value ?? []}
                    onSelect={field.onChange}
                    placeholder={t("species_request.domain_multi_placeholder")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </StepSection>

      <StepSection title={t("species_request.section_occurrence")}>
        <FormField
          control={form.control}
          name="finding_tips"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("species_request.finding_tips")}</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value ?? ""}
                  rows={3}
                  placeholder={t("species_request.finding_tips_placeholder")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nearby_trees"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("species_request.nearby_trees")}</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value ?? ""}
                  rows={2}
                  placeholder={t("species_request.nearby_trees_placeholder")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>{t("species_request.seasonality")}</FormLabel>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="season_start_month"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("species_request.season_start_month")}</FormLabel>
                  <FormControl>
                    <Select value={field.value || ""} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t("species_request.season_start_placeholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        {monthOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="season_end_month"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("species_request.season_end_month")}</FormLabel>
                  <FormControl>
                    <Select value={field.value || ""} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t("species_request.season_end_placeholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        {monthOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </FormItem>

        <FormField
          control={form.control}
          name="cultivation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("species_request.cultivation")}</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value ?? ""}
                  rows={3}
                  placeholder={t("species_request.cultivation_placeholder")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </StepSection>

      <StepSection title={t("species_request.section_description")}>
        <FormField
          control={form.control}
          name="curiosities"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("species_request.curiosities")}</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value ?? ""}
                  rows={3}
                  placeholder={t("species_request.curiosities_placeholder")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="general_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("species_request.general_description")}</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value ?? ""}
                  rows={4}
                  placeholder={t("species_request.general_description_placeholder")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </StepSection>

      <StepSection title={t("species_request.section_references")}>
        <FormField
          control={form.control}
          name="references_raw"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("species_request.references_raw")}</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value ?? ""}
                  rows={4}
                  placeholder={t("species_request.references_raw_placeholder")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="request_note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("species_request.request_note")}</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value ?? ""}
                  rows={3}
                  placeholder={t("species_request.request_note_placeholder")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </StepSection>
    </section>
  );
}
