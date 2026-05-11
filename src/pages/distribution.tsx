import "leaflet/dist/leaflet.css";

import { fetchDistributionOccurrenceStatistics } from "@/api/species";
import { speciesKeys } from "@/api/query-keys";
import { BEMIcon } from "@/components/bem-icon";
import {
  CLASSIFICATION_COLORS,
  CLASSIFICATION_TOOLTIPS,
  CLASSIFICATIONS,
  type Classification,
} from "@/constants/bem_classifications";
import { BRAZIL_STATE_CENTERS, BRAZIL_STATE_NAMES } from "@/constants/brazil-states";
import { normalize } from "@/lib/lang";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import L from "leaflet";
import { Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from "react-leaflet";

function HeatMarker({
  classification,
  count,
  maxCount,
  position,
  state,
}: {
  classification: Classification;
  count: number;
  maxCount: number;
  position: [number, number];
  state: string;
}) {
  const color = CLASSIFICATION_COLORS[classification];
  const size = Math.max(58, Math.min(132, 44 + (count / Math.max(maxCount, 1)) * 88));
  const icon = useMemo(
    () =>
      L.divIcon({
        className: "distribution-heat-marker",
        html: `<span style="width:${size}px;height:${size}px;background:radial-gradient(circle, ${color} 0%, ${color}99 28%, ${color}40 56%, transparent 72%);"></span>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      }),
    [color, size]
  );

  return (
    <Marker position={position} icon={icon}>
      <Popup>
        <div className="min-w-36 rounded-md bg-white px-3 py-2 text-sm text-[#131313] shadow-lg">
          <p className="font-semibold">{BRAZIL_STATE_NAMES[state] ?? state}</p>
          <p className="text-xs text-neutral-600">{classification}</p>
        </div>
      </Popup>
    </Marker>
  );
}

export default function DistributionPage() {
  const { i18n, t } = useTranslation();
  const locale = normalize(i18n.language);
  const [selectedClassification, setSelectedClassification] = useState<Classification>("BEM1");

  const { data, isLoading, isError } = useQuery({
    queryKey: speciesKeys.distributionStatistics(),
    queryFn: ({ signal }) => fetchDistributionOccurrenceStatistics(signal),
    staleTime: 1000 * 60 * 30,
  });

  const visibleStates = useMemo(() => {
    return Object.entries(data ?? {})
      .map(([state, stats]) => {
        const normalizedState = state.toUpperCase();
        return {
          state: normalizedState,
          position: BRAZIL_STATE_CENTERS[normalizedState],
          count: stats.classifications_count[selectedClassification] ?? 0,
        };
      })
      .filter(
        (item): item is { state: string; position: [number, number]; count: number } =>
          item.count > 0 && Boolean(item.position)
      )
      .sort((a, b) => b.count - a.count);
  }, [data, selectedClassification]);

  const maxCount = Math.max(...visibleStates.map((item) => item.count), 1);

  return (
    <section className="relative flex min-h-[calc(100svh-85px)] flex-col overflow-hidden bg-[#a8cfd8] md:block md:h-[calc(100vh-85px)] md:min-h-[820px]">
      <MapContainer
        center={[-13.5, -53.2]}
        zoom={4}
        minZoom={3}
        maxZoom={8}
        zoomControl={false}
        scrollWheelZoom={false}
        className="z-0 order-2 min-h-[430px] flex-1 md:h-full md:w-full"
      >
        <ZoomControl position="topright" />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {visibleStates.map((item) => (
          <HeatMarker
            key={`${selectedClassification}-${item.state}`}
            classification={selectedClassification}
            count={item.count}
            maxCount={maxCount}
            position={item.position}
            state={item.state}
          />
        ))}
      </MapContainer>

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
                    description={`${classification} - ${CLASSIFICATION_TOOLTIPS[locale][classification]}`}
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
