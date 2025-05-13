
import { apiClient } from "@/integrations/api/client";

// Cache mechanism to prevent excessive API calls
let groupsCache: Record<string, any> = {};
let lastFetchTimes: Record<string, number> = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache

export const fetchChampionshipGroups = async (modalityId: string, championshipId: string, forceRefresh = false) => {
  const cacheKey = `${modalityId}-${championshipId}`;
  const now = Date.now();
  
  // Return cached data if available and not expired
  if (!forceRefresh && groupsCache[cacheKey] && now - lastFetchTimes[cacheKey] < CACHE_TTL) {
    console.log(`Using cached groups data for championship ID: ${championshipId}`);
    return groupsCache[cacheKey];
  }
  
  try {
    console.log(`Fetching groups for championship ID: ${championshipId}`);
    const response = await apiClient.get(`/api/championships/${modalityId}/${championshipId}/groups`);
    console.log("Groups API response:", response);
    
    if (!response.data) {
      throw new Error("A resposta da API de grupos está vazia.");
    }
    
    // Cache the response
    groupsCache[cacheKey] = response.data;
    lastFetchTimes[cacheKey] = now;
    
    return response.data;
  } catch (error) {
    console.error("Error fetching championship groups:", error);
    throw error;
  }
};
