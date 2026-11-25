"use client";

import { useCallback, useEffect, useState } from "react";

import { Map } from "@/domain/map";

export default function useGetMaps() {
  const [maps, setMaps] = useState<Map[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [requestId, setRequestId] = useState(0);

  const handleFetchMaps = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const URL = "https://valorant-api.com/v1/maps";

      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error("Falha ao buscar mapas");
      }

      const json = await response.json();

      setMaps(Array.isArray(json.data) ? json.data : []);
    } catch {
      setMaps([]);
      setError("Nao foi possivel carregar os mapas.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleFetchMaps();
  }, [handleFetchMaps]);

  const retry = useCallback(() => setRequestId((value) => value + 1), []);

  useEffect(() => {
    if (requestId > 0) {
      handleFetchMaps();
    }
  }, [requestId, handleFetchMaps]);

  return { maps, loading, error, retry };
}
