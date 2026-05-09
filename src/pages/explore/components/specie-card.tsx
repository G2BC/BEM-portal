import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import type { ISpecie } from "@/api/species/types/ISpecie";
import photoDefault from "@/assets/specie-card-default.png";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router";
import { DEFAULT_LOCALE } from "@/lib/lang";
import { getPhotoUrl } from "@/pages/species/utils";
import { ConservationStatusIcon } from "@/components/conservation-status-icon";
import { CountryTypeIcon } from "@/components/country-type-icon";
import { getCountryTypeDescription } from "@/lib/country-type-description";

export function SpecieCard(props: ISpecie) {
  const { t } = useTranslation();
  const { lang } = useParams();

  const photoFeatured = props.photos?.find((p) => p.featured === true);
  const firstPhoto = props.photos?.[0];

  const selectedPhoto = photoFeatured ?? firstPhoto;
  const photo = selectedPhoto ? getPhotoUrl(selectedPhoto) || photoDefault : photoDefault;
  const countryTypeCode = props.brazilian_type || props.brazilian_type_synonym;
  const conservationStatusCode = props.species_characteristics?.conservation_status;
  const conservationStatusDescription = t(
    `species_page.fields.conservation_status_values.${(conservationStatusCode || "NE")
      .trim()
      .toUpperCase()}.description`,
    {
      defaultValue: t("species_page.fields.conservation_status_values.NE.description"),
    }
  );
  const conservationStatusLabel = t(
    `species_page.fields.conservation_status_values.${(conservationStatusCode || "NE")
      .trim()
      .toUpperCase()}.name`,
    {
      defaultValue: t("species_page.fields.conservation_status_values.NE.name"),
    }
  );

  return (
    <Link
      to={`/${lang ?? DEFAULT_LOCALE}/especie/${props.id}`}
      className="group block w-full lg:w-[280px]"
    >
      <Card className="p-0 border-0 overflow-hidden w-full h-[500px] md:h-[390px]">
        <CardContent className="p-0 h-full flex flex-col">
          <div className="w-full flex-1 overflow-hidden bg-[#BBBBBB]">
            <img
              className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
              src={photo}
              alt={props.scientific_name}
            />
          </div>
          <CardFooter className="p-4 h-[110px] min-h-[110px]">
            <div className="flex w-full items-stretch flex-col justify-between">
              <div className="min-w-0">
                <CardTitle className="font-bold leading-[22px] italic line-clamp-1">
                  {props.scientific_name}
                </CardTitle>
                <CardDescription
                  className="min-h-5 truncate text-sm font-light"
                  title={props.common_name?.trim() || undefined}
                >
                  {props.common_name?.trim() || ""}
                </CardDescription>
              </div>
              <span className="mt-3 flex items-center gap-2 self-end">
                <CountryTypeIcon
                  country={countryTypeCode}
                  description={getCountryTypeDescription(t, countryTypeCode)}
                  className="inline-flex shrink-0"
                  imageClassName="h-8 w-8 shrink-0"
                />
                <ConservationStatusIcon
                  code={conservationStatusCode}
                  label={conservationStatusLabel}
                  description={conservationStatusDescription}
                  className="inline-flex shrink-0"
                  imageClassName="h-8 w-8 shrink-0"
                />
              </span>
            </div>
          </CardFooter>
        </CardContent>
      </Card>
    </Link>
  );
}
