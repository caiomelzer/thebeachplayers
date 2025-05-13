
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ChampionshipDetailsHeaderProps {
  title: string;
  logoUrl?: string;
}

export const ChampionshipDetailsHeader = ({ title, logoUrl }: ChampionshipDetailsHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="relative py-4">
      <button 
        onClick={() => navigate(-1)} 
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
