import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const PlayerProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // This is mock data - in a real app, you'd fetch this based on the id
  const player = {
    id: Number(id),
    nickname: "KleberU",
    name: "Kleber Utrilha",
    playerId: "#123456",
    avatar: "/lovable-uploads/kleber.png",
    sports: ["Vôlei", "FutVôlei", "Beach Tennis"],
    ranking: "#00178",
    rankingChange: "Subiu 36 posições no último mês",
    minCategory: "Intermediário",
    minScore: "1000",
    recentChampionships: 51,
    totalChampionships: 100,
    victories: 19,
    defeats: 32
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-6">
        <button 
          onClick={() => navigate('/players')}
          className="bg-[#0EA5E9] p-2 rounded-lg mb-6"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="flex flex-col items-center">
          <img
            src={player.avatar}
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4"
          />
          <h1 className="text-2xl font-bold">{player.name}</h1>
          <p className="text-zinc-400 mb-4">{player.playerId}</p>
          
          <div className="flex gap-4 text-sm mb-6">
            {player.sports.map((sport, index) => (
              <span 
                key={sport}
                className={`px-4 py-1 rounded-full ${
                  index === 0 ? 'bg-[#0EA5E9]' : 'bg-zinc-800/50 text-zinc-400'
                }`}
              >
                {sport}
              </span>
            ))}
          </div>

          <div className="w-full space-y-4">
            {/* Rest of the cards similar to Profile.tsx */}
            <div className="bg-zinc-900 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg">Ranking Geral</h2>
                <span className="text-[#0EA5E9] text-xl font-bold">{player.ranking}</span>
              </div>
              <p className="text-sm text-zinc-400">{player.rankingChange}</p>
            </div>

            <div className="bg-zinc-900 rounded-lg p-4">
              <h2 className="text-lg mb-2">Categoria Mínima Permitida</h2>
              <p className="text-[#0EA5E9] font-bold mb-1">{player.minCategory}</p>
              <p className="text-sm text-zinc-400">ou score mínimo {player.minScore} pontos</p>
            </div>

            <div className="bg-zinc-900 rounded-lg p-4">
              <h2 className="text-lg mb-4">Campeonatos Disputados</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-4xl font-bold">{player.recentChampionships}</p>
                  <p className="text-sm text-zinc-400">nos últimos 6 meses</p>
                </div>
                <div>
                  <p className="text-4xl font-bold">{player.totalChampionships}</p>
                  <p className="text-sm text-zinc-400">desde que se cadastrou</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-900 rounded-lg p-4">
                <h2 className="text-lg mb-4">Vitórias</h2>
                <p className="text-4xl font-bold">{player.victories}</p>
                <p className="text-sm text-zinc-400">Vitórias</p>
              </div>

              <div className="bg-zinc-900 rounded-lg p-4">
                <h2 className="text-lg mb-4">Derrotas</h2>
                <p className="text-4xl font-bold">{player.defeats}</p>
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
