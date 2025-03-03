
import { apiClient } from "@/integrations/api/client";
import { Arena } from "../types";

// Cache mechanism to prevent excessive API calls
let arenasCache: Arena[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache

export const fetchArenas = async (forceRefresh = false) => {
  // Return cached data if available and not expired
  const now = Date.now();
  if (!forceRefresh && arenasCache && now - lastFetchTime < CACHE_TTL) {
    console.log('Using cached arenas data');
    return arenasCache;
  }

  try {
    console.log('Fetching arenas from API');
    const response = await apiClient.get('/api/arenas');
    
    // Map the response data to match our Arena type
    const arenas = response.data.map((arena: any) => ({
      id: arena.id,
      name: arena.name,
      address: arena.address,
      main_image_url: arena.main_image_url || null,
      coordinates: {
        latitude: arena.latitude || 0,
        longitude: arena.longitude || 0
      }
    }));
    
    // Update cache
    arenasCache = arenas;
    lastFetchTime = now;
    
    return arenas;
  } catch (error) {
    console.error('Error fetching arenas:', error);
    throw error;
  }
};

// Function to fetch arenas near a location
export const fetchNearbyArenas = async (latitude: number, longitude: number, maxDistance = 10) => {
  try {
    // First try to use cached data if available
    if (arenasCache && Date.now() - lastFetchTime < CACHE_TTL) {
      console.log('Filtering nearby arenas from cache');
      return filterNearbyArenasFromCache(latitude, longitude, maxDistance);
    }
    
    // If no cache, fetch from API with params
    console.log('Fetching nearby arenas from API');
    const response = await apiClient.get('/api/arenas', {
      params: {
        latitude,
        longitude,
        maxDistance
      }
    });
    
    return response.data.map((arena: any) => ({
      id: arena.id,
      name: arena.name,
      address: arena.address,
      main_image_url: arena.main_image_url || null,
      coordinates: {
        latitude: arena.latitude || 0,
        longitude: arena.longitude || 0
      }
    }));
  } catch (error) {
    console.error('Error fetching nearby arenas:', error);
    throw error;
  }
};

// Function to search arenas by name or address
export const searchArenas = async (searchTerm: string) => {
  try {
    // First try to use cached data if available
    if (arenasCache && Date.now() - lastFetchTime < CACHE_TTL) {
      console.log('Searching arenas from cache');
      return filterArenasBySearchTerm(searchTerm);
    }
    
    // If no cache, fetch from API with search param
    console.log('Searching arenas from API');
    const response = await apiClient.get('/api/arenas', {
      params: {
        search: searchTerm
      }
    });
    
    return response.data.map((arena: any) => ({
      id: arena.id,
      name: arena.name,
      address: arena.address,
      main_image_url: arena.main_image_url || null,
      coordinates: {
        latitude: arena.latitude || 0,
        longitude: arena.longitude || 0
      }
    }));
  } catch (error) {
    console.error('Error searching arenas:', error);
    throw error;
  }
};

// Helper function to filter nearby arenas from cache
const filterNearbyArenasFromCache = (latitude: number, longitude: number, maxDistance = 10) => {
  if (!arenasCache) return [];
  
  return arenasCache.filter(arena => {
    // Calculate distance using Haversine formula
    const R = 6371; // Earth's radius in km
    const lat1 = latitude * Math.PI / 180;
    const lat2 = arena.coordinates.latitude * Math.PI / 180;
    const deltaLat = (arena.coordinates.latitude - latitude) * Math.PI / 180;
    const deltaLon = (arena.coordinates.longitude - longitude) * Math.PI / 180;

    const a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
             Math.cos(lat1) * Math.cos(lat2) *
             Math.sin(deltaLon/2) * Math.sin(deltaLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return distance < maxDistance;
  });
};

// Helper function to filter arenas by search term from cache
const filterArenasBySearchTerm = (searchTerm: string) => {
  if (!arenasCache) return [];
  
  const lowercaseSearchTerm = searchTerm.toLowerCase();
  return arenasCache.filter(arena => 
    arena.name.toLowerCase().includes(lowercaseSearchTerm) || 
    arena.address.toLowerCase().includes(lowercaseSearchTerm)
  );
};

// Function to get the count of nearby arenas (for Home screen)
export const getNearbyArenasCount = async (latitude: number, longitude: number, maxDistance = 10) => {
  const nearbyArenas = await fetchNearbyArenas(latitude, longitude, maxDistance);
  return nearbyArenas.length;
};
