
interface PlayerSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const PlayerSearchBar = ({ searchTerm, onSearchChange }: PlayerSearchBarProps) => {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Buscar"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full bg-zinc-900 text-white px-4 py-3 rounded-lg"
      />
    </div>
  );
};
