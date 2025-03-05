
import { ArrowLeft } from "lucide-react";

interface PlayerDetailHeaderProps {
  onBackClick: () => void;
}

export const PlayerDetailHeader = ({ onBackClick }: PlayerDetailHeaderProps) => {
  return (
    <button 
      onClick={onBackClick}
      className="bg-[#0EA5E9] p-2 rounded-lg mb-6"
    >
      <ArrowLeft size={20} />
    </button>
  );
};
