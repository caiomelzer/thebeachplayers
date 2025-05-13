
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ChampionshipDetailTabsProps {
  activeTab: "groups" | "matches" | "general";
  onChange: (tab: "groups" | "matches" | "general") => void;
}

export const ChampionshipDetailTabs = ({ activeTab, onChange }: ChampionshipDetailTabsProps) => {
  return (
    <div className="flex justify-center space-x-2 mt-4 mb-6">
      <button
        onClick={() => onChange("groups")}
        className={cn(
          "px-6 py-2 rounded-full text-white",
          activeTab === "groups" ? "bg-[#0EA5E9]" : "bg-zinc-800"
        )}
      >
        Grupos
      </button>
      <button
        onClick={() => onChange("matches")}
        className={cn(
          "px-6 py-2 rounded-full text-white",
          activeTab === "matches" ? "bg-[#0EA5E9]" : "bg-zinc-800"
        )}
      >
        Jogos
      </button>
      <button
        onClick={() => onChange("general")}
        className={cn(
          "px-6 py-2 rounded-full text-white",
          activeTab === "general" ? "bg-[#0EA5E9]" : "bg-zinc-800"
        )}
      >
        Geral
      </button>
    </div>
  );
};
