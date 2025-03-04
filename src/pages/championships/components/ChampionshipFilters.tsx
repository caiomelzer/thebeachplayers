
interface ChampionshipFiltersProps {
  activeFilter: 'all' | 'soon' | 'registered';
  onFilterChange: (filter: 'all' | 'soon' | 'registered') => void;
}

export const ChampionshipFilters = ({ activeFilter, onFilterChange }: ChampionshipFiltersProps) => {
  return (
    <div className="grid grid-cols-3 gap-2 mb-6">
      <button 
        onClick={() => onFilterChange('all')}
        className={`px-4 py-2 rounded-full text-center ${
          activeFilter === 'all' ? 'bg-[#0EA5E9] text-white' : 'bg-zinc-900 text-zinc-400'
        }`}
      >
        Todos
      </button>
      <button 
        onClick={() => onFilterChange('soon')}
        className={`px-4 py-2 rounded-full text-center ${
          activeFilter === 'soon' ? 'bg-[#0EA5E9] text-white' : 'bg-zinc-900 text-zinc-400'
        }`}
      >
        Em breve
      </button>
      <button 
        onClick={() => onFilterChange('registered')}
        className={`px-4 py-2 rounded-full text-center ${
          activeFilter === 'registered' ? 'bg-[#0EA5E9] text-white' : 'bg-zinc-900 text-zinc-400'
        }`}
      >
        Inscrito
      </button>
    </div>
  );
};
