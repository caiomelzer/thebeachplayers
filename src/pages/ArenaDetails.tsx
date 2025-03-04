
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { MapPin } from "lucide-react";
import { toast } from "sonner";

import { fetchArenaDetail } from "./arenas/services/arenaDetailService";
import { ArenaDetailHeader } from "./arenas/components/ArenaDetailHeader";
import { ArenaImageCarousel } from "./arenas/components/ArenaImageCarousel";
import { ArenaContactInfo } from "./arenas/components/ArenaContactInfo";
import { ArenaPriceList } from "./arenas/components/ArenaPriceList";

const ArenaDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { 
    data: arena, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['arena', id],
    queryFn: () => id ? fetchArenaDetail(id) : Promise.reject(new Error("ID não fornecido")),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    onError: (error) => {
      console.error("Error fetching arena details:", error);
      toast.error("Erro ao buscar detalhes da arena");
    }
  });

  if (isLoading) return <p className="text-center text-white">Carregando...</p>;
  if (error) return <p className="text-center text-red-500">{(error as Error).message}</p>;
  if (!arena) return <p className="text-center text-white">Nenhuma informação disponível.</p>;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative">
        <ArenaDetailHeader onBackClick={() => navigate('/arenas')} />

        {arena.images && arena.images.length > 0 && (
          <ArenaImageCarousel images={arena.images} arenaName={arena.name} />
        )}

        <div className="p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">{arena.name}</h1>
            <div className="flex items-center text-zinc-400">
              <MapPin size={16} className="mr-2" />
              <p className="text-sm">{arena.address}</p>
            </div>
          </div>

          <ArenaContactInfo 
            phone={arena.phone} 
            instagram={arena.instagram} 
            website={arena.website} 
          />

          {arena.prices && <ArenaPriceList prices={arena.prices} />}
        </div>
      </div>
    </div>
  );
};

export default ArenaDetails;
