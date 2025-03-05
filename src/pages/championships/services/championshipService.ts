
import { apiClient } from "@/integrations/api/client";

// Cache mechanism to prevent excessive API calls
let championshipsCache: any[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache

export const fetchChampionships = async (modalityId?: string, forceRefresh = false) => {
  // Return cached data if available and not expired
  console.log('modalityId:', modalityId);
  const now = Date.now();
  if (!forceRefresh && championshipsCache && now - lastFetchTime < CACHE_TTL) {
    console.log('Using cached championships data');
    return championshipsCache;
  }

  try {
    console.log("Fetching championships from API");
    const response = await apiClient.get("/api/championships/" + modalityId);
    
    if (!response.data) {
      throw new Error("A resposta da API está vazia.");
    }

    championshipsCache = response.data;
    lastFetchTime = now;

    return response.data;
  } catch (error) {
    console.error("Error fetching championships:", error);
    throw error;
  }
};

// Function to search championships by title
export const searchChampionships = (championships: any[], searchTerm: string) => {
  if (!championships || championships.length === 0 || !searchTerm) return championships;
  
  const lowercaseSearchTerm = searchTerm.toLowerCase();
  
  return championships.filter(championship => 
    championship.title.toLowerCase().includes(lowercaseSearchTerm)
  );
};
