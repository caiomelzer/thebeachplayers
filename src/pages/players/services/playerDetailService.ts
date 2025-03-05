
import { apiClient } from "@/integrations/api/client";

// Cache mechanism to prevent excessive API calls
let playerDetailCache: Record<string, any> = {};
let lastFetchTimes: Record<string, number> = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache

export const fetchPlayerDetail = async (modalityId: string, playerId: string, forceRefresh = false) => {
  const cacheKey = `${modalityId}_${playerId}`;
  
  // Return cached data if available and not expired
  const now = Date.now();
  if (!forceRefresh && playerDetailCache[cacheKey] && now - lastFetchTimes[cacheKey] < CACHE_TTL) {
    console.log(`Using cached player detail data for ID: ${playerId} and modality: ${modalityId}`);
    return playerDetailCache[cacheKey];
  }

  try {
    console.log(`Fetching player detail from API for ID: ${playerId} and modality: ${modalityId}`);
    const response = await apiClient.get(`/api/players/${modalityId}/${playerId}`);
    
    if (!response.data) {
      throw new Error("A resposta da API está vazia.");
    }

    // Cache the response
    playerDetailCache[cacheKey] = response.data;
    lastFetchTimes[cacheKey] = now;

    return response.data;
  } catch (error) {
    console.error("Error fetching player detail:", error);
    throw error;
  }
};
