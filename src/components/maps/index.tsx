"use client";

import { useEffect } from "react";

import { Map } from "@/domain/map";

import useGetMaps from "./useGetMaps";

import { ListViewMap, ListViewMapImage } from "./styles";

type Props = {
  map: Map | undefined;
  setMap: React.Dispatch<React.SetStateAction<Map | undefined>>;
};

export default function Maps({ map, setMap }: Props) {
  const { maps } = useGetMaps();

  useEffect(() => {
    if (maps.length) {
      setMap(maps[0]);
    }
  }, [maps, setMap]);

  if (!map) {
    return (
      <div className="shadow rounded-md w-full max-h-[500px]">
        <div className="flex-1 animate-pulse">
          <div className="h-[500px] bg-slate-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto">
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
