
interface PlayerResult {
  members: string;
  j: number; // Jogos
  p: number; // Pontos
  v: number; // Vitórias
  d: number; // Derrotas
  s: string; // Saldo
}

interface ResultsTableProps {
  results: PlayerResult[];
}

export const ResultsTable = ({ results }: ResultsTableProps) => {
  return (
    <div className="px-4">
      <div className="bg-zinc-900 rounded-lg p-4">
        <h3 className="text-white font-bold mb-2">Geral</h3>
        
        <div className="grid grid-cols-12 text-sm text-white mb-1">
          <div className="col-span-7"></div>
          <div className="col-span-1 text-center">J</div>
          <div className="col-span-1 text-center">P</div>
          <div className="col-span-1 text-center">V</div>
          <div className="col-span-1 text-center">D</div>
          <div className="col-span-1 text-center">S</div>
        </div>

        {results.map((player, index) => (
          <div key={index} className="grid grid-cols-12 text-sm text-white py-1">
            <div className="col-span-7">
              {player.members.split(',').map((member, idx) => (
                <div key={idx}>{member.trim()}</div>
              ))}
            </div>
            <div className="col-span-1 text-center">{player.j}</div>
            <div className="col-span-1 text-center">{player.p}</div>
            <div className="col-span-1 text-center">{player.v}</div>
            <div className="col-span-1 text-center">{player.d}</div>
            <div className="col-span-1 text-center">{player.s}</div>
          </div>
        ))}
        
        {results.length === 0 && (
          <p className="text-center text-white py-2">Nenhum resultado disponível.</p>
        )}
      </div>
    </div>
  );
};
