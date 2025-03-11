
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { fetchChampionshipDetail } from "./championships/services/championshipDetailService";
import { fetchArenaDetail } from "./arenas/services/arenaDetailService";
import { ChampionshipDetailHeader } from "./championships/components/ChampionshipDetailHeader";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { fetchChampionshipTeams } from "./championships/services/championshipDetailService";
import { Team } from "@/types/database";

const modalityId = "9adbe036-f565-11ef-81b8-be0df3cad36e"; // Hardcoded modality ID

const Championship = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { 
    data: championship, 
    isLoading, 
    error,
    refetch
  } = useQuery({
    queryKey: ['championship', id],
    queryFn: () => id ? fetchChampionshipDetail(id, modalityId) : Promise.reject(new Error("ID não fornecido")),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    meta: {
      onError: (error: Error) => {
        console.error("Error fetching championship details:", error);
        toast.error("Erro ao buscar detalhes do campeonato");
      }
    }
  });

  const { 
    data: arena
  } = useQuery({
    queryKey: ['arena', championship?.arena_id],
    queryFn: () => championship?.arena_id ? fetchArenaDetail(championship.arena_id) : Promise.reject(new Error("ID da arena não fornecido")),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    enabled: !!championship?.arena_id,
    meta: {
      onError: (error: Error) => {
        console.error("Error fetching arena details:", error);
        toast.error("Erro ao buscar detalhes da arena");
      }
    }
  });

  // Fetch teams for this championship
  const {
    data: teams,
    isLoading: isLoadingTeams
  } = useQuery({
    queryKey: ['championship-teams', id],
    queryFn: () => id ? fetchChampionshipTeams(modalityId, id) : Promise.reject(new Error("ID não fornecido")),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    meta: {
      onError: (error: Error) => {
        console.error("Error fetching championship teams:", error);
        toast.error("Erro ao buscar times do campeonato");
      }
    }
  });

  // Check if current user is already registered in this championship
  const isUserRegistered = (): boolean => {
    if (!user || !teams) return false;
    
    return teams.some(team => {
      return team.team_members?.some(member => member.player_id === user.id);
    });
  };

  const handleRegisterClick = () => {
    if (isUserRegistered()) {
      toast.info("Você já está inscrito neste campeonato");
      return;
    }
    
    navigate(`/create-team/${id}`, { 
      state: { 
        championshipData: championship 
      } 
    });
  };

  if (isLoading) return <p className="text-center text-white">Carregando...</p>;
  if (error) return <p className="text-center text-red-500">{(error as Error).message}</p>;
  if (!championship) return <p className="text-center text-white">Nenhuma informação disponível.</p>;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative">
        {/* Header */}
        <ChampionshipDetailHeader onBackClick={() => navigate('/championships')} />

        {/* Championship Logo and Title */}
        <div className="text-center pt-16 pb-8 px-6">
          <img
            src={championship.banner_url || "/lovable-uploads/logo.png"}
            alt={championship.title}
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold mb-1">{championship.title}</h1>
          <h2 className="text-xl font-bold text-[#0EA5E9] mt-4">{championship.category}</h2>
        </div>

        {/* Content */}
        <div className="px-6 space-y-6">
          {/* About Section */}
          <div className="bg-zinc-900 rounded-lg p-4">
            <h3 className="font-medium mb-2">Sobre</h3>
            <p className="text-sm text-zinc-400">
              {championship.disclaimmer || "Sem informações por enquanto."}
            </p>
          </div>

          {/* Location and Date */}
          <div className="bg-zinc-900 rounded-lg p-4">
            <h3 className="font-medium mb-2">Local e Data</h3>
            <p className="text-[#0EA5E9] mb-2">
              {new Date(championship.occurs).toLocaleDateString('pt-BR')} às {new Date(championship.occurs).toISOString().replace('T', ' ').substring(10, 16)}
            </p>
            <p className="text-sm text-zinc-400">
              {arena ? arena.name : ""}
              <br />
              {arena ? arena.address : ""}
            </p>
          </div>

          {/* Participants and Spots */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 bg-zinc-900 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold">{championship.max_teams || 0}</p>
              <p className="text-sm text-zinc-400">Participantes</p>
            </div>
            <div className="flex-1 bg-zinc-900 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold">{championship.free || 0}</p>
              <p className="text-sm text-zinc-400">Vagas disp.</p>
            </div>
          </div>
          
          {/* Rules Button */}
          <button 
            onClick={() => navigate(`/championship/${id}/rules`)}
            className="w-full bg-zinc-900 rounded-lg p-4 text-left "
          >
            <p className="text-center">Clique aqui para ler as regras (Em breve)</p>
          </button>

          {/* Pricing */}
          <div className="space-y-3">
            <h3 className="text-zinc-400">Valores</h3>
            <Button 
              onClick={handleRegisterClick}
              className="w-full bg-zinc-900 rounded-lg p-4 flex justify-between items-center"
              disabled={isUserRegistered()}
            >
              <span>Inscrição por pessoa</span>
              <span className="text-[#0EA5E9]">R${championship.price}</span>
            </Button>
          </div>
          
          {/* Participants List */}
          <div className="space-y-3 pb-6">
            <h3 className="text-zinc-400">Participantes ({teams?.length || 0} inscritos)</h3>
            
            {isLoadingTeams ? (
              <p className="text-center text-zinc-400 py-4">Carregando times...</p>
            ) : teams && teams.length > 0 ? (
              teams.map((team) => (
                <button
                  key={team.id}
                  onClick={() => navigate('/complaint')}
                  className="w-full bg-zinc-900 rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {team.team_members && team.team_members.length > 0 && (
                        <>
                          <img
                            src={team.team_members[0]?.avatar_url || "/placeholder.svg"}
                            alt="Player 1"
                            className="w-8 h-8 rounded-full border-2 border-black"
                          />
                          {team.team_members.length > 1 && (
                            <img
                              src={team.team_members[1]?.avatar_url || "/placeholder.svg"}
                              alt="Player 2"
                              className="w-8 h-8 rounded-full border-2 border-black"
                            />
                          )}
                        </>
                      )}
                    </div>
                    <div>
                      {team.team_members && team.team_members.map((member, index) => (
                        <p key={index}>{member.nickname || "Jogador sem nome"}</p>
                      ))}
                    </div>
                  </div>
                  <div className="text-zinc-400">!</div>
                </button>
              ))
            ) : (
              <p className="text-center text-zinc-400 py-4">Nenhum time inscrito ainda</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Championship;
