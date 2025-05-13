
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface ChampionshipDetailTabsProps {
  activeTab: "groups" | "matches" | "general";
  onChange: (tab: "groups" | "matches" | "general") => void;
}

export const ChampionshipDetailTabs = ({ activeTab, onChange }: ChampionshipDetailTabsProps) => {
  return (
    <div className="flex justify-center mt-4 mb-6">
      <Tabs 
        value={activeTab}
        onValueChange={(value) => onChange(value as "groups" | "matches" | "general")}
        className="w-full max-w-md"
      >
        <TabsList className="grid grid-cols-3 w-full bg-black">
          <TabsTrigger 
            value="groups"
            className={cn(
              "px-6 py-2 rounded-full text-white",
              activeTab === "groups" ? "bg-[#0EA5E9]" : "bg-zinc-800"
            )}
          >
            Grupos
          </TabsTrigger>
          <TabsTrigger 
            value="matches"
            className={cn(
              "px-6 py-2 rounded-full text-white",
              activeTab === "matches" ? "bg-[#0EA5E9]" : "bg-zinc-800"
            )}
          >
            Jogos
          </TabsTrigger>
          <TabsTrigger 
            value="general"
            className={cn(
              "px-6 py-2 rounded-full text-white",
              activeTab === "general" ? "bg-[#0EA5E9]" : "bg-zinc-800"
            )}
          >
            Geral
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
