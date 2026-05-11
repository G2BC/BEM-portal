import "leaflet/dist/leaflet.css";

import { fetchDistributionOccurrenceStatistics } from "@/api/species";
import { speciesKeys } from "@/api/query-keys";
import { BEMIcon } from "@/components/bem-icon";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import L from "leaflet";
import { Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from "react-leaflet";

const CLASSIFICATIONS = [
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

type Classification = (typeof CLASSIFICATIONS)[number];

const CLASSIFICATION_COLORS: Record<(typeof CLASSIFICATIONS)[number], string> = {
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

const CLASSIFICATION_TOOLTIPS: Record<Classification, string> = {
  BEM1: "Espécies comestíveis que claramente ocorrem e são consumidas no Brasil ou que representam um novo recurso alimentar para o país.",
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
};

const BRAZIL_STATE_CENTERS: Record<string, [number, number]> = {
  AC: [-9.02, -70.81],
  AL: [-9.57, -36.78],
  AP: [1.41, -51.77],
  AM: [-3.47, -65.1],
  BA: [-12.97, -38.5],
  CE: [-5.2, -39.53],
  DF: [-15.79, -47.88],
  ES: [-19.19, -40.34],
  GO: [-15.98, -49.86],
  MA: [-5.42, -45.44],
  MT: [-12.64, -55.42],
  MS: [-20.51, -54.54],
  MG: [-18.1, -44.38],
  PA: [-3.79, -52.48],
  PB: [-7.24, -36.78],
  PR: [-24.89, -51.55],
  PE: [-8.38, -37.86],
  PI: [-6.6, -42.28],
  RJ: [-22.25, -42.66],
  RN: [-5.81, -36.59],
  RS: [-30.03, -51.23],
  RO: [-10.83, -63.34],
  RR: [1.99, -61.33],
  SC: [-27.33, -49.44],
  SP: [-22.19, -48.79],
  SE: [-10.57, -37.45],
  TO: [-10.25, -48.25],
};

const BRAZIL_STATE_NAMES: Record<string, string> = {
  AC: "Acre",
  AL: "Alagoas",
  AP: "Amapá",
  AM: "Amazonas",
  BA: "Bahia",
  CE: "Ceará",
  DF: "Distrito Federal",
  ES: "Espírito Santo",
  GO: "Goiás",
  MA: "Maranhão",
  MT: "Mato Grosso",
  MS: "Mato Grosso do Sul",
  MG: "Minas Gerais",
  PA: "Pará",
  PB: "Paraíba",
  PR: "Paraná",
  PE: "Pernambuco",
  PI: "Piauí",
  RJ: "Rio de Janeiro",
  RN: "Rio Grande do Norte",
  RS: "Rio Grande do Sul",
  RO: "Rondônia",
  RR: "Roraima",
  SC: "Santa Catarina",
  SP: "São Paulo",
  SE: "Sergipe",
  TO: "Tocantins",
};

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
  const { t } = useTranslation();
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
    <section className="relative flex min-h-[calc(100svh-85px)] flex-col overflow-hidden bg-[#a8cfd8] md:block md:h-[calc(100vh-85px)] md:min-h-[640px]">
      <MapContainer
        center={[-13.5, -53.2]}
        zoom={4}
        minZoom={3}
        maxZoom={8}
        zoomControl={false}
        scrollWheelZoom
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
                    description={CLASSIFICATION_TOOLTIPS[classification]}
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
