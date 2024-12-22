/* eslint-disable @next/next/no-img-element */
"use client";

import { useCallback, useEffect, useState } from "react";

import { Agent } from "@/domain/agent";

import { AgentCard, AgentImage } from "./styles";
import Image from "next/image";

function useGetAgents() {
  const [agents, setAgents] = useState<Agent[]>([]);

  const handleFetchAgents = useCallback(async () => {
    try {
      const URL = "https://valorant-api.com/v1/agents?isPlayableCharacter=true";

      const response = await fetch(URL);
      const json = await response.json();

      setAgents(json.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    handleFetchAgents();
  }, [handleFetchAgents]);

  return { agents, setAgents };
}

export function Agents() {
  const { agents } = useGetAgents();

  return (
    <div className="flex flex-wrap gap-4 overflow-y-auto h-[825px]">
      {agents.map((a) => {
        const [first, seccond, third, fourth] = a.backgroundGradientColors;
        const linear_gradient = `to bottom, #${first}, #${seccond}, #${third}, #${fourth}`;

        return (
          <AgentCard
            key={a.uuid}
            $gradient={linear_gradient}
            $name={a.displayName}
          >
            <div
              className="w-full h-full bg-cover flex justify-center items-center"
              style={{ backgroundImage: `url(${a.background})` }}
            >
              <AgentImage src={a.fullPortrait} alt={a.displayName} />
            </div>

            <div
              style={{
                display: "flex",
                gap: "1rem",
                position: "absolute",
                bottom: "1rem",
                width: "100%",
                justifyContent: "center",
              }}
            >
              {a.abilities.map((s) => {
                if (s.slot === "Passive") {
                  return null;
                }

                return (
                  <Image
                    key={s.slot}
                    src={s.displayIcon}
                    alt={s.displayName}
                    width={30}
                    height={30}
                    style={{
                      width: "30px",
                      height: "30px",
                      objectFit: "cover",
                      filter: "drop-shadow(2px 4px 6px black)",
                    }}
                  />
                );
              })}
            </div>
          </AgentCard>
        );
      })}
    </div>
  );
}

export default Agents;
