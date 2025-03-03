
import { apiClient } from "@/integrations/api/client";
import { Arena } from "../types";

export const fetchArenas = async () => {
  try {
    const response = await apiClient.get('/api/arenas');
    
    console.log('Arena API response:', response.data);
    
    // Map the response data to match our Arena type
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
    console.error('Error fetching arenas:', error);
    throw error;
  }
};

// Function to fetch arenas near a location
export const fetchNearbyArenas = async (latitude: number, longitude: number, maxDistance = 10) => {
  try {
    // Add query parameters for nearby arenas
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
