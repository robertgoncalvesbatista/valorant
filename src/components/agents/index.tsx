"use client";

import Image from "next/image";

import { Agent } from "@/domain/agent";

import { useGetAgents } from "./useGetAgents";

import { AgentCard, AgentImage } from "./styles";

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAgent: React.Dispatch<React.SetStateAction<Agent | undefined>>;
};

export function Agents({ setOpen, setAgent }: Props) {
  const { agents } = useGetAgents();

  if (agents.length === 0) {
    return (
      <div className="flex flex-wrap gap-4 overflow-y-auto h-[825px]">
        {Array(15)
          .fill(0)
          .map((_, key) => {
            return (
              <div key={key} className="flex-1 shadow rounded-md animate-pulse">
                <div className="w-[235px] h-[343px] bg-slate-700 rounded"></div>
              </div>
            );
          })}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4 overflow-y-auto h-[825px] justify-center md:justify-normal">
      {agents.map((a) => {
        const [first, seccond, third, fourth] = a.backgroundGradientColors;
        const linear_gradient = `to bottom, #${first}, #${seccond}, #${third}, #${fourth}`;

        return (
          <AgentCard
            key={a.uuid}
            $gradient={linear_gradient}
            $name={a.displayName}
            onClick={() => {
              setOpen(true);
              setAgent(a);
            }}
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
