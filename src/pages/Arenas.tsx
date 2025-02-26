
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Arena {
  id: string;
  name: string;
  address: string;
  main_image_url: string | null;
  distance?: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

const fetchArenas = async () => {
  const { data, error } = await supabase
    .from('arenas')
    .select('*')
    .eq('status', 'active');

  if (error) {
    throw error;
  }

  return data.map(arena => ({
    id: arena.id,
    name: arena.name,
    address: arena.address,
    main_image_url: arena.main_image_url,
    coordinates: {
      latitude: arena.latitude,
      longitude: arena.longitude
    }
  }));
};

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

  const calculateDistance = (arena: Arena) => {
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
    const distance = R * c;

    return distance;
  };

  const filterArenas = () => {
    let filtered = arenas;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(arena =>
        arena.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        arena.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Calculate distances and sort if needed
    filtered = filtered.map(arena => ({
      ...arena,
      distance: calculateDistance(arena)
    }));

    // Apply distance filter
    if (activeFilter === 'near') {
      filtered = filtered
        .filter(arena => arena.distance !== undefined && arena.distance < 10) // Show arenas within 10km
        .sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }

    return filtered;
  };

  const filteredArenas = filterArenas();

  if (error) {
    toast.error("Erro ao carregar as arenas");
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => navigate('/home')}
            className="bg-[#0EA5E9] p-2 rounded-lg"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold flex-1 text-center">Arenas</h1>
          <div className="w-8"></div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-900 text-white px-4 py-3 rounded-lg"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          <button 
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-full text-center ${
              activeFilter === 'all' ? 'bg-[#0EA5E9] text-white' : 'bg-zinc-900 text-zinc-400'
            }`}
          >
            Todas
          </button>
          <button 
            onClick={() => setActiveFilter('near')}
            className={`px-4 py-2 rounded-full text-center ${
              activeFilter === 'near' ? 'bg-[#0EA5E9] text-white' : 'bg-zinc-900 text-zinc-400'
            }`}
          >
            Perto de mim
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-8 text-zinc-400">
            Carregando arenas...
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredArenas.length === 0 && (
          <div className="text-center py-8 text-zinc-400">
            Nenhuma arena encontrada
          </div>
        )}

        {/* Arenas List */}
        <div className="space-y-4">
          {filteredArenas.map((arena) => (
            <button
              key={arena.id}
              className="w-full bg-zinc-900 rounded-lg p-4 flex items-center text-left"
              onClick={() => navigate(`/arena/${arena.id}`)}
            >
              <div className="mr-4">
                <img
                  src={arena.main_image_url || "/placeholder.svg"}
                  alt={arena.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{arena.name}</h3>
                <p className="text-sm text-zinc-400">{arena.address}</p>
                {arena.distance !== undefined && activeFilter === 'near' && (
                  <p className="text-sm text-[#0EA5E9]">
                    {arena.distance.toFixed(1)}km de distância
                  </p>
                )}
              </div>
              <div className="text-zinc-400">›</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Arenas;
