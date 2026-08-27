import { fetchSpecies, fetchSpeciesNcbi } from "@/api/species";
import { speciesKeys } from "@/api/query-keys";
import type { Taxonomy, TaxonomyNomenclature } from "@/api/species/types/ISpecie";
import { DEFAULT_LOCALE } from "@/lib/lang";
import { normalizeSpeciesNcbiRecords } from "@/pages/species/utils";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

// Temporary UI fixture. Remove this once BEM-api returns taxonomy.nomenclature.
const MOCK_NOMENCLATURE: TaxonomyNomenclature = {
  synonyms: [
    {
      scientific_name: "Agaricus brasiliensis",
      authors: "Silva & Pereira",
      is_brazilian_type_synonym: false,
    },
    {
      scientific_name: "Agaricus testaceus",
      authors: "Oliveira",
      is_brazilian_type_synonym: false,
    },
    {
      scientific_name: "Psalliota brasiliensis",
      authors: "Speg.",
      is_brazilian_type_synonym: true,
    },
  ],
  basionym: {
    scientific_name: "Lepiota brasiliensis",
    authors: "R. Heim",
    is_brazilian_type_synonym: false,
  },
};

const EMPTY_TAXONOMY: Taxonomy = {
  authors: null,
  basionym: null,
  gender: null,
  synonyms: null,
  years_of_effective_publication: null,
};

export function useSpeciesPage() {
  const { species, lang } = useParams<{ species: string; lang: string }>();
  const navigate = useNavigate();

  const speciesQuery = useQuery({
    queryKey: speciesKeys.detail(species!),
    queryFn: ({ signal }) => fetchSpecies(species, signal),
    enabled: !!species,
  });

  const ncbiQuery = useQuery({
    queryKey: speciesKeys.ncbi(species!),
    queryFn: ({ signal }) => fetchSpeciesNcbi(species, signal),
    enabled: !!species,
    select: normalizeSpeciesNcbiRecords,
  });

  useEffect(() => {
    if (speciesQuery.isError) {
      navigate(`/${lang ?? DEFAULT_LOCALE}/explorar`);
    }
  }, [speciesQuery.isError, navigate, lang]);

  return {
    dados: speciesQuery.data
      ? {
          ...speciesQuery.data,
          taxonomy: {
            ...(speciesQuery.data.taxonomy ?? EMPTY_TAXONOMY),
            nomenclature: MOCK_NOMENCLATURE,
          },
        }
      : null,
    loading: speciesQuery.isLoading,
    ncbiRecords: ncbiQuery.data ?? [],
    ncbiLoading: ncbiQuery.isLoading,
  };
}
