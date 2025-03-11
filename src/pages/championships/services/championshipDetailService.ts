
import { apiClient } from "@/integrations/api/client";
import { Team } from "@/types/database";

// Cache mechanism to prevent excessive API calls
let championshipDetailCache: Record<string, any> = {};
let lastFetchTimes: Record<string, number> = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache

export const fetchChampionshipDetail = async (id: string, modalityId: string, forceRefresh = false) => {
  // Return cached data if available and not expired
  console.log(`id: ${id}, modalityId: ${modalityId}`);
  const now = Date.now();
  if (!forceRefresh && championshipDetailCache[id] && now - lastFetchTimes[id] < CACHE_TTL) {
    console.log(`Using cached championship detail data for ID: ${id}`);
    return championshipDetailCache[id];
  }
  console.log(`id: ${id}, modalityId: ${modalityId}`);
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

// Cache for teams
let teamsCache: Record<string, Team[]> = {};
let teamsFetchTimes: Record<string, number> = {};

export const fetchChampionshipTeams = async (modalityId: string, championshipId: string, forceRefresh = false) => {
  const cacheKey = `${modalityId}-${championshipId}`;
  const now = Date.now();
  
  // Return cached data if available and not expired
  if (!forceRefresh && teamsCache[cacheKey] && now - teamsFetchTimes[cacheKey] < CACHE_TTL) {
    console.log(`Using cached teams data for championship ID: ${championshipId}`);
    return teamsCache[cacheKey];
  }
  
  try {
    console.log(`Fetching teams for championship ID: ${championshipId}`);
    const response = await apiClient.get(`/api/championships/${modalityId}/${championshipId}/teams`);
    console.log("Teams API response:", response);
    
    if (!response.data) {
      throw new Error("A resposta da API de times está vazia.");
    }
    
    // Cache the response
    teamsCache[cacheKey] = response.data;
    teamsFetchTimes[cacheKey] = now;
    
    return response.data as Team[];
  } catch (error) {
    console.error("Error fetching championship teams:", error);
    throw error;
  }
};
