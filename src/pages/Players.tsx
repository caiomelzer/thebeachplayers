
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

import { fetchPlayers } from "./players/services/playerService";
import { PlayerHeader } from "./players/components/PlayerHeader";
import { PlayerSearchBar } from "./players/components/PlayerSearchBar";
import { PlayerFilters } from "./players/components/PlayerFilters";
import { PlayerCard } from "./players/components/PlayerCard";

type Sport = 'volei' | 'futvolei' | 'beachtennis';

const Players = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<Sport>('volei');
  const [searchTerm, setSearchTerm] = useState("");
  
  // Hardcoded modality ID as specified
  const modalityId = "9adbe036-f565-11ef-81b8-be0df3cad36e";

  const { 
    data: players = [], 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['players', modalityId],
    queryFn: () => fetchPlayers(modalityId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    meta: {
      onError: (error: Error) => {
        console.error("Error fetching players:", error);
        toast.error("Erro ao buscar jogadores");
      }
    }
  });

  const filterPlayers = () => {
    if (!players || players.length === 0) return [];
    
    let filtered = [...players];
    
    // Apply search filter
    if (searchTerm) {
      const lowercaseSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(player =>
        player.name.toLowerCase().includes(lowercaseSearchTerm) ||
        player.nickname.toLowerCase().includes(lowercaseSearchTerm)
      );
    }
    
    // In the future, we might apply sport filter here
    // For now, we're using a hardcoded modality ID
    
    return filtered;
  };

  const filteredPlayers = filterPlayers();

  if (isLoading) return <p className="text-center text-white">Carregando...</p>;
  if (error) return <p className="text-center text-red-500">{(error as Error).message}</p>;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-6">
        <PlayerHeader onBackClick={() => navigate('/home')} />
        
        <PlayerSearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
{/* 
        <PlayerFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />COMENTÁRIO JSX */}

        {filteredPlayers.length === 0 && (
          <div className="text-center py-8 text-zinc-400">
            Nenhum jogador encontrado
          </div>
        )}

        <div className="space-y-4">
          {filteredPlayers.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              onClick={(id) => navigate(`/player/${id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Players;
