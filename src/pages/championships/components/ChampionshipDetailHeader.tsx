
import { ArrowLeft } from "lucide-react";

interface ChampionshipDetailHeaderProps {
  onBackClick: () => void;
}

export const ChampionshipDetailHeader = ({ onBackClick }: ChampionshipDetailHeaderProps) => {
  return (
    <button 
      onClick={onBackClick}
      className="absolute top-6 left-6 bg-[#0EA5E9] p-2 rounded-lg z-10"
    >
      <ArrowLeft size={20} />
    </button>
  );
};
