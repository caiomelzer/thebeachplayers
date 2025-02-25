
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Championship = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative">
        {/* Header */}
        <button 
          onClick={() => navigate('/championships')}
          className="absolute top-6 left-6 bg-[#0EA5E9] p-2 rounded-lg z-10"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Championship Logo and Title */}
        <div className="text-center pt-16 pb-8 px-6">
          <img
            src="/lovable-uploads/logo.png"
            alt="R2"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold mb-1">R2 - Segunda Etapa</h1>
          <p className="text-sm text-zinc-400">#123456</p>
          <h2 className="text-xl font-bold text-[#0EA5E9] mt-4">Dupla Misto Intermediário</h2>
        </div>

        {/* Content */}
        <div className="px-6 space-y-6">
          {/* About Section */}
          <div className="bg-zinc-900 rounded-lg p-4">
            <h3 className="font-medium mb-2">Sobre</h3>
            <p className="text-sm text-zinc-400">
              Mais uma etapa do famoso campeonato do beto e da Rai.Mais uma etapa do famoso
              campeonato do beto e da Rai.Mais uma etapa do famoso campeonato do beto e da
              Rai.Mais uma etapa do famoso campeonato do beto e da Rai.
            </p>
          </div>

          {/* Location and Date */}
          <div className="bg-zinc-900 rounded-lg p-4">
            <h3 className="font-medium mb-2">Local e Data</h3>
            <p className="text-[#0EA5E9] mb-2">15/03/2025 às 10:00</p>
            <p className="text-sm text-zinc-400">
              Arena JR10
              <br />
              Rua Antônio Mariano, 137 Jardim Ipanema - Interlagos, São Paulo - SP, 04784-000
            </p>
          </div>

          {/* Participants and Spots */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 bg-zinc-900 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold">16</p>
              <p className="text-sm text-zinc-400">Participantes</p>
            </div>
            <div className="flex-1 bg-zinc-900 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold">4</p>
              <p className="text-sm text-zinc-400">Vagas disp.</p>
            </div>
          </div>

          {/* Rules Button */}
          <button className="w-full bg-zinc-900 rounded-lg p-4 text-left">
            <p className="text-center">Clique aqui para ler as regras</p>
          </button>

          {/* Pricing */}
          <div className="space-y-3">
            <h3 className="text-zinc-400">Valores</h3>
            <button className="w-full bg-zinc-900 rounded-lg p-4 flex justify-between items-center">
              <span>Está é minha primeira categoria</span>
              <span className="text-[#0EA5E9]">R$110</span>
            </button>
            <button className="w-full bg-zinc-900 rounded-lg p-4 flex justify-between items-center">
              <span>Já estou inscrito em outra categoria</span>
              <span className="text-[#0EA5E9]">R$90</span>
            </button>
          </div>

          {/* Participants List */}
          <div className="space-y-3 pb-6">
            <h3 className="text-zinc-400">Participantes (12 inscritos)</h3>
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-zinc-900 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <img
                      src="/lovable-uploads/6e0fd4b5-bb25-459b-a6d4-dd1554ad50ec.png"
                      alt="Player 1"
                      className="w-8 h-8 rounded-full border-2 border-black"
                    />
                    <img
                      src="/lovable-uploads/6e0fd4b5-bb25-459b-a6d4-dd1554ad50ec.png"
                      alt="Player 2"
                      className="w-8 h-8 rounded-full border-2 border-black"
                    />
                  </div>
                  <div>
                    <p>Kleber Utrilha</p>
                    <p>Ronaldinho Gaúcho</p>
                  </div>
                </div>
                <button className="text-zinc-400">!</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Championship;
