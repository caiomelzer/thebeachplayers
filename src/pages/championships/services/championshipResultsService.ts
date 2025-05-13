
import { apiClient } from "@/integrations/api/client";

// Cache mechanism to prevent excessive API calls
let championshipResultsCache: Record<string, any> = {};
let lastFetchTimes: Record<string, number> = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache

export const fetchChampionshipResults = async (championshipId: string, forceRefresh = false) => {
  const cacheKey = `results-${championshipId}`;
  const now = Date.now();
  
  // Return cached data if available and not expired
  if (!forceRefresh && championshipResultsCache[cacheKey] && now - lastFetchTimes[cacheKey] < CACHE_TTL) {
    console.log(`Using cached results data for championship ID: ${championshipId}`);
    return championshipResultsCache[cacheKey];
  }
  
  try {
    console.log(`Fetching results for championship ID: ${championshipId}`);
    const response = await apiClient.get(`/api/championship/${championshipId}/results`);
    console.log("Results API response:", response);
    
    if (!response.data) {
      throw new Error("A resposta da API de resultados está vazia.");
    }
    
    // Cache the response
    championshipResultsCache[cacheKey] = response.data;
    lastFetchTimes[cacheKey] = now;
    
    return response.data;
  } catch (error) {
    console.error("Error fetching championship results:", error);
    throw error;
  }
};
