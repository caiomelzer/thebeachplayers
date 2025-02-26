
import { Arena } from "../types";

export const calculateDistance = (arena: Arena, userLocation: GeolocationPosition | null): number => {
  if (!userLocation) return Infinity;

  const R = 6371; // Earth's radius in km
  const lat1 = userLocation.coords.latitude * Math.PI / 180;
  const lat2 = arena.coordinates.latitude * Math.PI / 180;
  const deltaLat = (arena.coordinates.latitude - userLocation.coords.latitude) * Math.PI / 180;
  const deltaLon = (arena.coordinates.longitude - userLocation.coords.longitude) * Math.PI / 180;

  const a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
           Math.cos(lat1) * Math.cos(lat2) *
           Math.sin(deltaLon/2) * Math.sin(deltaLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};
