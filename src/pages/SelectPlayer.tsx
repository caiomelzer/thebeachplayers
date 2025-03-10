
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchPlayers } from "./players/services/playerService";
import { ArrowLeft } from "lucide-react";
import { PlayerCard } from "./players/components/PlayerCard";

const modalityId = "9adbe036-f565-11ef-81b8-be0df3cad36e"; // Hardcoded modality ID

const SelectPlayer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { teamMemberIndex, teamMembers, championshipId, championshipData } = location.state || {};
  
  const [searchTerm, setSearchTerm] = useState("");

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
        player.name?.toLowerCase().includes(lowercaseSearchTerm) ||
        player.nickname?.toLowerCase().includes(lowercaseSearchTerm)
      );
    }
    
    // Remove players already in the team
    const existingPlayerIds = teamMembers
      .filter(member => member.player_id)
      .map(member => member.player_id);
    
    filtered = filtered.filter(player => !existingPlayerIds.includes(player.id));
    
    return filtered;
  };

  const handleSelectPlayer = (playerId: string) => {
    if (!teamMemberIndex && teamMemberIndex !== 0) {
      toast.error("Erro ao selecionar jogador");
      return;
    }

    const selectedPlayer = players.find(player => player.id === playerId);
    if (!selectedPlayer) return;

    // Create a copy of team members and update the selected index
    const updatedTeamMembers = [...teamMembers];
    updatedTeamMembers[teamMemberIndex] = {
      player_id: selectedPlayer.id,
      nickname: selectedPlayer.nickname || selectedPlayer.name,
      avatar_url: selectedPlayer.avatar_url,
      rating: selectedPlayer.rating,
      whatsapp: selectedPlayer.whatsapp || "",
    };

    // Navigate back to team creation page with updated data
    navigate("/create-team/" + championshipId, { 
      state: { 
        teamMembers: updatedTeamMembers,
        championshipData
      },
      replace: true 
    });
  };

  const filteredPlayers = filterPlayers();

  if (isLoading) return <p className="text-center text-white">Carregando...</p>;
  if (error) return <p className="text-center text-red-500">{(error as Error).message}</p>;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="w-10 h-10 flex items-center justify-center bg-blue-500 rounded-lg mr-4"
          >
            <ArrowLeft className="text-white" size={24} />
          </button>
          <h1 className="text-xl font-semibold">Selecionar Jogador</h1>
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
              onClick={handleSelectPlayer}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectPlayer;
