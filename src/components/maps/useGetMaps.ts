"use client";

import { useCallback, useEffect, useState } from "react";

import { Map } from "@/domain/map";

export function useGetMaps() {
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
