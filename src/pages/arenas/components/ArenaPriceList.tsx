
interface PriceItem {
  title: string;
  value: string;
}

interface ArenaPriceListProps {
  prices: PriceItem[];
}

export const ArenaPriceList = ({ prices }: ArenaPriceListProps) => {
  if (!prices || prices.length === 0) return null;
  
  return (
    <div className="bg-zinc-900 rounded-lg p-4">
      <h2 className="font-medium mb-4">Preços</h2>
      <div className="space-y-2">
        {prices.map((price, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span className="text-zinc-400">{price.title}</span>
            <span className="text-[#0EA5E9]">{price.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
