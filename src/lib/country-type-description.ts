import type { TFunction } from "i18next";

const COUNTRY_TYPE_DESCRIPTION_KEYS: Record<string, string> = {
  T: "common.country_type_descriptions.T",
  TS: "common.country_type_descriptions.TS",
};

export function getCountryTypeDescription(t: TFunction, typeCode: string | null | undefined) {
  const normalizedTypeCode = typeCode?.trim().toUpperCase();
  const descriptionKey = normalizedTypeCode
    ? COUNTRY_TYPE_DESCRIPTION_KEYS[normalizedTypeCode]
    : undefined;

  return descriptionKey ? t(descriptionKey) : "";
}
