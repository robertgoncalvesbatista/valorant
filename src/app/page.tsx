/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import { useState } from "react";

import Abilities from "@/components/abilities";
import Agents from "@/components/agents";
import Maps from "@/components/maps";
import Modal from "@/components/modal";

import { Map } from "@/domain/map";
import { Agent } from "@/domain/agent";

import ImageLogo from "@/assets/logo.png";

import {
  AgentCard,
  AgentImage,
  BackgroundImage,
  ModalContainer,
} from "./styles";

type SelectedMapProps = { map: Map | undefined };

function SelectedMap({ map }: SelectedMapProps) {
  if (!map) {
    return (
      <div className="shadow rounded-md w-[420px] h-[236px] mb-4">
        <div className="flex-1 animate-pulse">
          <div className="h-[236px] bg-slate-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4 h-[236px] w-[420px]">
      <Image
        priority
        src={map.splash}
        alt={map.displayName}
        width={500}
        height={500}
        className="brightness-50"
        style={{ border: "2px solid #ff4654" }}
      />

      <h1 className="relative bottom-16 left-4 text-2xl uppercase">
        {map.displayName}
      </h1>
    </div>
  );
}

function Home() {
  const [open, setOpen] = useState<boolean>(false);
  const [agent, setAgent] = useState<Agent>();

  const [map, setMap] = useState<Map>();

  return (
    <>
      <BackgroundImage
        className="flex justify-center items-center w-full before:w-full before:h-full before:top-0 before:left-0"
        $url={map?.splash ?? ""}
      >
        <div className="flex flex-col items-center p-4">
          <Image
            src={ImageLogo}
            alt=""
            priority
            width={300}
            height={300}
            className="mb-2"
          />

          <div className="flex flex-col gap-8 md:flex-row">
            <div>
              <h1 className="text-2xl text-center md:text-left">MAPAS</h1>

              <div className="w-full flex flex-col items-center">
                <SelectedMap map={map} />

                <Maps map={map} setMap={setMap} />
              </div>
            </div>

            <div>
              <h1 className="text-2xl text-center md:text-left">PERSONAGENS</h1>

              <Agents setOpen={setOpen} setAgent={setAgent} />
            </div>
          </div>
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
          <AgentCard key={agent?.uuid} $name={agent?.displayName ?? "john doe"}>
            <div
              className="w-full h-full bg-cover flex justify-center items-center"
              style={{ backgroundImage: `url(${agent?.background})` }}
            >
              <AgentImage src={agent?.fullPortrait} alt={agent?.displayName} />
            </div>
          </AgentCard>

          <Abilities agent={agent} />
        </ModalContainer>
      </Modal>
    </>
  );
}

export default Home;
