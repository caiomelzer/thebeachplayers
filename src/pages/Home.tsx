
import { Search, Book, FileText, CheckSquare, Users, MapPin, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Home</h1>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/championships')}>
            <Search className="w-5 h-5" />
          </button>
          <button onClick={() => navigate('/edit')}>
            <img
              src="/lovable-uploads/kleber.png"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
          </button>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-1">Olá</h1>
        <h2 className="text-4xl font-bold mb-4">{user?.email?.split('@')[0] || 'Usuário'}</h2>
        
        {/* Sport Tags */}
        <div className="flex gap-4 text-sm">
          <span className="bg-[#0EA5E9] px-4 py-1 rounded-full">Vôlei</span>
          <span className="bg-zinc-800/50 text-zinc-400 px-4 py-1 rounded-full">FutVôlei</span>
          <span className="bg-zinc-800/50 text-zinc-400 px-4 py-1 rounded-full">Beach Tennis</span>
        </div>
      </div>

      {/* Ranking Card */}
      <div className="bg-zinc-900 rounded-xl p-4 mb-8">
        <div className="flex justify-between items-start mb-2">
          <span className="text-lg font-medium">Ranking Geral</span>
          <span className="text-[#0EA5E9] text-xl font-bold">#00178</span>
        </div>
        <p className="text-sm text-zinc-400 mb-3">
          Esta é a sua colocação em um total de 23457 atletas.
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
              <span className="text-[#0EA5E9] text-2xl font-bold">13</span>
            </div>
          </button>

          {/* Campeonatos Inscritos */}
          <button 
            onClick={() => navigate('/championships', { state: { initialFilter: 'registered' } })}
            className="bg-zinc-900 p-4 rounded-xl text-left"
          >
            <div className="bg-orange-900 p-2 rounded-lg w-fit mb-2">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm text-zinc-400">Campeonatos</p>
                <p className="font-medium">Inscritos</p>
              </div>
              <span className="text-orange-500 text-2xl font-bold">4</span>
            </div>
          </button>

          {/* Campeonatos Em breve */}
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
                <p className="font-medium">Em breve</p>
              </div>
              <span className="text-purple-500 text-2xl font-bold">15</span>
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
              <span className="text-green-500 text-2xl font-bold">324</span>
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
              <span className="text-zinc-400 text-2xl font-bold">8</span>
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
