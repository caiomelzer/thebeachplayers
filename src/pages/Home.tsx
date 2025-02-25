
import { Search, Book, FileText, CheckSquare, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Home</h1>
        <div className="flex items-center gap-4">
          <Search className="w-5 h-5" />
          <img
            src="/lovable-uploads/6e0fd4b5-bb25-459b-a6d4-dd1554ad50ec.png"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>

      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-1">Olá</h1>
        <h2 className="text-4xl font-bold mb-4">Kleber</h2>
        
        {/* Sport Tags */}
        <div className="flex gap-4 text-sm">
          <span className="bg-[#0EA5E9] px-4 py-1 rounded-full">Vôlei</span>
          <span className="bg-zinc-800 px-4 py-1 rounded-full">FutVôlei</span>
          <span className="bg-zinc-800 px-4 py-1 rounded-full">Beach Tennis</span>
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
        <button className="text-sm text-zinc-400 hover:text-white transition-colors">
          Ver mais detalhes
        </button>
      </div>

      {/* Shortcuts Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold mb-4">Atalhos</h3>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Campeonatos Disputados */}
          <div className="bg-zinc-900 p-4 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-blue-900 p-2 rounded-lg">
                <Book className="w-5 h-5 text-white" />
              </div>
              <img
                src="/lovable-uploads/6e0fd4b5-bb25-459b-a6d4-dd1554ad50ec.png"
                alt="Profile"
                className="w-6 h-6 rounded-full"
              />
            </div>
            <p className="text-sm text-zinc-400 mb-1">Campeonatos</p>
            <p className="font-medium mb-2">Disputados</p>
            <span className="text-[#0EA5E9] text-2xl font-bold">13</span>
          </div>

          {/* Campeonatos Inscritos */}
          <div className="bg-zinc-900 p-4 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-orange-900 p-2 rounded-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <img
                src="/lovable-uploads/6e0fd4b5-bb25-459b-a6d4-dd1554ad50ec.png"
                alt="Profile"
                className="w-6 h-6 rounded-full"
              />
            </div>
            <p className="text-sm text-zinc-400 mb-1">Campeonatos</p>
            <p className="font-medium mb-2">Inscritos</p>
            <span className="text-orange-500 text-2xl font-bold">4</span>
          </div>

          {/* Campeonatos Em breve */}
          <div className="bg-zinc-900 p-4 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-purple-900 p-2 rounded-lg">
                <CheckSquare className="w-5 h-5 text-white" />
              </div>
              <img
                src="/lovable-uploads/6e0fd4b5-bb25-459b-a6d4-dd1554ad50ec.png"
                alt="Profile"
                className="w-6 h-6 rounded-full"
              />
            </div>
            <p className="text-sm text-zinc-400 mb-1">Campeonatos</p>
            <p className="font-medium mb-2">Em breve</p>
            <span className="text-purple-500 text-2xl font-bold">15</span>
          </div>

          {/* Convites Para jogar */}
          <div className="bg-zinc-900 p-4 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-green-900 p-2 rounded-lg">
                <Users className="w-5 h-5 text-white" />
              </div>
              <img
                src="/lovable-uploads/6e0fd4b5-bb25-459b-a6d4-dd1554ad50ec.png"
                alt="Profile"
                className="w-6 h-6 rounded-full"
              />
            </div>
            <p className="text-sm text-zinc-400 mb-1">Convites</p>
            <p className="font-medium mb-2">Para jogar</p>
            <span className="text-green-500 text-2xl font-bold">3</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
