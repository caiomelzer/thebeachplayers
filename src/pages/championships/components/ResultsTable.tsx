
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
  console.log("ResultsTable results:", results);
  return (
    <div className="px-4">
      <div className="bg-zinc-900 rounded-lg p-4">
        <h3 className="text-white font-bold mb-2">Geral</h3>
        
        <div className="grid grid-cols-12 text-sm text-white mb-1">
          <div className="col-span-7"></div>
          <div className="col-span-1 text-center">J</div>
          <div className="col-span-1 text-center">P</div>
          <div className="col-span-1 text-center">V</div>
          <div className="col-span-1 text-center">S</div>
          <div className="col-span-1 text-center">F</div>
        </div>

        {results.map((player, index) => (
          <div key={index} className="grid grid-cols-12 text-sm text-white py-1">
            <div className="col-span-7">
              {player.members.split(',').map((member, idx) => (
                <div key={idx}>{member.trim()}</div>
              ))}
            </div>
            <div className="col-span-1 text-center">{player.games}</div>
            <div className="col-span-1 text-center">{player.wins*2}</div>
            <div className="col-span-1 text-center">{player.wins}</div>
            <div className="col-span-1 text-center">{player.total}</div>
            <div className="col-span-1 text-center">{player.pros}</div>
          </div>
        ))}
        {results.length > 0 && (
          <div className="text-xs text-white mt-2">
            <hr className="col-span-12 border-t border-zinc-600 mb-2" />
            <p className="text-left text-white font-bold">Legenda</p>
            <p className="text-white">J - Jogos</p>
            <p className="text-white">P - Pontos</p>
            <p className="text-white">V - Vitórias</p>
            <p className="text-white">S - Saldo (Pontos a favor - Pontos Contra)</p>
            <p className="text-white">F - Pontos a favor</p>
          </div>
        )}
        {results.length === 0 && (
          <p className="text-center text-white py-2">Nenhum resultado disponível.</p>
        )}
      </div>
    </div>
  );
};
