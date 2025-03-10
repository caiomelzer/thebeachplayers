
import { Search, Book, FileText, CheckSquare, Users, MapPin, Mail, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { fetchArenas } from "./arenas/services/arenaService";
import { fetchChampionships } from "./championships/services/championshipService";
import { fetchPlayers } from "./players/services/playerService";
import { apiClient } from "@/integrations/api/client";

const MODALITY_ID = "9adbe036-f565-11ef-81b8-be0df3cad36e"; // Hardcoded modality ID

const Home = () => {
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const [nearbyArenasCount, setNearbyArenasCount] = useState<number>(0);

  // Fetch arenas data with caching
  const { data: arenas = [], isLoading: arenasLoading } = useQuery({
    queryKey: ['arenas'],
    queryFn: () => fetchArenas(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false
  });

  // Fetch championships data
  const { data: championshipsData = [], isLoading: championshipsLoading } = useQuery({
    queryKey: ['championships', MODALITY_ID],
    queryFn: () => fetchChampionships(MODALITY_ID),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false
  });

  // Fetch players data
  const { data: playersData = [], isLoading: playersLoading } = useQuery({
    queryKey: ['players', MODALITY_ID],
    queryFn: () => fetchPlayers(MODALITY_ID),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false
  });

  // Calculate nearby arenas when we have user location
  useEffect(() => {
    if ('geolocation' in navigator && arenas.length > 0) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Count arenas within 10km
          const nearby = arenas.filter(arena => {
            const R = 6371; // Earth's radius in km
            const lat1 = position.coords.latitude * Math.PI / 180;
            const lat2 = arena.coordinates.latitude * Math.PI / 180;
            const deltaLat = (arena.coordinates.latitude - position.coords.latitude) * Math.PI / 180;
            const deltaLon = (arena.coordinates.longitude - position.coords.longitude) * Math.PI / 180;

            const a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
                     Math.cos(lat1) * Math.cos(lat2) *
                     Math.sin(deltaLon/2) * Math.sin(deltaLon/2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            const distance = R * c;
            
            return distance < 10; // 10km radius
          });
          
          setNearbyArenasCount(nearby.length);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, [arenas]);

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Erro ao fazer logout');
    }
  };

  // Get the display name from user data, fallback to 'Usuário'
  const displayName = user?.nickname || user?.full_name || '';
  const ranking = user?.ranking || 0;
  
  // Use the count from the API responses
  const countPlayers = playersLoading ? 0 : playersData.length;
  const championships = championshipsLoading ? 0 : championshipsData.length;
  const players = playersLoading ? 0 : playersData.length;
  
  // Get user statistics with default values
  const stats = user?.statistics || {
    ranking: 0,
    victories: 0,
    defeats: 0,
    total_championships: 0,
    recent_championships: 0
  };

  if (loading) {
    return <div className="min-h-screen bg-black text-white p-6 flex items-center justify-center">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Home</h1>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/championships')}>
            <Search className="w-5 h-5" />
          </button>|
          <button onClick={() => navigate('/edit')}>
            <User className="w-5 h-5" />
          </button>|
          <button onClick={handleLogout}>
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-1">Olá</h1>
        <h2 className="text-4xl font-bold mb-4">{displayName}</h2>
        
        {/* 
        <div className="flex gap-4 text-sm">
          <span className="bg-[#0EA5E9] px-4 py-1 rounded-full">Vôlei</span>
          <span className="bg-zinc-800/50 text-zinc-400 px-4 py-1 rounded-full">FutVôlei</span>
          <span className="bg-zinc-800/50 text-zinc-400 px-4 py-1 rounded-full">Beach Tennis</span>
        </div>Sport Tags */}
      </div>

      {/* Ranking Card */}
      <div className="bg-zinc-900 rounded-xl p-4 mb-8">
        <div className="flex justify-between items-start mb-2">
          <span className="text-lg font-medium">Ranking Geral</span>
          <span className="text-[#0EA5E9] text-xl font-bold">#{ranking.toString().padStart(5, '0')}</span>
        </div>
        <p className="text-sm text-zinc-400 mb-3">
          Esta é a sua colocação em um total de {countPlayers} atletas.
        </p>
        <div className="flex justify-center">
          <button 
            onClick={() => navigate('/profile')}
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Ver mais detalhes
          </button>
        </div>
      </div>

      {/* Shortcuts Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold mb-4">Atalhos</h3>
        
        <div className="grid grid-cols-2 gap-4">
          {/* First four cards remain the same */}
          <button 
            onClick={() => navigate('/championships', { state: { initialFilter: 'finished' } })}
            className="bg-zinc-900 p-4 rounded-xl text-left"
          >
            <div className="bg-blue-900 p-2 rounded-lg w-fit mb-2">
              <Book className="w-5 h-5 text-white" />
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm text-zinc-400">Campeonatos</p>
                <p className="font-medium">Disponíveis</p>
              </div>
              <span className="text-[#0EA5E9] text-2xl font-bold">{championships}</span>
            </div>
          </button>

          
          {/* Recent Championships Card */}
          <button 
            onClick={() => navigate('/championships', { state: { initialFilter: 'soon' } })}
            className="bg-zinc-900 p-4 rounded-xl text-left"
          >
            <div className="bg-purple-900 p-2 rounded-lg w-fit mb-2">
              <CheckSquare className="w-5 h-5 text-white" />
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm text-zinc-400">Campeonatos</p>
                <p className="font-medium">Recentes</p>
              </div>
              <span className="text-purple-500 text-2xl font-bold">{stats.recent_championships}</span>
            </div>
          </button>

          {/* Jogadores Card */}
          <button 
            onClick={() => navigate('/players')}
            className="bg-zinc-900 p-4 rounded-xl text-left"
          >
            <div className="bg-green-900 p-2 rounded-lg w-fit mb-2">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm text-zinc-400">Jogadores</p>
                <p className="font-medium">Vôlei</p>
              </div>
              <span className="text-green-500 text-2xl font-bold">{players}</span>
            </div>
          </button>

          {/* Arenas por perto Card */}
          <button 
            onClick={() => navigate('/arenas')}
            className="bg-zinc-900 p-4 rounded-xl text-left"
          >
            <div className="bg-gray-800 p-2 rounded-lg w-fit mb-2">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm text-zinc-400">Arenas</p>
                <p className="font-medium">por perto</p>
              </div>
              <span className="text-zinc-400 text-2xl font-bold">
                {arenasLoading ? "..." : nearbyArenasCount}
              </span>
            </div>
          </button>

          {/* Convites para jogar Card (Inactive) */}
          <div className="bg-zinc-800/50 p-4 rounded-xl text-left cursor-not-allowed">
            <div className="bg-zinc-700 p-2 rounded-lg w-fit mb-2">
              <Mail className="w-5 h-5 text-zinc-400" />
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm text-zinc-500">Convites</p>
                <p className="text-zinc-500 font-medium">para jogar</p>
              </div>
              <span className="text-zinc-500 text-2xl font-bold">3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
