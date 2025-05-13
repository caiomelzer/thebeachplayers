
interface Player {
  name: string;
  partner?: string;
}

interface TeamRecord {
  players: Player[];
  j: number; // Jogos
  p: number; // Pontos
  v: number; // Vitórias
  d: number; // Derrotas
  s: number; // Saldo
}

interface GroupProps {
  name: string;
  teams: TeamRecord[];
}

export const GroupTable = ({ name, teams }: GroupProps) => {
  return (
    <div className="mb-6 bg-zinc-900 rounded-lg p-4">
      <h3 className="text-white font-bold mb-2">{name}</h3>
      <div className="grid grid-cols-12 text-sm text-white mb-1">
        <div className="col-span-7"></div>
        <div className="col-span-1 text-center">J</div>
        <div className="col-span-1 text-center">P</div>
        <div className="col-span-1 text-center">V</div>
        <div className="col-span-1 text-center">D</div>
        <div className="col-span-1 text-center">S</div>
      </div>
      {teams.map((team, index) => (
        <div key={index} className="grid grid-cols-12 text-sm text-white py-1">
          <div className="col-span-7">
            {team.players.map((player, idx) => (
              <div key={idx}>{player.name}</div>
            ))}
          </div>
          <div className="col-span-1 text-center">{team.j}</div>
          <div className="col-span-1 text-center">{team.p}</div>
          <div className="col-span-1 text-center">{team.v}</div>
          <div className="col-span-1 text-center">{team.d}</div>
          <div className="col-span-1 text-center">{team.s}</div>
        </div>
      ))}
    </div>
  );
};
