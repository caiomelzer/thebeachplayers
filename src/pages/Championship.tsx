
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { fetchChampionshipDetail } from "./championships/services/championshipDetailService";
import { ChampionshipDetailHeader } from "./championships/components/ChampionshipDetailHeader";

const Championship = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { 
    data: championship, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['championship', id],
    queryFn: () => id ? fetchChampionshipDetail(id) : Promise.reject(new Error("ID não fornecido")),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    meta: {
      onError: (error: Error) => {
        console.error("Error fetching championship details:", error);
        toast.error("Erro ao buscar detalhes do campeonato");
      }
    }
  });

  const handlePriceClick = () => {
    const message = encodeURIComponent("Olá, gostaria de mais informações sobre os valores do campeonato.");
    window.open(`https://wa.me/5511980872469?text=${message}`, '_blank');
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
          <p className="text-sm text-zinc-400">#{championship.id.substring(0, 6)}</p>
          <h2 className="text-xl font-bold text-[#0EA5E9] mt-4">{championship.category}</h2>
        </div>

        {/* Content */}
        <div className="px-6 space-y-6">
          {/* About Section */}
          <div className="bg-zinc-900 rounded-lg p-4">
            <h3 className="font-medium mb-2">Sobre</h3>
            <p className="text-sm text-zinc-400">
              {championship.description || "Mais uma etapa do famoso campeonato do beto e da Rai.Mais uma etapa do famoso campeonato do beto e da Rai.Mais uma etapa do famoso campeonato do beto e da Rai.Mais uma etapa do famoso campeonato do beto e da Rai."}
            </p>
          </div>

          {/* Location and Date */}
          <div className="bg-zinc-900 rounded-lg p-4">
            <h3 className="font-medium mb-2">Local e Data</h3>
            <p className="text-[#0EA5E9] mb-2">
              {new Date(championship.occurs || championship.date || "").toLocaleDateString('pt-BR')} às {new Date(championship.occurs || championship.date || "").toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            </p>
            <p className="text-sm text-zinc-400">
              {championship.arena_name || "Arena JR10"}
              <br />
              {championship.arena_address || "Rua Antônio Mariano, 137 Jardim Ipanema - Interlagos, São Paulo - SP, 04784-000"}
            </p>
          </div>

          {/* Participants and Spots */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 bg-zinc-900 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold">{championship.registered_teams_count || 16}</p>
              <p className="text-sm text-zinc-400">Participantes</p>
            </div>
            <div className="flex-1 bg-zinc-900 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold">{championship.available_spots || 4}</p>
              <p className="text-sm text-zinc-400">Vagas disp.</p>
            </div>
          </div>

          {/* Rules Button */}
          <button 
            onClick={() => navigate(`/championship/${id}/rules`)}
            className="w-full bg-zinc-900 rounded-lg p-4 text-left"
          >
            <p className="text-center">Clique aqui para ler as regras</p>
          </button>

          {/* Pricing */}
          <div className="space-y-3">
            <h3 className="text-zinc-400">Valores</h3>
            <button 
              onClick={handlePriceClick}
              className="w-full bg-zinc-900 rounded-lg p-4 flex justify-between items-center"
            >
              <span>Está é minha primeira categoria</span>
              <span className="text-[#0EA5E9]">R${championship.price || 110}</span>
            </button>
            <button 
              onClick={handlePriceClick}
              className="w-full bg-zinc-900 rounded-lg p-4 flex justify-between items-center"
            >
              <span>Já estou inscrito em outra categoria</span>
              <span className="text-[#0EA5E9]">R${Math.floor(Number(championship.price || 110) * 0.8) || 90}</span>
            </button>
          </div>

          {/* Participants List */}
          <div className="space-y-3 pb-6">
            <h3 className="text-zinc-400">Participantes ({championship.registered_teams_count || 12} inscritos)</h3>
            {(championship.teams || [{}, {}, {}]).map((team, i) => (
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
