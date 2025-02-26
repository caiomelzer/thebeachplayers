
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type Sport = 'volei' | 'futvolei' | 'beachtennis';

interface Player {
  id: number;
  nickname: string;
  name: string;
  category: string;
  avatar: string;
  sport: Sport;
}

const Players = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<Sport>('volei');
  const [searchTerm, setSearchTerm] = useState("");

  const players: Player[] = [
    {
      id: 1,
      nickname: "Klebinho",
      name: "Kleber Utrilha",
      category: "Intermediário",
      avatar: "/lovable-uploads/kleber.png",
      sport: "volei"
    },
    {
      id: 2,
      nickname: "Bruxo",
      name: "Ronaldinho Gaúcho",
      category: "Iniciante",
      avatar: "/lovable-uploads/ronaldinho.png",
      sport: "futvolei"
    },
    {
      id: 3,
      nickname: "MariaS",
      name: "Maria Silva",
      category: "Avançado",
      avatar: "/lovable-uploads/6e0fd4b5-bb25-459b-a6d4-dd1554ad50ec.png",
      sport: "beachtennis"
    }
  ];

  const filterPlayers = () => {
    let filtered = players;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(player =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.nickname.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sport filter
    filtered = filtered.filter(player => player.sport === activeFilter);

    return filtered;
  };

  const filteredPlayers = filterPlayers();

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
          <h1 className="text-xl font-bold flex-1 text-center">Jogadores</h1>
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
        <div className="grid grid-cols-3 gap-2 mb-6">
          <button 
            onClick={() => setActiveFilter('volei')}
            className={`px-4 py-2 rounded-full text-center ${
              activeFilter === 'volei' ? 'bg-[#0EA5E9] text-white' : 'bg-zinc-900 text-zinc-400'
            }`}
          >
            Vôlei
          </button>
          <button 
            onClick={() => setActiveFilter('futvolei')}
            className={`px-4 py-2 rounded-full text-center ${
              activeFilter === 'futvolei' ? 'bg-[#0EA5E9] text-white' : 'bg-zinc-900 text-zinc-400'
            }`}
          >
            FutVôlei
          </button>
          <button 
            onClick={() => setActiveFilter('beachtennis')}
            className={`px-4 py-2 rounded-full text-center ${
              activeFilter === 'beachtennis' ? 'bg-[#0EA5E9] text-white' : 'bg-zinc-900 text-zinc-400'
            }`}
          >
            Beach Tennis
          </button>
        </div>

        {/* Players List */}
        <div className="space-y-4">
          {filteredPlayers.map((player) => (
            <button
              key={player.id}
              className="w-full bg-zinc-900 rounded-lg p-4 flex items-center text-left"
              onClick={() => navigate(`/player/${player.id}`)}
            >
              <div className="mr-4">
                <img
                  src={player.avatar}
                  alt={`${player.nickname}'s avatar`}
                  className="w-12 h-12 rounded-full"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{player.nickname}</h3>
                <p className="text-sm text-zinc-400">{player.name}</p>
                <p className="text-sm text-zinc-400">{player.category}</p>
              </div>
              <div className="text-zinc-400">›</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Players;
