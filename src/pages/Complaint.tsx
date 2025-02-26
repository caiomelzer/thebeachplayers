
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface TeamMember {
  id: number;
  nickname: string;
  name: string;
  level: string;
  avatar: string;
}

const Complaint = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleWrongCategory = async () => {
    if (!user) {
      toast.error('Você precisa estar logado para fazer uma denúncia');
      return;
    }

    try {
      setIsSubmitting(true);

      // Save complaint to database
      const { data: complaint, error } = await supabase
        .from('complaints')
        .insert({
          team_id: '123', // Replace with actual team ID from context/params
          reported_by_id: user.id,
          message: 'Categoria incorreta no campeonato',
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      // Send WhatsApp message
      const message = encodeURIComponent(
        `Olá, gostaria de reportar uma categoria incorreta no campeonato.\nDenúncia ID: ${complaint.id}`
      );
      window.open(`https://wa.me/5511980872469?text=${message}`, '_blank');

      toast.success('Denúncia enviada com sucesso!');
    } catch (error) {
      console.error('Error submitting complaint:', error);
      toast.error('Erro ao enviar denúncia');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mock data for the team members
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      nickname: "Klebinho",
      name: "Kleber Utrilha",
      level: "Intermediário",
      avatar: "/lovable-uploads/kleber.png"
    },
    {
      id: 2,
      nickname: "Bruxo",
      name: "Ronaldinho Gaúcho",
      level: "Avançado",
      avatar: "/lovable-uploads/ronaldinho.png"
    }
  ];

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
            onClick={() => navigate('/championship/123')} 
            className="inline-block mb-4"
          >
            <img
              src="/lovable-uploads/logo.png"
              alt="Championship"
              className="w-24 h-24 rounded-full mx-auto"
            />
          </button>

          <h1 className="text-2xl font-bold mb-2">R2 - Segunda Etapa</h1>
          
          <p className="text-[#0EA5E9] text-lg mb-8">
            Dupla Misto Intermediário
          </p>

          <div className="space-y-4 mb-8">
            <h2 className="text-lg font-medium text-left">Integrantes</h2>
            {teamMembers.map((member) => (
              <button
                key={member.id}
                onClick={() => navigate(`/player/${member.id}`)}
                className="w-full bg-zinc-900 rounded-lg p-4 flex items-center text-left"
              >
                <img
                  src={member.avatar}
                  alt={member.nickname}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{member.nickname}</h3>
                  <p className="text-sm text-zinc-400">{member.name}</p>
                  <p className="text-sm text-zinc-400">{member.level}</p>
                </div>
                <div className="text-zinc-400">›</div>
              </button>
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
