"use client";

import { useEffect, useState } from "react";

import { Agent } from "@/domain/agent";

import { StyledImage } from "./styles";

type Props = {
  agent: Agent | undefined;
};

export default function Abilities({ agent }: Readonly<Props>) {
  const [abilityIndex, setAbilityIndex] = useState<number>(0);
  const abilities = agent?.abilities ?? [];

  useEffect(() => {
    setAbilityIndex(0);
  }, [agent?.uuid]);

  if (!agent) {
    return null;
  }

  const selectedAbility = abilities[abilityIndex] ?? abilities[0];
  const cleanDescription = selectedAbility?.description
    .replace(/<[^>]+>/g, "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-6">
      <div className="flex items-center gap-3" role="tablist" aria-label="Habilidades">
        {abilities.map((ability, index) => {
          return (
            <button
              key={ability.slot}
              type="button"
              role="tab"
              aria-selected={abilityIndex === index}
              aria-controls="ability-description"
              aria-label={ability.displayName}
              onClick={() => setAbilityIndex(index)}
              className="flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] p-2 transition hover:border-[var(--primary)] aria-selected:border-[var(--primary)] aria-selected:bg-[var(--primary-soft)]"
            >
              <StyledImage
                src={ability.displayIcon}
                alt=""
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>

      <div
        id="ability-description"
        role="tabpanel"
        aria-live="polite"
        className="rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-4"
      >
        <h3 className="mb-2 text-lg font-bold">{selectedAbility?.displayName}</h3>
        <p className="text-sm leading-6 text-[var(--text-muted)]">
          {cleanDescription}
        </p>
      </div>
    </div>
  );
}
