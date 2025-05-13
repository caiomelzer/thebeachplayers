
import { ChevronLeft } from "lucide-react";

interface ChampionshipDetailsHeaderProps {
  title: string;
  logoUrl?: string;
  onBackClick: () => void;
}

export const ChampionshipDetailsHeader = ({ title, logoUrl, onBackClick }: ChampionshipDetailsHeaderProps) => {
  return (
    <div className="relative py-4">
      <button 
        onClick={onBackClick} 
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#0EA5E9] rounded-full p-1.5"
      >
        <ChevronLeft className="h-5 w-5 text-white" />
      </button>
      <div className="text-center">
        <img
          src={logoUrl || "/lovable-uploads/logo.png"}
          alt="Championship logo"
          className="w-16 h-16 rounded-full mx-auto mb-2 bg-white"
        />
        <h1 className="text-xl font-bold text-white">{title}</h1>
      </div>
    </div>
  );
};
