/* eslint-disable @next/next/no-img-element */
"use client";

import { useCallback, useEffect, useState } from "react";

import styled from "styled-components";

import { Agent } from "@/domain/agent";
import { Map } from "@/domain/map";

const BackgroundImage = styled.div<{ $url: string }>`
  position: relative;
  z-index: 1;

  &:before {
    content: "";

    position: absolute;
    z-index: -1;

    background-image: url(${(props) => props.$url});
    background-size: cover;

    filter: brightness(0.2);
  }
`;

const ListViewMap = styled.div`
  transition: 0.1s ease-in-out;
  filter: grayscale(1);

  &:hover {
    filter: grayscale(0);
  }
`;

const ListViewMapImage = styled.img`
  width: 420px;
  height: 100px;
  object-fit: cover;

  &:hover {
    border: 2px solid #ff4654;
  }
`;

const AgentCard = styled.div<{ $gradient: string; $name: string }>`
  filter: grayscale(1);
  transition: 0.2s ease-in-out;

  width: 235px;
  height: 343px;

  background-image: linear-gradient(${(props) => props.$gradient});

  &:hover {
    filter: grayscale(0);
    border: 2px solid #ff4654;

    &:after {
      content: "${(props) => props.$name}";
      filter: drop-shadow(2px 4px 6px black);
      text-transform: uppercase;
      position: absolute;
      font-size: 32px;
      bottom: 12px;
      left: 12px;
    }
  }
`;

const AgentImage = styled.img`
  filter: drop-shadow(2px 4px 6px black);
  transition: 0.2s ease-in-out;

  max-width: -webkit-fill-available;
  height: 254px;
  object-fit: cover;

  &:hover {
    filter: drop-shadow(2px 4px 6px black);
    scale: 1.2;
  }
`;

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

function Agents() {
  const { agents } = useGetAgents();

  return (
    <div className="flex flex-wrap gap-4 overflow-y-auto h-[847px]">
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
          </AgentCard>
        );
      })}
    </div>
  );
}

function useGetMaps() {
  const [maps, setMaps] = useState<Map[]>([]);

  const handleFetchMaps = useCallback(async () => {
    try {
      const URL = "https://valorant-api.com/v1/maps";

      const response = await fetch(URL);
      const json = await response.json();

      setMaps(json.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    handleFetchMaps();
  }, [handleFetchMaps]);

  return { maps, setMaps };
}

export default function Home() {
  const [map, setMap] = useState<Map>();

  const { maps } = useGetMaps();

  return (
    <BackgroundImage
      className="flex justify-center items-center w-full h-screen before:w-full before:h-full before:top-0 before:left-0"
      $url={map?.splash ?? maps[0]?.splash}
    >
      <div className="flex gap-8 p-4">
        <div>
          <h1 className="text-2xl">MAPAS</h1>

          <div className="w-full flex flex-col">
            <div className="mb-4 h-[236px] w-[420px]">
              <img
                className="brightness-50"
                src={map?.splash ?? maps[0]?.splash}
                alt={map?.displayIcon}
              />

              <h1 className="relative bottom-16 left-4 text-2xl uppercase">
                {map?.displayName ?? maps[0]?.displayName}
              </h1>

              <h1 className="relative bottom-16 left-4 text-zinc-500 text-xs">
                UNRATED
              </h1>
            </div>

            <div className="flex flex-col gap-2 max-h-[595px] overflow-y-auto">
              {maps
                .filter((i) => !!i.coordinates && !!i.xMultiplier)
                .map((i) => {
                  return (
                    <ListViewMap key={i.uuid} onClick={() => setMap(i)}>
                      <ListViewMapImage src={i.splash} alt={i.displayName} />
                    </ListViewMap>
                  );
                })}
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-2xl">PERSONAGENS</h1>

          <Agents />
        </div>
      </div>
    </BackgroundImage>
  );
}
