
import { ArrowLeft } from "lucide-react";

interface ArenaHeaderProps {
  onBackClick: () => void;
}

export const ArenaHeader = ({ onBackClick }: ArenaHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <button 
        onClick={onBackClick}
        className="bg-[#0EA5E9] p-2 rounded-lg"
      >
        <ArrowLeft size={20} />
      </button>
      <h1 className="text-xl font-bold flex-1 text-center">Arenas</h1>
      <div className="w-8"></div>
    </div>
  );
};
