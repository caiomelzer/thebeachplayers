
interface ArenaFiltersProps {
  activeFilter: 'all' | 'near';
  onFilterChange: (filter: 'all' | 'near') => void;
}

export const ArenaFilters = ({ activeFilter, onFilterChange }: ArenaFiltersProps) => {
  return (
    <div className="grid grid-cols-2 gap-2 mb-6">
      <button 
        onClick={() => onFilterChange('all')}
        className={`px-4 py-2 rounded-full text-center ${
          activeFilter === 'all' ? 'bg-[#0EA5E9] text-white' : 'bg-zinc-900 text-zinc-400'
        }`}
      >
        Todas
      </button>
      <button 
        onClick={() => onFilterChange('near')}
        className={`px-4 py-2 rounded-full text-center ${
          activeFilter === 'near' ? 'bg-[#0EA5E9] text-white' : 'bg-zinc-900 text-zinc-400'
        }`}
      >
        Perto de mim
      </button>
    </div>
  );
};
