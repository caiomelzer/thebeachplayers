
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface UserStats {
  ranking: number;
  totalPlayers: number;
  rankingChange: number;
  categoryMinScore: number;
  categoryName: string;
  matchesLast6Months: number;
  totalMatches: number;
  victories: number;
  defeats: number;
}

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [activeModalities, setActiveModalities] = useState<string[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      try {
        // Fetch user's active modalities
        const { data: modalities } = await supabase
          .from('user_modalities')
          .select('modality')
          .eq('user_id', user.id)
          .eq('status', 'active');

        if (modalities) {
          setActiveModalities(modalities.map(m => m.modality));
        }

        // TODO: Implement the queries to fetch actual stats
        // For now, using mock data
        setUserStats({
          ranking: 178,
          totalPlayers: 1000,
          rankingChange: 36,
          categoryMinScore: 1000,
          categoryName: 'Intermediário',
          matchesLast6Months: 51,
          totalMatches: 100,
          victories: 19,
          defeats: 32
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [user]);

  if (!user || !userStats) return null;

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
            src={user.avatar_url || "/lovable-uploads/kleber.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4"
          />
          <h1 className="text-2xl font-bold">{user.full_name}</h1>
          <p className="text-zinc-400 mb-4">#{user.id.slice(0, 6)}</p>
          
          <div className="flex gap-4 text-sm mb-6">
            {activeModalities.map((modality) => (
              <span 
                key={modality}
                className={modality === activeModalities[0] ? 
                  "bg-[#0EA5E9] px-4 py-1 rounded-full" : 
                  "bg-zinc-800/50 text-zinc-400 px-4 py-1 rounded-full"}
              >
                {modality.replace('_', ' ')}
              </span>
            ))}
          </div>

          <div className="w-full space-y-4">
            <div className="bg-zinc-900 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg">Ranking Geral</h2>
                <span className="text-[#0EA5E9] text-xl font-bold">
                  #{userStats.ranking.toString().padStart(5, '0')}
                </span>
              </div>
              <p className="text-sm text-zinc-400">
                {userStats.rankingChange > 0
                  ? `Subiu ${userStats.rankingChange} posições no último mês`
                  : `Desceu ${Math.abs(userStats.rankingChange)} posições no último mês`}
              </p>
            </div>

            <div className="bg-zinc-900 rounded-lg p-4">
              <h2 className="text-lg mb-2">Categoria Mínima Permitida</h2>
              <p className="text-[#0EA5E9] font-bold mb-1">{userStats.categoryName}</p>
              <p className="text-sm text-zinc-400">
                ou score mínimo {userStats.categoryMinScore} pontos
              </p>
            </div>

            <div className="bg-zinc-900 rounded-lg p-4">
              <h2 className="text-lg mb-4">Campeonatos Disputados</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-4xl font-bold">{userStats.matchesLast6Months}</p>
                  <p className="text-sm text-zinc-400">nos últimos 6 meses</p>
                </div>
                <div>
                  <p className="text-4xl font-bold">{userStats.totalMatches}</p>
                  <p className="text-sm text-zinc-400">desde que se cadastrou</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-900 rounded-lg p-4">
                <h2 className="text-lg mb-4">Vitórias</h2>
                <p className="text-4xl font-bold">{userStats.victories}</p>
              </div>

              <div className="bg-zinc-900 rounded-lg p-4">
                <h2 className="text-lg mb-4">Derrotas</h2>
                <p className="text-4xl font-bold">{userStats.defeats}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
