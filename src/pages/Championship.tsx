
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Championship = () => {
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

        <div>
          <h1 className="text-2xl font-bold mb-6">R2 - Segunda Etapa</h1>
          <h2 className="text-[#0EA5E9] text-xl mb-4">Dupla Misto Intermediário</h2>
          
          <div className="bg-zinc-900 rounded-lg p-4 mb-4">
            <h3 className="text-lg mb-2">Sobre</h3>
            <p className="text-zinc-400">
              Mais uma etapa do famoso campeonato do beto e da Rai.
            </p>
          </div>

          <div className="bg-zinc-900 rounded-lg p-4">
            <h3 className="text-lg mb-2">Local e Data</h3>
            <p className="text-[#0EA5E9]">15/03/2025 às 10:00</p>
            <p className="text-zinc-400">
              Arena JR10
              Rua Antônio Mariano, 137 Jardim Ipanema - Interlagos, São Paulo - SP, 04784-000
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Championship;
