
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TeamMember {
  id: number;
  nickname: string;
  name: string;
  level: string;
  avatar: string;
}

const Complaint = () => {
  const navigate = useNavigate();
  
  const handleWrongCategory = () => {
    const message = encodeURIComponent("Olá, gostaria de reportar uma categoria incorreta no campeonato.");
    window.open(`https://wa.me/5511980872469?text=${message}`, '_blank');
  };

  // Mock data for the team members
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      nickname: "KleberU",
      name: "Kleber Utrilha",
      level: "Intermediário",
      avatar: "/lovable-uploads/6e0fd4b5-bb25-459b-a6d4-dd1554ad50ec.png"
    },
    {
      id: 2,
      nickname: "RonaldoG",
      name: "Ronaldinho Gaúcho",
      level: "Avançado",
      avatar: "/lovable-uploads/6e0fd4b5-bb25-459b-a6d4-dd1554ad50ec.png"
    }
  ];

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
          {/* Championship Avatar - Now Clickable */}
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

          {/* Championship Title */}
          <h1 className="text-2xl font-bold mb-2">R2 - Segunda Etapa</h1>
          
          {/* Category */}
          <p className="text-[#0EA5E9] text-lg mb-8">
            Dupla Misto Intermediário
          </p>

          {/* Team Members List */}
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
