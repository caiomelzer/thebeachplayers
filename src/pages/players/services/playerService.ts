
import { apiClient } from "@/integrations/api/client";

// Cache mechanism to prevent excessive API calls
let playersCache: Record<string, any[]> = {};
let lastFetchTimes: Record<string, number> = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache

export const fetchPlayers = async (modalityId: string, forceRefresh = false) => {
  // Return cached data if available and not expired
  const now = Date.now();
  if (!forceRefresh && playersCache[modalityId] && now - lastFetchTimes[modalityId] < CACHE_TTL) {
    console.log(`Using cached players data for modality: ${modalityId}`);
    return playersCache[modalityId];
  }

  try {
    console.log(`Fetching players from API for modality: ${modalityId}`);
    const response = await apiClient.get(`/api/players/${modalityId}`);
    
    if (!response.data) {
      throw new Error("A resposta da API está vazia.");
    }

    // Cache the response
    playersCache[modalityId] = response.data;
    lastFetchTimes[modalityId] = now;

    return response.data;
  } catch (error) {
    console.error("Error fetching players:", error);
    throw error;
  }
};

// Function to search players by name or nickname
export const searchPlayers = (players: any[], searchTerm: string) => {
  if (!players || players.length === 0 || !searchTerm) return players;
  
  const lowercaseSearchTerm = searchTerm.toLowerCase();
  
  return players.filter(player => 
    player.name.toLowerCase().includes(lowercaseSearchTerm) ||
    player.nickname.toLowerCase().includes(lowercaseSearchTerm)
  );
};
