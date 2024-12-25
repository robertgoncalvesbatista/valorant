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

import { AgentImage, BackgroundImage, ModalContainer } from "./styles";

export default function Home() {
  const [open, setOpen] = useState<boolean>(false);
  const [agent, setAgent] = useState<Agent>();

  const [map, setMap] = useState<Map>();

  return (
    <>
      <BackgroundImage
        className="flex justify-center items-center w-full before:w-full before:h-full before:top-0 before:left-0"
        $url={map?.splash ?? ""}
      >
        <div className="flex flex-col items-center p-4 min-h-screen">
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
              <h1 className="text-2xl text-center">MAPAS</h1>

              <div className="w-full flex flex-col items-center">
                <SelectedMap map={map} />

                <Maps map={map} setMap={setMap} />
              </div>
            </div>

            <div>
              <h1 className="text-2xl text-center">PERSONAGENS</h1>

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
          <div className="w-[235px] h-[343px]">
            <div
              className="w-full h-full bg-cover flex justify-center items-center"
              style={{ backgroundImage: `url(${agent?.background})` }}
            >
              <AgentImage src={agent?.fullPortrait} alt={agent?.displayName} />
            </div>
          </div>

          <Abilities agent={agent} />
        </ModalContainer>
      </Modal>
    </>
  );
}
