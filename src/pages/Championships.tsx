
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

import { fetchChampionships } from "./championships/services/championshipService";
import { applyChampionshipFilters } from "./championships/utils/filters";
import { ChampionshipHeader } from "./championships/components/ChampionshipHeader";
import { ChampionshipSearchBar } from "./championships/components/ChampionshipSearchBar";
import { ChampionshipFilters } from "./championships/components/ChampionshipFilters";
import { ChampionshipCard } from "./championships/components/ChampionshipCard";
const modalityId = "9adbe036-f565-11ef-81b8-be0df3cad36e"; // Hardcoded modality ID

const Championships = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<'all' | 'soon' | 'registered'>('all');
  const [searchTerm, setSearchTerm] = useState("");

  const { 
    data: championships = [], 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['championships'],
    queryFn: () => fetchChampionships(modalityId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    meta: {
      onError: (error: Error) => {
        console.error("Error fetching championships:", error);
        toast.error("Erro ao buscar campeonatos");
      }
    }
  });

  const filteredChampionships = applyChampionshipFilters(
    championships,
    activeFilter,
    searchTerm
  );

  if (isLoading) return <p className="text-center text-white">Carregando...</p>;
  if (error) return <p className="text-center text-red-500">{(error as Error).message}</p>;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-6">
        <ChampionshipHeader onBackClick={() => navigate('/home')} />
        
        <ChampionshipSearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        
        <ChampionshipFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {filteredChampionships.length === 0 && (
          <div className="text-center py-8 text-zinc-400">
            Nenhum campeonato encontrado
          </div>
        )}

        <div className="space-y-4">
          {filteredChampionships.map((championship) => (
            <ChampionshipCard
              key={championship.id}
              championship={championship}
              onClick={(id) => navigate(`/championship/${id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Championships;
