
import { X } from "lucide-react";

interface Game {
  id: string;
  group_label: string;
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
  const groupedGames: Record<string, Record<number, Game[]>> = {};
  
  games.forEach(game => {
    if (!groupedGames[game.group_label]) {
      groupedGames[game.group_label] = {};
    }
    if (!groupedGames[game.group_label][game.round]) {
      groupedGames[game.group_label][game.round] = [];
    }
    groupedGames[game.group_label][game.round].push(game);
  });

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
      {Object.keys(groupedGames).map(group => (
        <div key={group}>
          {Object.keys(groupedGames[group]).map(round => (
            <div key={`${group}-${round}`} className="mb-4">
              <div className="bg-zinc-900 rounded-lg p-4">
                <h3 className="text-white font-bold mb-2">
                  Grupo {group} - {parseInt(round)} Rodada {getStatusText(groupedGames[group][parseInt(round)][0].status)}
                </h3>
                
                {groupedGames[group][parseInt(round)].map(game => (
                  <div key={game.id} className="mb-4 last:mb-0">
                    <div className="grid grid-cols-11 gap-1 text-center items-center">
                      <div className="col-span-5 text-left">
                        <p className="text-white text-sm">{game.team1.members}</p>
                      </div>
                      <div className="flex justify-center items-center">
                        <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <X size={16} className="text-white" />
                        </div>
                      </div>
                      <div className="col-span-5 text-right">
                        <p className="text-white text-sm">{game.team2.members}</p>
                      </div>
                    </div>
                    
                    {game.status === 'finalized' && (
                      <div className="grid grid-cols-11 gap-1 text-center items-center mt-1">
                        <div className="col-span-5">
                          <p className="text-white text-2xl font-bold">{game.team1.score}</p>
                        </div>
                        <div className="col-span-1"></div>
                        <div className="col-span-5">
                          <p className="text-white text-2xl font-bold">{game.team2.score}</p>
                        </div>
                      </div>
                    )}
                    
                    {game.status !== 'finalized' && (
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
            </div>
          ))}
        </div>
      ))}
      
      {Object.keys(groupedGames).length === 0 && (
        <p className="text-center text-white py-6">Nenhum jogo disponível.</p>
      )}
    </div>
  );
};
