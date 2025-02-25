
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Complaint = () => {
  const navigate = useNavigate();
  
  const handleWrongCategory = () => {
    const message = encodeURIComponent("Olá, gostaria de reportar uma categoria incorreta no campeonato.");
    window.open(`https://wa.me/5511980872469?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 bg-[#0EA5E9] p-2 rounded-lg z-10"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Championship Info */}
        <div className="pt-20 px-6 text-center">
          {/* Avatar Group */}
          <div className="flex justify-center -space-x-4 mb-4">
            <img
              src="/lovable-uploads/logo.png"
              alt="R2"
              className="w-12 h-12 rounded-full border-2 border-black"
            />
            <img
              src="/lovable-uploads/6e0fd4b5-bb25-459b-a6d4-dd1554ad50ec.png"
              alt="Player 1"
              className="w-12 h-12 rounded-full border-2 border-black"
            />
            <img
              src="/lovable-uploads/6e0fd4b5-bb25-459b-a6d4-dd1554ad50ec.png"
              alt="Player 2"
              className="w-12 h-12 rounded-full border-2 border-black"
            />
          </div>

          {/* Championship Title */}
          <h1 className="text-2xl font-bold mb-2">R2 - Segunda Etapa</h1>
          
          {/* Players Names */}
          <p className="text-lg mb-2">
            Kleber Utrilha / Ronaldinho gaúcho
          </p>

          {/* Category */}
          <p className="text-[#0EA5E9] text-lg mb-8">
            Dupla Misto Intermediário
          </p>

          {/* Action Button */}
          <button
            onClick={handleWrongCategory}
            className="w-full bg-red-500 text-white py-3 px-6 rounded-lg font-medium"
          >
            Alertar categoria incorreta
          </button>
        </div>
      </div>
    </div>
  );
};

export default Complaint;
