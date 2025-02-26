
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-6">
        <button 
          onClick={() => navigate('/home')}
          className="bg-[#0EA5E9] p-2 rounded-lg mb-6"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="flex flex-col items-center">
          <img
            src="/lovable-uploads/kleber.png"
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4"
          />
          <h1 className="text-2xl font-bold">Kleber Utrilha</h1>
          <p className="text-zinc-400 mb-4">#123456</p>
          
          <div className="flex gap-4 text-sm mb-6">
            <span className="bg-[#0EA5E9] px-4 py-1 rounded-full">Vôlei</span>
            <span className="bg-zinc-800/50 text-zinc-400 px-4 py-1 rounded-full">FutVôlei</span>
            <span className="bg-zinc-800/50 text-zinc-400 px-4 py-1 rounded-full">Beach Tennis</span>
          </div>

          <div className="w-full space-y-4">
            {/* Ranking Card */}
            <div className="bg-zinc-900 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg">Ranking Geral</h2>
                <span className="text-[#0EA5E9] text-xl font-bold">#00178</span>
              </div>
              <p className="text-sm text-zinc-400">Subiu 36 posições no último mês</p>
            </div>

            {/* Categoria Card */}
            <div className="bg-zinc-900 rounded-lg p-4">
              <h2 className="text-lg mb-2">Categoria Mínima Permitida</h2>
              <p className="text-[#0EA5E9] font-bold mb-1">Intermediário</p>
              <p className="text-sm text-zinc-400">ou score mínimo 1000 pontos</p>
            </div>

            {/* Campeonatos Card */}
            <div className="bg-zinc-900 rounded-lg p-4">
              <h2 className="text-lg mb-4">Campeonatos Disputados</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-4xl font-bold">51</p>
                  <p className="text-sm text-zinc-400">nos últimos 6 meses</p>
                </div>
                <div>
                  <p className="text-4xl font-bold">100</p>
                  <p className="text-sm text-zinc-400">desde que se cadastrou</p>
                </div>
              </div>
            </div>

            {/* Stats Cards - Victories and Defeats in the same row */}
            <div className="grid grid-cols-2 gap-4">
              {/* Victories Card */}
              <div className="bg-zinc-900 rounded-lg p-4">
                <h2 className="text-lg mb-4">Vitórias</h2>
                <p className="text-4xl font-bold">19</p>
                <p className="text-sm text-zinc-400">Vitórias</p>
              </div>

              {/* Defeats Card */}
              <div className="bg-zinc-900 rounded-lg p-4">
                <h2 className="text-lg mb-4">Derrotas</h2>
                <p className="text-4xl font-bold">32</p>
                <p className="text-sm text-zinc-400">Derrotas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
