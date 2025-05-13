
import { apiClient } from "@/integrations/api/client";

// Cache mechanism to prevent excessive API calls
let championshipGamesCache: Record<string, any> = {};
let lastFetchTimes: Record<string, number> = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache

export const fetchChampionshipGames = async (modalityId:string, championshipId: string, forceRefresh = false) => {
  const cacheKey = `games-${championshipId}`;
  const now = Date.now();
  
  // Return cached data if available and not expired
  if (!forceRefresh && championshipGamesCache[cacheKey] && now - lastFetchTimes[cacheKey] < CACHE_TTL) {
    console.log(`Using cached games data for championship ID: ${championshipId}`);
    return championshipGamesCache[cacheKey];
  }
  
  try {
    console.log(`Fetching games for championship ID: ${championshipId}`);
    const response = await apiClient.get(`/api/championships/${modalityId}/${championshipId}/games`);
    console.log("Games API response:", response);
    
    if (!response.data) {
      throw new Error("A resposta da API de jogos está vazia.");
    }
    
    // Cache the response
    championshipGamesCache[cacheKey] = response.data;
    lastFetchTimes[cacheKey] = now;
    
    return response.data;
  } catch (error) {
    console.error("Error fetching championship games:", error);
    throw error;
  }
};
