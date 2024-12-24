"use client";

import { useState } from "react";

import { Agent } from "@/domain/agent";

import { StyledImage } from "./styles";

type AbilitiesProps = { agent: Agent | undefined };

export function Abilities({ agent }: AbilitiesProps) {
  const [abilityIndex, setAbilityIndex] = useState<number>(0);

  return (
    <div
      style={{
        marginTop: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "1rem",
          bottom: "1rem",
          width: "100%",
          justifyContent: "center",
        }}
      >
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
        <h6 style={{ textTransform: "uppercase", marginBottom: "1rem" }}>
          {agent?.abilities[abilityIndex].displayName}
        </h6>
        <p>{agent?.abilities[abilityIndex].description}</p>
      </div>
    </div>
  );
}

export default Abilities;
