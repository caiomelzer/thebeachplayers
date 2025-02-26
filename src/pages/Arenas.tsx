
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

interface Arena {
  id: number;
  name: string;
  address: string;
  image: string;
  distance?: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

const Arenas = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<'all' | 'near'>('all');
  const [searchTerm, setSearchTerm] = useState("");
  const [userLocation, setUserLocation] = useState<GeolocationPosition | null>(null);

  // Mock data for arenas
  const arenas: Arena[] = [
    {
      id: 1,
      name: "Arena JR10",
      address: "Rua Antônio Mariano, 137 - Jardim Ipanema, São Paulo",
      image: "/lovable-uploads/logo.png",
      coordinates: {
        latitude: -23.6745,
        longitude: -46.7014
      }
    },
    {
      id: 2,
      name: "Arena Beach Sports",
      address: "Av. José Galante, 730 - Vila Suzana, São Paulo",
      image: "/lovable-uploads/logo-r2.png",
      coordinates: {
        latitude: -23.6245,
        longitude: -46.7314
      }
    }
  ];

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(position);
        },
        (error) => {
          console.error('Error getting location:', error);
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
                  src={arena.image}
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
