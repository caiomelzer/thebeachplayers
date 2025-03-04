import { useEffect, useState } from "react";
import { ArrowLeft, Phone, Globe, MapPin, Instagram } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const API_URL = "http://143.198.75.127:3000/api/arena/";

const ArenaDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [arena, setArena] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArenaDetails = async () => {
      try {
        const response = await fetch(`${API_URL}${id}`);
        if (!response.ok) throw new Error("Erro ao buscar detalhes da arena");
        const data = await response.json();
        setArena(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchArenaDetails();
  }, [id]);

  if (loading) return <p className="text-center text-white">Carregando...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!arena) return <p className="text-center text-white">Nenhuma informação disponível.</p>;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative">
        <button 
          onClick={() => navigate('/arenas')}
          className="absolute top-6 left-6 bg-[#0EA5E9] p-2 rounded-lg z-10"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="mb-6">
          <Carousel className="w-full">
            <CarouselContent>
              {arena.images?.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-video w-full">
                    <img
                      src={image}
                      alt={`${arena.name} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">{arena.name}</h1>
            <div className="flex items-center text-zinc-400">
              <MapPin size={16} className="mr-2" />
              <p className="text-sm">{arena.address}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <a href={`tel:${arena.phone}`} className="flex items-center justify-center bg-zinc-900 rounded-lg p-4 text-center">
              <Phone size={20} className="mr-2" />
              <span>Ligar</span>
            </a>
            <a
              href={`https://instagram.com/${arena.instagram?.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-zinc-900 rounded-lg p-4 text-center"
            >
              <Instagram size={20} className="mr-2" />
              <span>Instagram</span>
            </a>
          </div>

          {arena.website && (
            <a
              href={arena.website}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-zinc-900 rounded-lg p-4 text-center"
            >
              <div className="flex items-center justify-center">
                <Globe size={20} className="mr-2" />
                <span>Visitar site</span>
              </div>
            </a>
          )}

          {arena.prices && (
            <div className="bg-zinc-900 rounded-lg p-4">
              <h2 className="font-medium mb-4">Preços</h2>
              <div className="space-y-2">
                {arena.prices.map((price, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-zinc-400">{price.title}</span>
                    <span className="text-[#0EA5E9]">{price.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArenaDetails;
