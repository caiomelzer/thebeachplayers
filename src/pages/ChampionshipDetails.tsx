
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { ChampionshipDetailsHeader } from "./championships/components/ChampionshipDetailsHeader";
import { ChampionshipDetailTabs } from "./championships/components/ChampionshipDetailTabs";
import { GroupTable } from "./championships/components/GroupTable";
import { fetchChampionshipGroups } from "./championships/services/championshipGroupsService";
import { fetchChampionshipDetail } from "./championships/services/championshipDetailService";

const modalityId = "9adbe036-f565-11ef-81b8-be0df3cad36e"; // Hardcoded modality ID

const ChampionshipDetails = () => {
  const { id: championshipId } = useParams();
  const [activeTab, setActiveTab] = useState<"groups" | "matches" | "general">("groups");

  const { 
    data: championship, 
    isLoading: isLoadingChampionship
  } = useQuery({
    queryKey: ['championship', championshipId],
    queryFn: () => championshipId ? fetchChampionshipDetail(championshipId, modalityId) : Promise.reject(new Error("ID não fornecido")),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    meta: {
      onError: (error: Error) => {
        console.error("Error fetching championship details:", error);
        toast.error("Erro ao buscar detalhes do campeonato");
      }
    }
  });

  const { 
    data: groups,
    isLoading: isLoadingGroups
  } = useQuery({
    queryKey: ['championship-groups', championshipId],
    queryFn: () => championshipId ? fetchChampionshipGroups(modalityId, championshipId) : Promise.reject(new Error("ID não fornecido")),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    enabled: !!championshipId,
    meta: {
      onError: (error: Error) => {
        console.error("Error fetching championship groups:", error);
        toast.error("Erro ao buscar grupos do campeonato");
      }
    }
  });

  const renderContent = () => {
    if (isLoadingChampionship || isLoadingGroups) {
      return <p className="text-center text-white py-6">Carregando...</p>;
    }

    switch (activeTab) {
      case "groups":
        if (!groups || groups.length === 0) {
          return <p className="text-center text-white py-6">Nenhum grupo disponível.</p>;
        }
        return (
          <div className="px-4">
            {Array.isArray(groups) && groups.map((group, index) => (
              <GroupTable 
                key={index} 
                name={`Grupo ${String.fromCharCode(65 + index)}`} // A, B, C, etc.
                teams={(group?.teams || []).map(team => ({
                  players: team.players.map(player => ({ name: player.name || player.nickname })),
                  j: team.matches || 0,
                  p: team.points || 0,
                  v: team.victories || 0,
                  d: team.defeats || 0,
                  s: team.balance || 0
                }))}
              />
            ))}
          </div>
        );
      case "matches":
        return <p className="text-center text-white py-6">Informações sobre jogos em breve.</p>;
      case "general":
        return <p className="text-center text-white py-6">Informações gerais em breve.</p>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="px-4 pt-4 pb-20">
        <ChampionshipDetailsHeader 
          title={championship?.title || "Campeonato"} 
          logoUrl={championship?.banner_url}
        />

        <ChampionshipDetailTabs activeTab={activeTab} onChange={setActiveTab} />

        {renderContent()}
      </div>
    </div>
  );
};

export default ChampionshipDetails;
