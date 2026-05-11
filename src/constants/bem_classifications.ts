import type { Locale } from "@/lib/lang";

export const CLASSIFICATIONS = [
  "BEM1",
  "BEM2",
  "BEM3",
  "BEM4",
  "BEM5",
  "BEM6",
  "BEM7",
  "BEM8",
  "BEM9",
  "BEM10",
  "P1",
  "P2",
] as const;

export type Classification = (typeof CLASSIFICATIONS)[number];

export const CLASSIFICATION_COLORS: Record<Classification, string> = {
  BEM1: "#66BB6A",
  BEM2: "#9CCC65",
  BEM3: "#FFEB3B",
  BEM4: "#FFEE58",
  BEM5: "#FFA726",
  BEM6: "#FF7043",
  BEM7: "#EF5350",
  BEM8: "#EC407A",
  BEM9: "#AB47BC",
  BEM10: "#7E57C2",
  P1: "#5C6BC0",
  P2: "#42A5F5",
};

export const CLASSIFICATION_TOOLTIPS: Record<Locale, Record<Classification, string>> = {
  pt: {
    BEM1: "Espécie comestível que claramente ocorre e é consumida no Brasil ou que representa um novo recurso alimentar para o país.",
    BEM2: "Espécie comestível (após alguns preparos ou cuidados prévios) que claramente ocorre e é consumida no Brasil ou que representa um novo recurso alimentar para o país.",
    BEM3: "Espécie comestível consumida no Brasil mas que necessita de mais estudos para confirmar sua identidade e ocorrência no país.",
    BEM4: "Espécie comestível (após alguns preparos ou cuidados prévios) consumida no Brasil, mas que requer mais estudos para confirmar sua identidade e ocorrência no país.",
    BEM5: "Espécie comestível não claramente consumida no Brasil, mas que representa um novo recurso alimentar para o país após novos estudos para confirmar sua identidade e ocorrência no Brasil.",
    BEM6: "Espécie comestível (após alguns preparos ou cuidados prévios) claramente não consumida no Brasil, mas que representa um novo recurso alimentar para o país após novos estudos para confirmar sua identidade e ocorrência no Brasil.",
    BEM7: "Espécie que ocorre claramente no Brasil, mas com incidência pouco clara ou ausente de que foi consumida.",
    BEM8: "Espécie com incidência pouco clara ou ausente para consumo e que requer mais estudos para confirmar sua identidade e ocorrência no Brasil.",
    BEM9: "Espécie que ocorre claramente no Brasil, mas com comestibilidade não confirmada, incluindo poucos registros de venenosidade.",
    BEM10:
      "Espécie com comestibilidade não confirmada, incluindo poucos registros de venenosidade, e que necessita de mais estudos para confirmar sua identidade e ocorrência no Brasil.",
    P1: "Espécie venenosa que ocorre claramente no Brasil e causa reação adversa e prejudicial quando consumida.",
    P2: "Espécie venenosa que causa reações adversas e nocivas quando consumida e necessita de mais estudos para confirmação de sua identidade e ocorrência no Brasil.",
  },
  en: {
    BEM1: "Edible species that clearly occur and are consumed in Brazil, or that represent a new food resource for the country.",
    BEM2: "Edible species (after some preparation or prior care) that clearly occur and are consumed in Brazil, or that represent a new food resource for the country.",
    BEM3: "Edible species consumed in Brazil but requiring further studies to confirm its identity and occurrence in the country.",
    BEM4: "Edible species (after some preparation or prior care) consumed in Brazil, but requiring further studies to confirm its identity and occurrence in the country.",
    BEM5: "Edible species not clearly consumed in Brazil, but representing a new food resource for the country after further studies confirm its identity and occurrence in Brazil.",
    BEM6: "Edible species (after some preparation or prior care) clearly not consumed in Brazil, but representing a new food resource for the country after further studies confirm its identity and occurrence in Brazil.",
    BEM7: "Species that clearly occurs in Brazil, but with unclear or absent evidence that it has been consumed.",
    BEM8: "Species with unclear or absent evidence of consumption and requiring further studies to confirm its identity and occurrence in Brazil.",
    BEM9: "Species that clearly occurs in Brazil, but with unconfirmed edibility, including few records of poisonousness.",
    BEM10:
      "Species with unconfirmed edibility, including few records of poisonousness, and requiring further studies to confirm its identity and occurrence in Brazil.",
    P1: "Poisonous species that clearly occurs in Brazil and causes an adverse and harmful reaction when consumed.",
    P2: "Poisonous species that causes adverse and harmful reactions when consumed and requires further studies to confirm its identity and occurrence in Brazil.",
  },
};

export const CLASSIFICATION_PLURAL_TOOLTIPS: Record<Locale, Record<Classification, string>> = {
  pt: {
    BEM1: "Espécies comestíveis que claramente ocorrem e são consumidas no Brasil ou que representam um novo recurso alimentar para o país.",
    BEM2: "Espécies comestíveis (após alguns preparos ou cuidados prévios) que claramente ocorrem e são consumidas no Brasil ou que representam um novo recurso alimentar para o país.",
    BEM3: "Espécies comestíveis consumidas no Brasil mas que necessitam de mais estudos para confirmar sua identidade e ocorrência no país.",
    BEM4: "Espécies comestíveis (após alguns preparos ou cuidados prévios) consumidas no Brasil, mas que requerem mais estudos para confirmar sua identidade e ocorrência no país.",
    BEM5: "Espécies comestíveis não claramente consumidas no Brasil, mas que representam um novo recurso alimentar para o país após novos estudos para confirmar sua identidade e ocorrência no Brasil.",
    BEM6: "Espécies comestíveis (após alguns preparos ou cuidados prévios) claramente não consumidas no Brasil, mas que representam um novo recurso alimentar para o país após novos estudos para confirmar sua identidade e ocorrência no Brasil.",
    BEM7: "Espécies que ocorrem claramente no Brasil, mas com incidência pouco clara ou ausente de que foram consumidas.",
    BEM8: "Espécies com incidência pouco clara ou ausente para consumo e que requerem mais estudos para confirmar sua identidade e ocorrência no Brasil.",
    BEM9: "Espécies que ocorrem claramente no Brasil, mas com comestibilidade não confirmada, incluindo poucos registros de venenosidade.",
    BEM10:
      "Espécies com comestibilidade não confirmada, incluindo poucos registros de venenosidade, e que necessitam de mais estudos para confirmar sua identidade e ocorrência no Brasil.",
    P1: "Espécies venenosas que ocorrem claramente no Brasil e causam reações adversas e prejudiciais quando consumidas.",
    P2: "Espécies venenosas que causam reações adversas e nocivas quando consumidas e necessitam de mais estudos para confirmação de sua identidade e ocorrência no Brasil.",
  },
  en: {
    BEM1: "Edible species that clearly occur and are consumed in Brazil, or that represent a new food resource for the country.",
    BEM2: "Edible species (after some preparation or prior care) that clearly occur and are consumed in Brazil, or that represent a new food resource for the country.",
    BEM3: "Edible species consumed in Brazil but requiring further studies to confirm their identity and occurrence in the country.",
    BEM4: "Edible species (after some preparation or prior care) consumed in Brazil, but requiring further studies to confirm their identity and occurrence in the country.",
    BEM5: "Edible species not clearly consumed in Brazil, but representing a new food resource for the country after further studies confirm their identity and occurrence in Brazil.",
    BEM6: "Edible species (after some preparation or prior care) clearly not consumed in Brazil, but representing a new food resource for the country after further studies confirm their identity and occurrence in Brazil.",
    BEM7: "Species that clearly occur in Brazil, but with unclear or absent evidence that they have been consumed.",
    BEM8: "Species with unclear or absent evidence of consumption and requiring further studies to confirm their identity and occurrence in Brazil.",
    BEM9: "Species that clearly occur in Brazil, but with unconfirmed edibility, including few records of poisonousness.",
    BEM10:
      "Species with unconfirmed edibility, including few records of poisonousness, and requiring further studies to confirm their identity and occurrence in Brazil.",
    P1: "Poisonous species that clearly occur in Brazil and cause adverse and harmful reactions when consumed.",
    P2: "Poisonous species that cause adverse and harmful reactions when consumed and require further studies to confirm their identity and occurrence in Brazil.",
  },
};

export function isClassification(value: string | null | undefined): value is Classification {
  return CLASSIFICATIONS.includes(value as Classification);
}

export function getClassificationTooltip(
  value: string | null | undefined,
  locale: Locale,
  options?: { plural?: boolean }
): string | undefined {
  const normalizedValue = value?.trim().toUpperCase();

  if (!isClassification(normalizedValue)) {
    return undefined;
  }

  if (options?.plural) {
    return CLASSIFICATION_PLURAL_TOOLTIPS[locale][normalizedValue];
  }

  return CLASSIFICATION_TOOLTIPS[locale][normalizedValue];
}
