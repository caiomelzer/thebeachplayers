
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { ArenaHeader } from "./arenas/components/ArenaHeader";
import { ArenaSearchBar } from "./arenas/components/ArenaSearchBar";
import { ArenaFilters } from "./arenas/components/ArenaFilters";
import { ArenaCard } from "./arenas/components/ArenaCard";
import { fetchArenas } from "./arenas/services/arenaService";
import { calculateDistance } from "./arenas/utils/distance";
import type { ArenaWithDistance } from "./arenas/types";

const Arenas = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<'all' | 'near'>('all');
  const [searchTerm, setSearchTerm] = useState("");
  const [userLocation, setUserLocation] = useState<GeolocationPosition | null>(null);

  const { data: arenas = [], isLoading, error } = useQuery({
    queryKey: ['arenas'],
    queryFn: fetchArenas
  });

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

  const filterArenas = () => {
    let filtered = [...arenas];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(arena =>
        arena.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        arena.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Calculate distances and sort if needed
    const arenasWithDistance: ArenaWithDistance[] = filtered.map(arena => ({
      ...arena,
      distance: calculateDistance(arena, userLocation)
    }));

    // Apply distance filter
    if (activeFilter === 'near') {
      return arenasWithDistance
        .filter(arena => arena.distance < 10) // Show arenas within 10km
        .sort((a, b) => a.distance - b.distance);
    }

    return arenasWithDistance;
  };

  const filteredArenas = filterArenas();

  if (error) {
    toast.error("Erro ao carregar as arenas");
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-6">
        <ArenaHeader onBackClick={() => navigate('/home')} />
        <ArenaSearchBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
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
