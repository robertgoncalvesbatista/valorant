"use client";

import { useState } from "react";

import { Agent } from "@/domain/agent";

import { StyledImage } from "./styles";

type Props = {
  agent: Agent | undefined;
};

export default function Abilities({ agent }: Readonly<Props>) {
  const [abilityIndex, setAbilityIndex] = useState<number>(0);

  return (
    <div className="flex flex-col mt-6 gap-8">
      <div className="flex gap-4 bottom-4 w-full justify-center">
        {agent?.abilities.map((s, i) => {
          if (s.slot === "Passive") {
            return null;
          }

          return (
            <StyledImage
              key={s.slot}
              src={s.displayIcon}
              alt={s.displayName}
              onClick={() => setAbilityIndex(i)}
            />
          );
        })}
      </div>

      <div>
        <h6 className="uppercase mb-4">
          {agent?.abilities[abilityIndex].displayName}
        </h6>

        <p>{agent?.abilities[abilityIndex].description}</p>
      </div>
    </div>
  );
}
