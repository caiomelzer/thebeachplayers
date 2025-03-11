
import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { apiClient } from "@/integrations/api/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User } from "lucide-react";

type TeamMember = {
  player_id: string;
  nickname?: string;
  avatar_url?: string;
  rating?: string;
  whatsapp?: string;
};

type TeamData = {
  championship_id: string;
  team_members: TeamMember[];
};

const CreateTeam = () => {
  const navigate = useNavigate();
  const { id: championshipId } = useParams();
  const location = useLocation();
  const { user } = useAuth();
  
  // Get data from location state or use defaults
  const championshipData = location.state?.championshipData || {};
  const initialTeamMembers = location.state?.teamMembers || [];
  
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize team with current user if no team members provided
  useEffect(() => {
    console.log("Location state:", location.state);
    console.log("Initial team members:", initialTeamMembers);
    
    // Only initialize if we don't have team members from state
    if (initialTeamMembers.length === 0 && user) {
      // First slot is always the current user
      const newTeamMembers = [
        {
          player_id: user.id,
          nickname: user.nickname || "Usuário",
          avatar_url: user.avatar_url,
          rating: user.rating?.toString(),
          whatsapp: "", // We don't have this in our user type yet
        },
      ];
      
      // Add empty slots based on championship requirements
      const requiredPlayers = championshipData.players_per_team || 2;
      const emptySlots = requiredPlayers - 1; // -1 because we already have the user
      
      if (emptySlots > 0) {
        const emptySlotsArray = Array(emptySlots).fill(null).map(() => ({
          player_id: "",
          nickname: "",
          avatar_url: "",
          rating: "",
          whatsapp: "",
        }));
        
        setTeamMembers([...newTeamMembers, ...emptySlotsArray]);
      } else {
        setTeamMembers(newTeamMembers);
      }
    }
  }, [user, championshipData, initialTeamMembers]);

  const handleSelectPlayer = (index: number) => {
    console.log("Selecting player for index:", index);
    navigate("/select-player", { 
      state: { 
        teamMemberIndex: index,
        teamMembers,
        championshipId,
        championshipData 
      } 
    });
  };

  const handleSubmitTeam = async () => {
    // Check if all slots are filled
    const emptySlots = teamMembers.filter(member => !member.player_id);
    if (emptySlots.length > 0) {
      toast.error("Por favor, preencha todas as vagas do time");
      return;
    }

    setIsLoading(true);

    try {
      const teamData: TeamData = {
        championship_id: championshipId || "",
        team_members: teamMembers,
      };

      console.log("Submitting team data:", teamData);

      // Send the team registration to the API
      const response = await apiClient.post(`/api/championships/${championshipId}/teams`, teamData);
      
      if (response.data) {
        toast.success("Time criado com sucesso!");
        
        // Prepare WhatsApp message
        const playersList = teamMembers.map(player => 
          `${player.nickname || "Jogador"}`
        ).join(", ");
        
        const message = encodeURIComponent(
          `Solicitação de Inscrição no campeonato ${championshipData.title} (${championshipId}) dos jogadores: ${playersList}`
        );
        
        // Open WhatsApp with the message
        if (championshipData.contact) {
          window.open(`https://wa.me/55${championshipData.contact}?text=${message}`, '_blank');
        }
        
        // Navigate back to championship page
        navigate(`/championship/${championshipId}`);
      }
    } catch (error) {
      console.error("Error creating team:", error);
      toast.error("Erro ao criar time. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate(`/championship/${championshipId}`)} 
            className="w-10 h-10 flex items-center justify-center bg-blue-500 rounded-lg mr-4"
          >
            <ArrowLeft className="text-white" size={24} />
          </button>
          <h1 className="text-xl font-semibold">Vagas ({teamMembers.filter(member => member.player_id).length}/{teamMembers.length})</h1>
        </div>

        {/* Team Members List */}
        <div className="space-y-4 mb-6">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="w-full bg-zinc-900 rounded-lg p-4 flex items-center text-left"
              onClick={() => index !== 0 && handleSelectPlayer(index)}
            >
              <div className="mr-4">
                {member.avatar_url ? (
                  <img
                    src={member.avatar_url}
                    alt={`${member.nickname}'s avatar`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                    <User className="text-zinc-400" size={24} />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{member.nickname || "Selecionar jogador"}</h3>
                {member.rating && (
                  <p className="text-sm text-zinc-400">Ranking: {member.rating} | Score: {member.rating}</p>
                )}
              </div>
              {index !== 0 && (
                <div className="text-zinc-400">›</div>
              )}
            </div>
          ))}
        </div>

        {/* Save Button */}
        <Button 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3"
          onClick={handleSubmitTeam}
          disabled={isLoading || teamMembers.some(member => !member.player_id)}
        >
          {isLoading ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </div>
  );
};

export default CreateTeam;
