/* eslint-disable @next/next/no-img-element */
"use client";

import { useCallback, useEffect, useState } from "react";

import "@/assets/main.css";

import { Agent } from "@/domain/agent";
import { Map } from "@/domain/map";

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
    <div className="flex flex-wrap gap-4">
      {agents.map((a) => (
        <div
          key={a.uuid}
          className="card-image"
          style={{
            borderRadius: "8px",
            width: "235px",
            height: "343px",
            backgroundImage: `linear-gradient(to bottom, #${a.backgroundGradientColors[0]}, #${a.backgroundGradientColors[1]}, #${a.backgroundGradientColors[2]}, #${a.backgroundGradientColors[3]})`,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundImage: `url(${a.background})`,
              backgroundSize: "cover",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={a.fullPortrait}
              alt={a.displayName}
              className="character-image"
              style={{
                maxWidth: "-webkit-fill-available",
                height: "254px",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      ))}
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

  const { maps, setMaps } = useGetMaps();

  return (
    <div
      className="flex gap-8 p-4"
      style={{
        backgroundImage: `url(${map?.splash ?? maps[0]?.splash})`,
      }}
    >
      <div style={{ maxWidth: "300px" }}>
        <h1 style={{ fontSize: "24px" }}>MAPAS</h1>

        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <div>
            <img
              src={map?.splash ?? maps[0]?.splash}
              alt=""
              style={{ filter: "brightness(0.5)" }}
            />

            <h1
              style={{
                position: "relative",
                bottom: "60px",
                left: "15px",
                textTransform: "uppercase",
                fontSize: "24px",
              }}
            >
              {map?.displayName ?? maps[0]?.displayName}
            </h1>

            <h1
              style={{
                position: "relative",
                bottom: "64px",
                left: "15px",
                fontSize: "10px",
                color: "#ffffff80",
              }}
            >
              UNRATED
            </h1>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {maps
              .filter((i) => !!i.coordinates && !!i.xMultiplier)
              .map((i) => {
                return (
                  <div key={i.uuid}>
                    <img src={i.listViewIcon} alt="" />
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <div>
        <h1 style={{ fontSize: "24px" }}>PERSONAGENS</h1>

        <Agents />
      </div>
    </div>
  );
}
