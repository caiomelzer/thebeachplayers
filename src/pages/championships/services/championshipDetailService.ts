
import { apiClient } from "@/integrations/api/client";

// Cache mechanism to prevent excessive API calls
let championshipDetailCache: Record<string, any> = {};
let lastFetchTimes: Record<string, number> = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache

export const fetchChampionshipDetail = async (id: string, modalityId: string, forceRefresh = false) => {
  // Return cached data if available and not expired
  const now = Date.now();
  if (!forceRefresh && championshipDetailCache[id] && now - lastFetchTimes[id] < CACHE_TTL) {
    console.log(`Using cached championship detail data for ID: ${id}`);
    return championshipDetailCache[id];
  }

  try {
    console.log(`Fetching championship detail from API for ID: ${id}`);
    const response = await apiClient.get(`/api/championships/${modalityId}/${id}`);
    console.log("Resposta completa da API:", response);
    if (!response.data) {
      throw new Error("A resposta da API está vazia.");
    }

    // Cache the response
    championshipDetailCache[id] = response.data;
    lastFetchTimes[id] = now;

    return response.data;
  } catch (error) {
    console.error("Error fetching championship detail:", error);
    throw error;
  }
};
