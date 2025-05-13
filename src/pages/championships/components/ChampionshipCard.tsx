
interface Championship {
  id: string;
  title: string;
  date?: string;
  occurs?: string;
  category: string;
  status?: string;
  price?: string;
  logo?: string;
  banner_url?: string;
  isDisabled?: boolean;
  isRegistered?: boolean;
}

interface ChampionshipCardProps {
  championship: Championship;
  onClick: (id: string) => void;
}

export const ChampionshipCard = ({ championship, onClick }: ChampionshipCardProps) => {
  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return "";
    const datePart = dateString.split('T')[0];
    if (!datePart) return "";
    
    const [year, month, day] = datePart.split('-');
    return `${day}/${month}/${year.slice(2)}`;
  };

  console.log(championship)
  return (
    <button
      className="w-full bg-zinc-900 rounded-lg p-4 flex items-center text-left"
      disabled={championship.isDisabled}
      onClick={() => !championship.isDisabled && onClick(championship.id)}
    >
      <div className="mr-4">
        <img
          src={championship.banner_url || championship.logo || "/placeholder.svg"}
          alt="Championship logo"
          className="w-12 h-12 rounded-lg"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{championship.title}</h3>
        <p className="text-sm text-zinc-400">
          {championship.category}
        </p>
        <p className={`text-sm ${championship.isDisabled ? 'text-red-500' : 'text-zinc-400'}`}>
        {formatDisplayDate(championship.occurs)} - {championship.status || championship.price}
        </p>
      </div>
      <div className="text-zinc-400">›</div>
    </button>
  );
};
