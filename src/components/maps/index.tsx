"use client";

import { useCallback, useEffect, useState } from "react";

import { Map } from "@/domain/map";

import { ListViewMap, ListViewMapImage } from "./styles";

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

type MapsProps = {
  map: Map | undefined;
  setMap: React.Dispatch<React.SetStateAction<Map | undefined>>;
};

export function Maps({ map, setMap }: MapsProps) {
  const { maps } = useGetMaps();

  useEffect(() => {
    if (maps.length) {
      setMap(maps[0]);
    }
  }, [maps, setMap]);

  if (!map) {
    return (
      <div className="shadow rounded-md w-full max-h-[573px]">
        <div className="flex-1 animate-pulse">
          <div className="h-[573px] bg-slate-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 max-h-[573px] overflow-y-auto">
      {maps
        .filter((i) => !!i.coordinates && !!i.xMultiplier)
        .map((i) => {
          return (
            <ListViewMap
              key={i.uuid}
              $name={i.displayName}
              onClick={() => setMap(i)}
            >
              <ListViewMapImage src={i.splash} alt={i.displayName} />
            </ListViewMap>
          );
        })}
    </div>
  );
}

export default Maps;
