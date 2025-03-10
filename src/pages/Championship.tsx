
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { fetchChampionshipDetail } from "./championships/services/championshipDetailService";
import { fetchArenaDetail } from "./arenas/services/arenaDetailService"
import { ChampionshipDetailHeader } from "./championships/components/ChampionshipDetailHeader";
const modalityId = "9adbe036-f565-11ef-81b8-be0df3cad36e"; // Hardcoded modality ID

const Championship = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { 
    data: championship, 
    isLoading, 
    error 
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

  



  console.log('championship:', championship);

  const { 
    data: arena
  } = useQuery({
    queryKey: ['arena', id],
    queryFn: () => id ? fetchArenaDetail(championship.arena_id) : Promise.reject(new Error("ID não fornecido")),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    meta: {
      onError: (error: Error) => {
        console.error("Error fetching championship details:", error);
        toast.error("Erro ao buscar detalhes do campeonato");
      }
    }
  });

  console.log('arena:', arena);

  const handlePriceClick = () => {
    const message = encodeURIComponent(`Olá, gostaria de inscrever no campeonato ${championship.title}.`);
    window.open(`https://wa.me/55${championship.contact}?text=${message}`, '_blank');
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
            onClick={() => navigate(`/championship/${id}/`)}
            className="w-full bg-zinc-900 rounded-lg p-4 text-left "
          >
            <p className="text-center">Clique aqui para ler as regras (Em breve)</p>
          </button>

          {/* Pricing */}
          <div className="space-y-3">
            <h3 className="text-zinc-400">Valores</h3>
            <button 
              onClick={handlePriceClick}
              className="w-full bg-zinc-900 rounded-lg p-4 flex justify-between items-center"
            >
              <span>Inscrição por pessoa</span>
              <span className="text-[#0EA5E9]">R${championship.price}</span>
            </button>
          </div>
          
          {/* Participants List */}
          <div className="space-y-3 pb-6">
            <h3 className="text-zinc-400">Participantes ({championship.registered_teams_count || 0} inscritos)</h3>
            {(championship.teams || []).map((team, i) => (
              <button
                key={team.id || i}
                onClick={() => navigate('/complaint')}
                className="w-full bg-zinc-900 rounded-lg p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <img
                      src={team.player1_avatar || "/lovable-uploads/kleber.png"}
                      alt="Player 1"
                      className="w-8 h-8 rounded-full border-2 border-black"
                    />
                    <img
                      src={team.player2_avatar || "/lovable-uploads/ronaldinho.png"}
                      alt="Player 2"
                      className="w-8 h-8 rounded-full border-2 border-black"
                    />
                  </div>
                  <div>
                    <p>{team.player1_name || "Kleber Utrilha"}</p>
                    <p>{team.player2_name || "Ronaldinho Gaúcho"}</p>
                  </div>
                </div>
                <div className="text-zinc-400">!</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Championship;
