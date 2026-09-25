import "leaflet/dist/leaflet.css";

import { fetchDistributionOccurrenceStatistics } from "@/api/species";
import { speciesKeys } from "@/api/query-keys";
import brazilStatesData from "@/assets/geo/brazil-states.json";
import { BEMIcon } from "@/components/bem-icon";
import {
  CLASSIFICATION_COLORS,
  CLASSIFICATIONS,
  getClassificationTooltip,
  type Classification,
} from "@/constants/bem_classifications";
import { BRAZIL_STATE_NAMES } from "@/constants/brazil-states";
import { normalize } from "@/lib/lang";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import type { Feature, GeoJsonObject } from "geojson";
import L, { type Layer, type PathOptions } from "leaflet";
import { Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { GeoJSON, MapContainer, TileLayer, ZoomControl } from "react-leaflet";

const brazilStatesGeoJson = brazilStatesData as unknown as GeoJsonObject;

export default function DistributionPage() {
  const { i18n, t } = useTranslation();
  const locale = normalize(i18n.language);
  const [selectedClassification, setSelectedClassification] = useState<Classification>("BEM1");

  const { data, isLoading, isError } = useQuery({
    queryKey: speciesKeys.distributionStatistics(),
    queryFn: ({ signal }) => fetchDistributionOccurrenceStatistics(signal),
    staleTime: 1000 * 60 * 30,
  });

  const activeStatesMap = useMemo(() => {
    const map: Record<string, number> = {};
    Object.entries(data ?? {}).forEach(([state, stats]) => {
      const count = stats.classifications_count[selectedClassification] ?? 0;
      if (count > 0) {
        map[state.toUpperCase()] = count;
      }
    });
    return map;
  }, [data, selectedClassification]);

  const hasOccurrences = Object.keys(activeStatesMap).length > 0;
  const currentColor = CLASSIFICATION_COLORS[selectedClassification];

  const getFeatureStyle = (feature?: Feature): PathOptions => {
    const uf = (feature?.properties?.sigla ?? "").toUpperCase();
    const count = activeStatesMap[uf] ?? 0;
    const hasOccurrence = count > 0;

    if (hasOccurrence) {
      return {
        fillColor: currentColor,
        fillOpacity: 0.35,
        color: currentColor,
        weight: 1.5,
        opacity: 0.9,
      };
    }

    return {
      fillColor: "transparent",
      fillOpacity: 0,
      color: "rgba(100, 116, 139, 0.3)",
      weight: 0.8,
      opacity: 0.5,
    };
  };

  const onEachFeature = (feature: Feature, layer: Layer) => {
    const uf = (feature.properties?.sigla ?? "").toUpperCase();
    const stateName = feature.properties?.name || BRAZIL_STATE_NAMES[uf] || uf;
    const count = activeStatesMap[uf] ?? 0;
    const hasOccurrence = count > 0;

    const tooltipContent = hasOccurrence
      ? `<div class="text-xs">
          <div class="font-semibold text-slate-900">${stateName} (${uf})</div>
          <div class="text-[11px] text-slate-600 mt-0.5">${count} ${count === 1 ? "ocorrência" : "ocorrências"}</div>
        </div>`
      : `<div class="text-xs font-semibold text-slate-900">${stateName} (${uf})</div>`;

    layer.bindTooltip(tooltipContent, {
      sticky: true,
      direction: "top",
      opacity: 1,
      className:
        "!bg-white !text-slate-900 !border !border-slate-300 !rounded-md !shadow-xl !px-2.5 !py-1.5 !font-sans",
    });

    layer.on({
      mouseover: (e) => {
        const l = e.target;
        if (hasOccurrence) {
          l.setStyle({
            fillOpacity: 0.6,
            weight: 2.2,
            color: currentColor,
          });
          if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            l.bringToFront();
          }
        } else {
          l.setStyle({
            weight: 1.5,
            color: "rgba(100, 116, 139, 0.6)",
          });
        }
      },
      mouseout: (e) => {
        const l = e.target;
        if (hasOccurrence) {
          l.setStyle({
            fillOpacity: 0.35,
            weight: 1.5,
            color: currentColor,
          });
        } else {
          l.setStyle({
            weight: 0.8,
            color: "rgba(100, 116, 139, 0.3)",
          });
        }
      },
    });
  };

  return (
    <section className="relative flex min-h-[calc(100svh-85px)] flex-col overflow-hidden bg-[#a8cfd8] md:block md:h-[calc(100vh-85px)] md:min-h-[820px]">
      <div className="relative z-0 order-2 min-h-[430px] flex-1 md:h-full md:w-full">
        <MapContainer
          center={[-13.5, -53.2]}
          zoom={4}
          minZoom={3}
          maxZoom={8}
          zoomControl={false}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <ZoomControl position="topright" />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          <GeoJSON
            key={selectedClassification}
            data={brazilStatesGeoJson}
            style={getFeatureStyle}
            onEachFeature={onEachFeature}
          />
        </MapContainer>

        {/* Cenário 3: Aviso quando não há registros na categoria selecionada */}
        {!isLoading && !isError && !hasOccurrences && (
          <div className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 z-[400] rounded-lg bg-white/95 px-4 py-2.5 shadow-lg border border-neutral-200 text-sm font-medium text-neutral-700 backdrop-blur-sm">
            {t("distribution_page.no_records", {
              defaultValue: "Nenhum registro geográfico encontrado para esta categoria.",
            })}
          </div>
        )}

        {/* Indicador de carregamento */}
        {isLoading && (
          <div className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 z-[400] flex items-center gap-2 rounded-lg bg-white/95 px-4 py-2 shadow-lg border border-neutral-200 text-xs text-neutral-600 backdrop-blur-sm">
            <Loader2 className="size-3.5 animate-spin text-primary" />
            <span>{t("common.loading", { defaultValue: "Carregando dados..." })}</span>
          </div>
        )}
      </div>

      <aside className="order-1 z-[400] flex w-full flex-col border-b border-black/10 bg-white/95 shadow-xl backdrop-blur-sm md:absolute md:left-0 md:top-0 md:h-full md:w-[320px] md:border-b-0 md:border-r">
        <div className="bg-[#131313] px-4 py-3 text-center text-sm font-bold leading-tight text-white md:px-6 md:py-5">
          {t("distribution_page.instructions")}
        </div>

        <div className="border-b border-neutral-200 px-4 py-2 text-sm md:py-3">
          <span className="font-semibold text-[#131313]">{selectedClassification}</span>
        </div>

        {isLoading ? (
          <div className="flex flex-1 items-center justify-center gap-2 text-sm text-neutral-600">
            <Loader2 className="size-4 animate-spin" />
            {t("common.loading", { defaultValue: "Carregando" })}
          </div>
        ) : isError ? (
          <div className="px-5 py-6 text-sm text-red-600">{t("distribution_page.error")}</div>
        ) : (
          <div className="scrollbar-hide flex min-h-0 overflow-x-auto md:block md:flex-1 md:overflow-y-auto md:pb-3">
            {CLASSIFICATIONS.map((classification) => {
              const active = classification === selectedClassification;
              return (
                <button
                  key={classification}
                  type="button"
                  onClick={() => setSelectedClassification(classification)}
                  className={cn(
                    "flex h-[76px] w-[82px] shrink-0 items-center justify-center border-r border-neutral-200 px-2 text-center text-sm text-[#131313] transition-colors hover:bg-neutral-100 md:h-[51px] md:w-full md:justify-start md:border-b md:border-r-0 md:px-4 md:text-left md:text-base",
                    active && "bg-neutral-100 font-semibold"
                  )}
                >
                  <BEMIcon
                    type={classification}
                    description={`${classification} - ${getClassificationTooltip(classification, locale, { plural: true })}`}
                    imageClassName="h-8 w-8 max-h-8 max-w-8 shrink-0"
                    className="flex w-full flex-col items-center gap-1 md:flex-row md:gap-3"
                  >
                    <span>{classification}</span>
                  </BEMIcon>
                </button>
              );
            })}
          </div>
        )}
      </aside>
    </section>
  );
}
