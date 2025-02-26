
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Bem-vindo, {user?.full_name || 'Atleta'}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            onClick={() => navigate('/championships')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Campeonatos
          </Button>
          
          <Button
            onClick={() => navigate('/arenas')}
            className="bg-green-600 hover:bg-green-700"
          >
            Arenas
          </Button>
          
          <Button
            onClick={() => navigate('/players')}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Jogadores
          </Button>
          
          <Button
            onClick={() => navigate('/profile')}
            className="bg-yellow-600 hover:bg-yellow-700"
          >
            Meu Perfil
          </Button>
        </div>
      </div>
    </div>
  );
}
