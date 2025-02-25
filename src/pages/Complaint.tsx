
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
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="bg-[#0EA5E9] p-2 rounded-lg"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold flex-1 text-center">Denunciar</h1>
          <div className="w-8"></div>
        </div>

        {/* Complaint Options */}
        <div className="space-y-4 mt-6">
          <button 
            onClick={handleWrongCategory}
            className="w-full bg-zinc-900 rounded-lg p-4 text-left flex items-center justify-between"
          >
            <span>Alertar categoria incorreta</span>
            <span className="text-zinc-400">›</span>
          </button>
          
          <button className="w-full bg-zinc-900 rounded-lg p-4 text-left flex items-center justify-between">
            <span>Denunciar atleta</span>
            <span className="text-zinc-400">›</span>
          </button>
          
          <button className="w-full bg-zinc-900 rounded-lg p-4 text-left flex items-center justify-between">
            <span>Reportar problema</span>
            <span className="text-zinc-400">›</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Complaint;
