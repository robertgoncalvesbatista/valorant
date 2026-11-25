"use client";

import { useCallback, useEffect, useState } from "react";

import { Agent } from "@/domain/agent";

export default function useGetAgents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [requestId, setRequestId] = useState(0);

  const handleFetchAgents = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const URL = "https://valorant-api.com/v1/agents?isPlayableCharacter=true";

      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error("Falha ao buscar agentes");
      }

      const json = await response.json();

      setAgents(Array.isArray(json.data) ? json.data : []);
    } catch {
      setAgents([]);
      setError("Nao foi possivel carregar os agentes.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleFetchAgents();
  }, [handleFetchAgents]);

  const retry = useCallback(() => setRequestId((value) => value + 1), []);

  useEffect(() => {
    if (requestId > 0) {
      handleFetchAgents();
    }
  }, [requestId, handleFetchAgents]);

  return { agents, loading, error, retry };
}
