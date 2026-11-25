"use client";

import Image from "next/image";

import { Agent } from "@/domain/agent";

import useGetAgents from "./useGetAgents";

import { AgentGrid, AgentCard, AgentImage, AgentName } from "./styles";

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAgent: React.Dispatch<React.SetStateAction<Agent | undefined>>;
};

export default function Agents({ setOpen, setAgent }: Props) {
  const { agents, loading, error, retry } = useGetAgents();
  const roleNames: Record<string, string> = {
    Controller: "Controlador",
    Duelist: "Duelista",
    Initiator: "Iniciador",
    Sentinel: "Sentinela",
  };

  if (loading) {
    return (
      <AgentGrid aria-label="Carregando personagens">
        {Array(15)
          .fill(0)
          .map((_, key) => {
            return (
              <div
                key={key}
                className="h-[280px] animate-pulse rounded-2xl border border-[var(--border)] bg-[var(--surface-raised)]"
                aria-hidden="true"
              />
            );
          })}
      </AgentGrid>
    );
  }

  if (error) {
    return (
      <div
        className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"
        role="alert"
      >
        <p className="mb-4 text-[var(--text-muted)]">{error}</p>
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

  if (!agents.length) {
    return (
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <p className="text-[var(--text-muted)]">
          Nenhum personagem esta disponivel no momento.
        </p>
      </div>
    );
  }

  return (
    <AgentGrid>
      {agents.map((a) => {
        const [first, seccond, third, fourth] = a.backgroundGradientColors;
        const gradientColors = [first, seccond, third, fourth]
          .filter(Boolean)
          .map((color) => `#${color}`);
        const linear_gradient =
          gradientColors.length >= 2
            ? `135deg, ${gradientColors.join(", ")}`
            : "135deg, #202736, #111620";

        return (
          <AgentCard
            key={a.uuid}
            type="button"
            $gradient={linear_gradient}
            onClick={() => {
              setOpen(true);
              setAgent(a);
            }}
            aria-label={`Ver detalhes de ${a.displayName}`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${a.background})` }}
              aria-hidden="true"
            />
            <AgentImage
              src={a.fullPortrait}
              alt=""
              aria-hidden="true"
            />
            <div className="absolute bottom-3 left-3 right-3 z-10">
              <AgentName>
                <span>{a.displayName}</span>
                {a.role && (
                  <small>{roleNames[a.role.displayName] ?? a.role.displayName}</small>
                )}
              </AgentName>
              <div className="mt-2 flex justify-end gap-2" aria-hidden="true">
                {a.abilities.filter((s) => s.slot !== "Passive").slice(0, 3).map((s) => {
                if (s.slot === "Passive") {
                  return null;
                }
                  return (
                    <Image
                      key={s.slot}
                      src={s.displayIcon}
                      alt=""
                      width={24}
                      height={24}
                      className="h-6 w-6 object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                    />
                  );
                })}
              </div>
            </div>
          </AgentCard>
        );
      })}
    </AgentGrid>
  );
}
