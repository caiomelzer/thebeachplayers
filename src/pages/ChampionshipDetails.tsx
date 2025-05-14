import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { ChampionshipDetailsHeader } from "./championships/components/ChampionshipDetailsHeader";
import { ChampionshipDetailTabs } from "./championships/components/ChampionshipDetailTabs";
import { GroupTable } from "./championships/components/GroupTable";
import { GamesList } from "./championships/components/GamesList";
import { ResultsTable } from "./championships/components/ResultsTable";
import { fetchChampionshipGroups, GroupTeam } from "./championships/services/championshipGroupsService";
import { fetchChampionshipDetail } from "./championships/services/championshipDetailService";
import { fetchChampionshipGames } from "./championships/services/championshipGamesService";
import { fetchChampionshipResults } from "./championships/services/championshipResultsService";

const modalityId = "9adbe036-f565-11ef-81b8-be0df3cad36e"; // Hardcoded modality ID

const ChampionshipDetails = () => {
  const { id: championshipId } = useParams();
  const navigate = useNavigate();
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
    enabled: !!championshipId && activeTab === "groups",
    meta: {
      onError: (error: Error) => {
        console.error("Error fetching championship groups:", error);
        toast.error("Erro ao buscar grupos do campeonato");
      }
    }
  });

  const {
    data: games,
    isLoading: isLoadingGames
  } = useQuery({
    queryKey: ['championship-games', championshipId],
    queryFn: () => championshipId ? fetchChampionshipGames(modalityId, championshipId) : Promise.reject(new Error("ID não fornecido")),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: !!championshipId && activeTab === "matches",
    meta: {
      onError: (error: Error) => {
        console.error("Error fetching championship games:", error);
        toast.error("Erro ao buscar jogos do campeonato");
      }
    }
  });
  console.log("Games:", games);

  const {
    data: results,
    isLoading: isLoadingResults
  } = useQuery({
    queryKey: ['championship-results', championshipId],
    queryFn: () => championshipId ? fetchChampionshipResults(modalityId, championshipId) : Promise.reject(new Error("ID não fornecido")),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: !!championshipId && activeTab === "general",
    meta: {
      onError: (error: Error) => {
        console.error("Error fetching championship results:", error);
        toast.error("Erro ao buscar resultados do campeonato");
      }
    }
  });

  // Group teams by group label
  const groupedTeams = groups && Array.isArray(groups) 
    ? groups.reduce((acc: Record<string, GroupTeam[]>, team: GroupTeam) => {
        if (!acc[team.group_label]) {
          acc[team.group_label] = [];
        }
        acc[team.group_label].push(team);
        return acc;
      }, {} as Record<string, GroupTeam[]>)
    : {};

  console.log("Grouped Teams:", groups);

  const renderContent = () => {
    if ((isLoadingChampionship && activeTab === "groups") || 
        (isLoadingGroups && activeTab === "groups") || 
        (isLoadingGames && activeTab === "matches") || 
        (isLoadingResults && activeTab === "general")) {
      return <p className="text-center text-white py-6">Carregando...</p>;
    }

    switch (activeTab) {
      case "groups":
        if (!groups || !Array.isArray(groups) || groups.length === 0) {
          return <p className="text-center text-white py-6">Nenhum grupo disponível.</p>;
        }
        return (
          <div className="px-4">
            {groups.map(group => (
              <GroupTable 
                key={group.label} 
                name={`Grupo ${group.label}`}
                teams={group.teams.map(team => ({
                  teamId: team.team_id || 0,
                  members: team.members || 0,
                  j: team.games || 0, 
                  p: team.wins || 0, 
                  v: team.wins || 0,
                  d: team.defeats || 0,
                  s: team.total || 0
                }))}
              />
            ))}
          </div>
        );
      case "matches":
        if (!games || !Array.isArray(games) || games.length === 0) {
          return <p className="text-center text-white py-6">Nenhum jogo disponível.</p>;
        }
        return <GamesList games={games} />;
      case "general":
        if (!results || !Array.isArray(results) || results.length === 0) {
          return <p className="text-center text-white py-6">Nenhum resultado disponível.</p>;
        }
        return <ResultsTable results={results} />;
      default:
        return null;
    }
  };

  const handleBackClick = () => {
    navigate(`/championship/${championshipId}`);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="px-4 pt-4 pb-20">
        <ChampionshipDetailsHeader 
          title={championship?.title || "Campeonato"} 
          logoUrl={championship?.banner_url}
          onBackClick={handleBackClick}
        />

        <ChampionshipDetailTabs activeTab={activeTab} onChange={setActiveTab} />

        {renderContent()}
      </div>
    </div>
  );
};

export default ChampionshipDetails;