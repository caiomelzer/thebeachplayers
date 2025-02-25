
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Championships = () => {
  const navigate = useNavigate();

  const championships = [
    {
      id: 1,
      title: "R2 - Segunda Etapa",
      date: "16/03/25",
      category: "Dupla Mista Iniciante",
      status: "Você não pode participar desta categoria",
      isDisabled: true,
    },
    {
      id: 2,
      title: "R2 - Segunda Etapa",
      date: "16/03/25",
      category: "Dupla Mista Intermediária",
      price: "R$90 por atleta",
      isDisabled: false,
    },
    {
      id: 3,
      title: "R2 - Segunda Etapa",
      date: "16/03/25",
      category: "Dupla Masculina Iniciante",
      status: "Você não pode participar desta categoria",
      isDisabled: true,
    },
  ];

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
          <div className="w-8"></div> {/* Spacer for centering */}
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar"
            className="w-full bg-zinc-900 text-white px-4 py-3 rounded-lg"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
          <button className="bg-[#0EA5E9] px-4 py-2 rounded-full whitespace-nowrap">
            Todos
          </button>
          <button className="bg-zinc-900 px-4 py-2 rounded-full text-zinc-400 whitespace-nowrap">
            Encerrados
          </button>
          <button className="bg-zinc-900 px-4 py-2 rounded-full text-zinc-400 whitespace-nowrap">
            Em breve
          </button>
          <button className="bg-zinc-900 px-4 py-2 rounded-full text-zinc-400 whitespace-nowrap">
            Inscrito
          </button>
        </div>

        {/* Championships List */}
        <div className="space-y-4">
          {championships.map((championship) => (
            <button
              key={championship.id}
              className="w-full bg-zinc-900 rounded-lg p-4 flex items-center text-left"
              disabled={championship.isDisabled}
            >
              <div className="mr-4">
                <img
                  src="/lovable-uploads/logo.png"
                  alt="Championship logo"
                  className="w-12 h-12 rounded-lg"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{championship.title}</h3>
                <p className="text-sm text-zinc-400">
                  {championship.date} - {championship.category}
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
