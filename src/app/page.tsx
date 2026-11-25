"use client";

import Image from "next/image";
import { useState } from "react";

import Abilities from "@/components/abilities";
import Agents from "@/components/agents";
import Maps from "@/components/maps";
import Modal from "@/components/modal";
import SelectedMap from "@/components/selectedmap";

import { Map } from "@/domain/map";
import { Agent } from "@/domain/agent";

import ImageLogo from "@/assets/logo.png";

import { AgentPortrait, AgentPortraitImage, BackgroundImage, ModalContainer } from "./styles";

export default function Home() {
  const [open, setOpen] = useState<boolean>(false);
  const [agent, setAgent] = useState<Agent>();

  const [map, setMap] = useState<Map>();
  const roleNames: Record<string, string> = {
    Controller: "Controlador",
    Duelist: "Duelista",
    Initiator: "Iniciador",
    Sentinel: "Sentinela",
  };

  return (
    <>
      <BackgroundImage
        $url={map?.splash ?? ""}
      >
        <div className="mx-auto min-h-screen w-full max-w-[1280px] px-4 py-6 sm:px-6 lg:px-8">
          <header className="mb-6 flex items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
            <div className="flex items-center gap-3">
              <Image
                src={ImageLogo}
                alt="Valorant"
                priority
                width={72}
                height={72}
                className="h-12 w-12 object-contain"
              />
              <div>
                <p className="text-sm text-[var(--text-muted)]">VALORANT</p>
                <h1 className="text-2xl font-bold leading-tight">Explorar o jogo</h1>
              </div>
            </div>
          </header>

          <main className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <section
              className="min-w-0 lg:col-span-4"
              aria-labelledby="mapas-heading"
            >
              <h2 id="mapas-heading" className="mb-3 text-xl font-bold">
                Mapas
              </h2>
              <div className="grid gap-3">
                <SelectedMap map={map} />
                <Maps map={map} setMap={setMap} />
              </div>
            </section>

            <section
              className="min-w-0 lg:col-span-8"
              aria-labelledby="personagens-heading"
            >
              <h2 id="personagens-heading" className="mb-3 text-xl font-bold">
                Personagens
              </h2>
              <Agents setOpen={setOpen} setAgent={setAgent} />
            </section>
          </main>
        </div>
      </BackgroundImage>

      <Modal
        open={open}
        setOpen={setOpen}
        backgroundGradientColors={
          agent?.backgroundGradientColors ?? ["", "", "", ""]
        }
      >
        <ModalContainer>
          {agent && (
            <AgentPortrait>
              {agent.background && (
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${agent.background})` }}
                  aria-hidden="true"
                />
              )}
              <AgentPortraitImage
                src={agent.fullPortrait ?? agent.bustPortrait}
                alt={`Retrato de ${agent.displayName}`}
              />
              <div className="absolute bottom-4 left-4 z-10">
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--accent)]">
                  {roleNames[agent.role?.displayName] ?? agent.role?.displayName ?? "Agente"}
                </p>
                <h2 className="text-2xl font-bold">{agent.displayName}</h2>
              </div>
            </AgentPortrait>
          )}
          {agent && (
            <div className="flex min-w-0 flex-1 flex-col gap-5">
              {(agent.description || agent.role?.description) && (
                <section aria-label={`Sobre ${agent.displayName}`}>
                  {agent.description && (
                    <p className="text-sm leading-6 text-[var(--text-muted)]">
                      {agent.description}
                    </p>
                  )}
                  {agent.role?.description && (
                    <p className="mt-3 border-l-2 border-[var(--primary)] pl-3 text-sm leading-6 text-[var(--text-muted)]">
                      {agent.role.description}
                    </p>
                  )}
                </section>
              )}
              <Abilities agent={agent} />
            </div>
          )}
        </ModalContainer>
      </Modal>
    </>
  );
}
