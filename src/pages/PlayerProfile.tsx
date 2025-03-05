
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { fetchPlayerDetail } from "./players/services/playerDetailService";
import { PlayerDetailHeader } from "./players/components/PlayerDetailHeader";

const PlayerProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Hardcoded modality ID as specified
  const modalityId = "9adbe036-f565-11ef-81b8-be0df3cad36e";

  const { 
    data: player, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['players', modalityId, id],
    queryFn: () => id ? fetchPlayerDetail(modalityId, id) : Promise.reject(new Error("ID não fornecido")),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    meta: {
      onError: (error: Error) => {
        console.error("Error fetching player details:", error);
        toast.error("Erro ao buscar detalhes do jogador");
      }
    }
  });
  if (isLoading) return <p className="text-center text-white">Carregando...</p>;
  if (error) return <p className="text-center text-red-500">{(error as Error).message}</p>;
  if (!player) return <p className="text-center text-white">Nenhuma informação disponível.</p>;
  console.log('player:', player);
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-6">
        <PlayerDetailHeader onBackClick={() => navigate('/players')} />

        <div className="flex flex-col items-center">
          <img
            src={player.avatar_url || "/placeholder.svg"}
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4 object-cover"
          />
          <h1 className="text-2xl font-bold">{player.full_name}</h1>
          <p className="text-zinc-400 mb-4">({player.nickname})</p>
          
          <div className="flex gap-4 text-sm mb-6">
            {player.sports && player.sports.length > 0 ? (
              player.sports.map((sport: string, index: number) => (
                <span 
                  key={sport}
                  className={`px-4 py-1 rounded-full ${
                    index === 0 ? 'bg-[#0EA5E9]' : 'bg-zinc-800/50 text-zinc-400'
                  }`}
                >
                  {sport}
                </span>
              ))
            ) : (
              <span className="px-4 py-1 rounded-full bg-[#0EA5E9]">
                Vôlei
              </span>
            )}
          </div>

          <div className="w-full space-y-4">
            <div className="bg-zinc-900 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg">Ranking Geral</h2>
                <span className="text-[#0EA5E9] text-xl font-bold">#{player.ranking.toString().padStart(5, '0')}</span>
              </div>
              
            </div>

            <div className="bg-zinc-900 rounded-lg p-4">
              <h2 className="text-lg mb-2">Categoria Mínima Permitida</h2>
              <p className="text-[#0EA5E9] font-bold mb-1">{player.minCategory || "Estreante"}</p>
              <p className="text-sm text-zinc-400">ou score mínimo {player.minScore || "0"} pontos</p>
            </div>

            <div className="bg-zinc-900 rounded-lg p-4">
              <h2 className="text-lg mb-4">Campeonatos Disputados</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-4xl font-bold">{player.statistics.total_championships_last_6_months || "51"}</p>
                  <p className="text-sm text-zinc-400">nos últimos 6 meses</p>
                </div>
                <div>
                  <p className="text-4xl font-bold">{player.statistics.total_championships || "100"}</p>
                  <p className="text-sm text-zinc-400">desde que se cadastrou</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-900 rounded-lg p-4">
                <h2 className="text-lg mb-4">Vitórias</h2>
                <p className="text-4xl font-bold">{player.statistics.wins || "0"}</p>
                <p className="text-sm text-zinc-400">Vitórias</p>
              </div>

              <div className="bg-zinc-900 rounded-lg p-4">
                <h2 className="text-lg mb-4">Derrotas</h2>
                <p className="text-4xl font-bold">{player.statistics.losses || "0"}</p>
                <p className="text-sm text-zinc-400">Derrotas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;
