"use client";

import { useCallback, useEffect, useState } from "react";

import { Agent } from "@/domain/agent";

export function useGetAgents() {
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
