
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { ArenaHeader } from "./arenas/components/ArenaHeader";
import { ArenaSearchBar } from "./arenas/components/ArenaSearchBar";
import { ArenaFilters } from "./arenas/components/ArenaFilters";
import { ArenaCard } from "./arenas/components/ArenaCard";
import { fetchArenas, fetchNearbyArenas, searchArenas } from "./arenas/services/arenaService";
import { calculateDistance } from "./arenas/utils/distance";
import type { ArenaWithDistance } from "./arenas/types";

const Arenas = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<'all' | 'near'>('all');
  const [searchTerm, setSearchTerm] = useState("");
  const [userLocation, setUserLocation] = useState<GeolocationPosition | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Base query for all arenas
  const { data: allArenas = [], isLoading: isLoadingAll, error: errorAll } = useQuery({
    queryKey: ['arenas'],
    queryFn: fetchArenas,
    enabled: activeFilter === 'all' && !isSearching
  });

  // Query for nearby arenas
  const { data: nearbyArenas = [], isLoading: isLoadingNearby, error: errorNearby } = useQuery({
    queryKey: ['arenas', 'nearby', userLocation?.coords.latitude, userLocation?.coords.longitude],
    queryFn: () => userLocation 
      ? fetchNearbyArenas(userLocation.coords.latitude, userLocation.coords.longitude)
      : Promise.resolve([]),
    enabled: activeFilter === 'near' && !!userLocation && !isSearching
  });

  // Query for searched arenas
  const { data: searchResults = [], isLoading: isLoadingSearch, error: errorSearch } = useQuery({
    queryKey: ['arenas', 'search', searchTerm],
    queryFn: () => searchArenas(searchTerm),
    enabled: !!searchTerm && searchTerm.length >= 2 && isSearching
  });

  // Get user location
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(position);
        },
        (error) => {
          console.error('Error getting location:', error);
          toast.error("Não foi possível obter sua localização");
        }
      );
    }
  }, []);

  // Handle search input changes
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setIsSearching(value.length >= 2);
  };

  // Determine which arenas to display
  const getDisplayedArenas = () => {
    if (isSearching && searchTerm.length >= 2) {
      return searchResults;
    }
    
    if (activeFilter === 'near') {
      return nearbyArenas;
    }
    
    return allArenas;
  };

  // Add distance information to the arenas
  const arenasWithDistance: ArenaWithDistance[] = getDisplayedArenas().map(arena => ({
    ...arena,
    distance: calculateDistance(arena, userLocation)
  }));

  // Sort nearby arenas by distance
  const filteredArenas = activeFilter === 'near' 
    ? [...arenasWithDistance].sort((a, b) => a.distance - b.distance)
    : arenasWithDistance;

  // Handle errors
  useEffect(() => {
    if (errorAll || errorNearby || errorSearch) {
      toast.error("Erro ao carregar as arenas");
      console.error("Arena error:", errorAll || errorNearby || errorSearch);
    }
  }, [errorAll, errorNearby, errorSearch]);

  const isLoading = (isLoadingAll && activeFilter === 'all') || 
                    (isLoadingNearby && activeFilter === 'near') || 
                    (isLoadingSearch && isSearching);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-6">
        <ArenaHeader onBackClick={() => navigate('/home')} />
        <ArenaSearchBar 
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
        <ArenaFilters 
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {isLoading && (
          <div className="text-center py-8 text-zinc-400">
            Carregando arenas...
          </div>
        )}

        {!isLoading && filteredArenas.length === 0 && (
          <div className="text-center py-8 text-zinc-400">
            Nenhuma arena encontrada
          </div>
        )}

        <div className="space-y-4">
          {filteredArenas.map((arena) => (
            <ArenaCard
              key={arena.id}
              arena={arena}
              activeFilter={activeFilter}
              onClick={(id) => navigate(`/arena/${id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Arenas;
