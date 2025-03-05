
interface Player {
  id: string;
  nickname: string;
  name: string;
  category: string;
  avatar_url: string;
}

interface PlayerCardProps {
  player: Player;
  onClick: (id: string) => void;
}

export const PlayerCard = ({ player, onClick }: PlayerCardProps) => {
  return (
    <button
      key={player.id}
      className="w-full bg-zinc-900 rounded-lg p-4 flex items-center text-left"
      onClick={() => onClick(player.id)}
    >
      <div className="mr-4">
        <img
          src={player.avatar_url || "/placeholder.svg"}
          alt={`${player.nickname}'s avatar`}
          className="w-12 h-12 rounded-full object-cover"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{player.nickname}</h3>
        <p className="text-sm text-zinc-400">{player.name}</p>
        <p className="text-sm text-zinc-400">{player.category}</p>
      </div>
      <div className="text-zinc-400">›</div>
    </button>
  );
};
