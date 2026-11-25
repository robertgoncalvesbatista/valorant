"use client";

import { useEffect } from "react";

import { Map } from "@/domain/map";

import useGetMaps from "./useGetMaps";

import { MapList, MapOption, MapOptionImage } from "./styles";

type Props = {
  map: Map | undefined;
  setMap: React.Dispatch<React.SetStateAction<Map | undefined>>;
};

export default function Maps({ map, setMap }: Props) {
  const { maps, loading, error, retry } = useGetMaps();
  const playableMaps = maps.filter((item) => !!item.coordinates && !!item.xMultiplier);

  useEffect(() => {
    if (!map && playableMaps.length) {
      setMap(playableMaps[0]);
    }
  }, [map, playableMaps, setMap]);

  if (loading) {
    return (
      <MapList aria-label="Carregando mapas">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-20 animate-pulse rounded-xl border border-[var(--border)] bg-[var(--surface-raised)]"
            aria-hidden="true"
          />
        ))}
      </MapList>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4" role="alert">
        <p className="mb-3 text-sm text-[var(--text-muted)]">{error}</p>
        <button
          type="button"
          onClick={retry}
          className="min-h-11 rounded-lg bg-[var(--primary)] px-4 py-2 font-bold text-[#0b0d12]"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  if (!playableMaps.length) {
    return (
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
        <p className="text-sm text-[var(--text-muted)]">
          Nenhum mapa esta disponivel no momento.
        </p>
      </div>
    );
  }

  return (
    <MapList aria-label="Escolher mapa">
      {playableMaps.map((item) => {
        const selected = map?.uuid === item.uuid;

          return (
            <MapOption
              key={item.uuid}
              type="button"
              $selected={selected}
              aria-pressed={selected}
              onClick={() => setMap(item)}
            >
              <MapOptionImage src={item.splash} alt="" />
              <span>{item.displayName}</span>
              {selected && <span aria-hidden="true">Selecionado</span>}
            </MapOption>
          );
        })}
    </MapList>
  );
}
