
import { X } from "lucide-react";

interface Game {
  id: string;
  group: string;
  round: number;
  status: "finalized" | "in_progress" | "not_started";
  team1: {
    members: string;
    score?: number;
  };
  team2: {
    members: string;
    score?: number;
  };
}

interface GamesListProps {
  games: Game[];
}

export const GamesList = ({ games }: GamesListProps) => {
  // Group games by group label and round
  console.log("GamesList games:", games);
  

  // Status text mapping
  const getStatusText = (status: Game['status']) => {
    switch (status) {
      case 'finalized': return '(Finalizado)';
      case 'in_progress': return '(Em andamento)';
      case 'not_started': return '(Não iniciado)';
      default: return '';
    }
  };


  return (
    <div className="px-4 space-y-4">
      {games[0].map((game, index) => (
        
        <div key={game.id} className="bg-zinc-900 rounded-lg p-4">
          <h3 className="text-white font-bold mb-2">
            Fase {game.phase} - Grupo {game.group} ({game.status})
          </h3>
          <div className="grid grid-cols-11 gap-1 text-center items-center">
            <div className="col-span-5 text-left">
              <p className="text-white text-sm">{game.team_a}</p>
            </div>
            <div className="flex justify-center items-center">
              <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                <X size={16} className="text-white" />
              </div>
            </div>
            <div className="col-span-5 text-right">
              <p className="text-white text-sm">{game.team_b}</p>
            </div>
          </div>
          {game.status === 'finalizado' && (
            <div className="grid grid-cols-11 gap-1 text-center items-center mt-1">
              <div className="col-span-5">
                <p className="text-white text-2xl font-bold">{game.team_score}</p>
              </div>
              <div className="col-span-1"></div>
              <div className="col-span-5">
                <p className="text-white text-2xl font-bold">{game.opponent_team_score}</p>
              </div>
            </div>
          )}
          {game.status !== 'finalizado' && (
            <div className="grid grid-cols-11 gap-1 text-center items-center mt-2">
              <div className="col-span-5">
                <p className="text-white text-2xl">...</p>
              </div>
              <div className="col-span-1"></div>
              <div className="col-span-5">
                <p className="text-white text-2xl">...</p>
              </div>
            </div>
          )}
          
        </div>
      ))}
    </div>
  );
  
  
};
