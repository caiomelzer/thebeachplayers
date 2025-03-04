
interface Championship {
  id: string;
  title: string;
  date: string;
  category: string;
  status?: string;
  price?: string;
  logo: string;
  isDisabled?: boolean;
  isRegistered?: boolean;
}

interface ChampionshipCardProps {
  championship: Championship;
  onClick: (id: string) => void;
}

export const ChampionshipCard = ({ championship, onClick }: ChampionshipCardProps) => {
  const formatDisplayDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year.slice(2)}`;
  };

  return (
    <button
      className="w-full bg-zinc-900 rounded-lg p-4 flex items-center text-left"
      disabled={championship.isDisabled}
      onClick={() => !championship.isDisabled && onClick(championship.id)}
    >
      <div className="mr-4">
        <img
          src={championship.logo}
          alt="Championship logo"
          className="w-12 h-12 rounded-lg"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{championship.title}</h3>
        <p className="text-sm text-zinc-400">
          {formatDisplayDate(championship.date)} - {championship.category}
        </p>
        <p className={`text-sm ${championship.isDisabled ? 'text-red-500' : 'text-zinc-400'}`}>
          {championship.status || championship.price}
        </p>
      </div>
      <div className="text-zinc-400">›</div>
    </button>
  );
};
