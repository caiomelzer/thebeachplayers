
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { apiClient } from "@/integrations/api/client";
import { Team, TeamMember } from "@/types/database";

interface ComplaintLocationState {
  team: Team;
  championship: any;
  championshipId: string;
}

const Complaint = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get state from location or use fallback values
  const state = location.state as ComplaintLocationState | undefined;
  const team = state?.team;
  const championship = state?.championship;
  const championshipId = state?.championshipId;
  
  const modalityId = "9adbe036-f565-11ef-81b8-be0df3cad36e"; // Hardcoded modality ID
  console.log('championship:', team);
  const handleWrongCategory = async () => {
    if (!user) {
      toast.error('Você precisa estar logado para fazer uma denúncia');
      return;
    }

    if (!team || !championshipId) {
      toast.error('Dados do time ou campeonato não encontrados');
      return;
    }
    

    try {
      setIsSubmitting(true);
      
      // Post to the API endpoint
      const response = await apiClient.post(
        `/api/championships/${modalityId}/${championshipId}/${team.id}`,
        {
          reported_by_id: user.id,
          reason: 'Categoria incorreta'
        }
      );

      console.log('Complaint response:', response.data);
      
      // Send WhatsApp message
      const message = encodeURIComponent(
        `Olá, gostaria de reportar uma categoria incorreta no campeonato ${championship?.title || ''} (ID: ${championshipId}) sobre o time ${team[0].team}.`
      );
      
      // Use the contact from the championship data
      const contact = championship?.contact || "";
      window.open(`https://wa.me/55${contact}?text=${message}`, '_blank');

      toast.success('Denúncia enviada com sucesso!');
    } catch (error) {
      console.error('Error submitting complaint:', error);
      toast.error('Erro ao enviar denúncia');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fallback if no team data is provided
  if (!team || !championship) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
        <p>Nenhum dado do time disponível.</p>
        <button 
          onClick={() => navigate(-1)}
          className="mt-4 bg-[#0EA5E9] p-2 rounded-lg"
        >
          <ArrowLeft size={20} />
          <span className="ml-2">Voltar</span>
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative">
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 bg-[#0EA5E9] p-2 rounded-lg z-10"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="pt-20 px-6 text-center">
          <button 
            onClick={() => navigate(`/championship/${championshipId}`)} 
            className="inline-block mb-4"
          >
            <img
              src={championship.banner_url || "/lovable-uploads/logo.png"}
              alt={championship.title}
              className="w-24 h-24 rounded-full mx-auto"
            />
          </button>

          <h1 className="text-2xl font-bold mb-2">{championship.title}</h1>
          
          <p className="text-[#0EA5E9] text-lg mb-8">
            {championship.category}
          </p>

          <div className="space-y-4 mb-8">
            <h2 className="text-lg font-medium text-left">Time</h2>
            {Array.isArray(team) && team.map((member, index) => (
              <div
                key={index}
                className="w-full bg-zinc-900 rounded-lg p-4 flex items-center text-left"
              >
                <img
                  src={member.avatar_url || "/placeholder.svg"}
                  alt={member.nickname || `Jogador ${index + 1}`}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{member.fullname || "Jogador sem nome"} {"("+member.nickname+")"}</h3>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleWrongCategory}
            disabled={isSubmitting}
            className="w-full bg-red-500 text-white py-3 px-6 rounded-lg font-medium disabled:bg-gray-500"
          >
            {isSubmitting ? 'Enviando...' : 'Alertar categoria incorreta'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Complaint;
