
import { apiClient } from "@/integrations/api/client";

// Cache mechanism to prevent excessive API calls
let arenaDetailCache: Record<string, any> = {};
let lastFetchTimes: Record<string, number> = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache

export const fetchArenaDetail = async (id: string, forceRefresh = false) => {
  // Return cached data if available and not expired
  const now = Date.now();
  if (!forceRefresh && arenaDetailCache[id] && now - lastFetchTimes[id] < CACHE_TTL) {
    console.log(`Using cached arena detail data for ID: ${id}`);
    return arenaDetailCache[id];
  }

  try {
    console.log(`Fetching arena detail from API for ID: ${id}`);
    const response = await apiClient.get(`/api/arenas/${id}`);
    
    if (!response.data) {
      throw new Error("A resposta da API está vazia.");
    }

    // Cache the response
    arenaDetailCache[id] = response.data[0];
    lastFetchTimes[id] = now;

    return response.data[0];
  } catch (error) {
    console.error("Error fetching arena detail:", error);
    throw error;
  }
};
