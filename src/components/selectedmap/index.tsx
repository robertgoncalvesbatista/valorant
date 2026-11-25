"use client";

import Image from "next/image";

import { Map } from "@/domain/map";

type Props = {
  map: Map | undefined;
};

export default function SelectedMap({ map }: Readonly<Props>) {
  if (!map) {
    return (
      <div
        className="h-[220px] animate-pulse rounded-2xl border border-[var(--border)] bg-[var(--surface-raised)]"
        aria-label="Carregando mapa selecionado"
      />
    );
  }

  const description = map.narrativeDescription || map.tacticalDescription;
  const calloutNames = Array.from(
    new Set(map.callouts.map((callout) => callout.regionName).filter(Boolean)),
  ).slice(0, 4);

  return (
    <article className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
      <div className="relative h-[220px] sm:h-[260px]">
        <Image
          priority
          src={map.splash}
          alt={map.displayName}
          width={500}
          height={500}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,9,14,0.96)] via-[rgba(7,9,14,0.22)] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-r from-[rgba(7,9,14,0.82)] to-transparent px-4 pb-4 pt-12">
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.08em] text-[var(--accent)] drop-shadow">
            Mapa selecionado
          </p>
          <h3 className="text-2xl font-bold">{map.displayName}</h3>
        </div>
      </div>
      {(description || calloutNames.length > 0) && (
        <div className="space-y-3 p-4">
          {description && (
            <p className="text-sm leading-6 text-[var(--text-muted)]">
              {description}
            </p>
          )}
          {calloutNames.length > 0 && (
            <div className="flex flex-wrap gap-2" aria-label="Áreas do mapa">
              {calloutNames.map((name) => (
                <span
                  key={name}
                  className="rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-1 text-xs text-[var(--text-muted)]"
                >
                  {name}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  );
}
