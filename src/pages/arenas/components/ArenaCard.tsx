
import { ArenaWithDistance } from "../types";

interface ArenaCardProps {
  arena: ArenaWithDistance;
  activeFilter: 'all' | 'near';
  onClick: (arenaId: string) => void;
}

export const ArenaCard = ({ arena, activeFilter, onClick }: ArenaCardProps) => {
  return (
    <button
      className="w-full bg-zinc-900 rounded-lg p-4 flex items-center text-left"
      onClick={() => onClick(arena.id)}
    >
      <div className="mr-4">
        <img
          src={arena.main_image_url || "/placeholder.svg"}
          alt={arena.name}
          className="w-16 h-16 rounded-lg object-cover"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{arena.name}</h3>
        <p className="text-sm text-zinc-400">{arena.address}</p>
        {activeFilter === 'near' && (
          <p className="text-sm text-[#0EA5E9]">
            {arena.distance.toFixed(1)}km de distância
          </p>
        )}
      </div>
      <div className="text-zinc-400">›</div>
    </button>
  );
};
