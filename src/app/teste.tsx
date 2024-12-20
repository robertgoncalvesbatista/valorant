/* eslint-disable @next/next/no-img-element */
"use client";

import { useCallback, useEffect, useState } from "react";

function useGetAgents() {
  const [agents, setAgents] = useState<any[]>([]);

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

function AbilitiesAgent(agent: any) {
  const [index, setIndex] = useState(0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        {agent.agent.abilities.map((ability: any, index: number) => {
          return (
            <div
              key={agent.agent.uuid + "-ability-" + ability.slot}
              onClick={() => setIndex(index)}
            >
              <img src={ability.displayIcon} alt="" />
            </div>
          );
        })}
      </div>

      <p>{agent.agent.abilities[index].displayName}</p>
      <p>{agent.agent.abilities[index].description}</p>
    </div>
  );
}

export default function Home() {
  const { agents } = useGetAgents();

  return (
    <div className="mx-auto max-w-6xl">
      {agents.map((agent) => {
        return (
          <div
            key={agent.uuid}
            className="h-screen appear-animation flex justify-center items-center"
          >
            <div className="grid grid-cols-4 gap-2 items-center">
              <div className="text-base/7 text-slate-200 col-span-1">
                <p>{agent.displayName}</p>
                <p className="mt-4">{agent.description}</p>
              </div>

              <div className="col-span-1 card">
                <img src={agent.bustPortrait} alt="imagem" />
              </div>

              <div className="text-base/7 text-slate-200 col-span-2">
                <AbilitiesAgent agent={agent} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
