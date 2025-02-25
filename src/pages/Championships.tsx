import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { addDays, isBefore, isAfter, parseISO } from "date-fns";

const Championships = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<'finished' | 'soon' | 'registered'>('soon');
  const [searchTerm, setSearchTerm] = useState("");

  const championships = [
    {
      id: 1,
      title: "R2 - Segunda Etapa",
      date: "2024-03-16", // Changed date format for proper comparison
      category: "Dupla Mista Iniciante",
      status: "Você não pode participar desta categoria",
      isDisabled: true,
      logo: "/lovable-uploads/logo-r2.png"
    },
    {
      id: 2,
      title: "R2 - Segunda Etapa",
      date: "2024-03-16",
      category: "Dupla Mista Intermediária",
      price: "R$90 por atleta",
      isDisabled: false,
      logo: "/lovable-uploads/logo.png"
    },
    {
      id: 3,
      title: "R2 - Segunda Etapa",
      date: "2024-03-16",
      category: "Dupla Masculina Iniciante",
      status: "Você não pode participar desta categoria",
      isDisabled: true,
      logo: "/lovable-uploads/logo-r2.png"
    },
    {
      id: 4,
      title: "R2 - Segunda Etapa",
      date: "2024-03-16",
      category: "Dupla Mista Iniciante",
      status: "Você não pode participar desta categoria",
      isDisabled: true,
      logo: "/lovable-uploads/logo-r2.png"
    },
    {
      id: 5,
      title: "R2 - Segunda Etapa",
      date: "2024-03-16",
      category: "Dupla Mista Intermediária",
      price: "R$90 por atleta",
      isDisabled: false,
      logo: "/lovable-uploads/logo.png"
    },
    {
      id: 6,
      title: "R2 - Segunda Etapa",
      date: "2024-03-16",
      category: "Dupla Masculina Iniciante",
      status: "Você não pode participar desta categoria",
      isDisabled: true,
      logo: "/lovable-uploads/logo-r2.png"
    },
  ];

  const filterChampionships = () => {
    const today = new Date();
    const fifteenDaysFromNow = addDays(today, 15);

    let filtered = championships;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(championship =>
        championship.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply active filter
    if (activeFilter === 'soon') {
      filtered = filtered.filter(championship => {
        const championshipDate = parseISO(championship.date);
        return isAfter(championshipDate, today) && isBefore(championshipDate, fifteenDaysFromNow);
      });
    }
    // Add other filter conditions if needed

    return filtered;
  };

  const filteredChampionships = filterChampionships();

  const formatDisplayDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year.slice(2)}`;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => navigate('/home')}
            className="bg-[#0EA5E9] p-2 rounded-lg"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold flex-1 text-center">Campeonatos</h1>
          <div className="w-8"></div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-900 text-white px-4 py-3 rounded-lg"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <button 
            onClick={() => setActiveFilter('finished')}
            className={`px-4 py-2 rounded-full text-center ${
              activeFilter === 'finished' ? 'bg-[#0EA5E9] text-white' : 'bg-zinc-900 text-zinc-400'
            }`}
          >
            Encerrados
          </button>
          <button 
            onClick={() => setActiveFilter('soon')}
            className={`px-4 py-2 rounded-full text-center ${
              activeFilter === 'soon' ? 'bg-[#0EA5E9] text-white' : 'bg-zinc-900 text-zinc-400'
            }`}
          >
            Em breve
          </button>
          <button 
            onClick={() => setActiveFilter('registered')}
            className={`px-4 py-2 rounded-full text-center ${
              activeFilter === 'registered' ? 'bg-[#0EA5E9] text-white' : 'bg-zinc-900 text-zinc-400'
            }`}
          >
            Inscrito
          </button>
        </div>

        {/* Championships List */}
        <div className="space-y-4">
          {filteredChampionships.map((championship) => (
            <button
              key={championship.id}
              className="w-full bg-zinc-900 rounded-lg p-4 flex items-center text-left"
              disabled={championship.isDisabled}
              onClick={() => !championship.isDisabled && navigate(`/championship/${championship.id}`)}
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Championships;
