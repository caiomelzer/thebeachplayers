
type Sport = 'volei' | 'futvolei' | 'beachtennis';

interface PlayerFiltersProps {
  activeFilter: Sport;
  onFilterChange: (filter: Sport) => void;
}

export const PlayerFilters = ({ activeFilter, onFilterChange }: PlayerFiltersProps) => {
  return (
    <div className="grid grid-cols-3 gap-2 mb-6">
      <button 
        onClick={() => onFilterChange('volei')}
        className={`px-4 py-2 rounded-full text-center ${
          activeFilter === 'volei' ? 'bg-[#0EA5E9] text-white' : 'bg-zinc-900 text-zinc-400'
        }`}
      >
        Vôlei
      </button>
      <button 
        onClick={() => onFilterChange('futvolei')}
        className={`px-4 py-2 rounded-full text-center ${
          activeFilter === 'futvolei' ? 'bg-[#0EA5E9] text-white' : 'bg-zinc-900 text-zinc-400'
        }`}
      >
        FutVôlei
      </button>
      <button 
        onClick={() => onFilterChange('beachtennis')}
        className={`px-4 py-2 rounded-full text-center ${
          activeFilter === 'beachtennis' ? 'bg-[#0EA5E9] text-white' : 'bg-zinc-900 text-zinc-400'
        }`}
      >
        Beach Tennis
      </button>
    </div>
  );
};
