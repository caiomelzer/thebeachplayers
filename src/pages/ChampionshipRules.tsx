
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const ChampionshipRules = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-6">
        <button 
          onClick={() => navigate(`/championship/${id}`)}
          className="bg-[#0EA5E9] p-2 rounded-lg mb-6"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <img
            src="/lovable-uploads/logo.png"
            alt="Championship logo"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold">R2 - Segunda Etapa</h1>
            <p className="text-[#0EA5E9]">Dupla Misto Intermediário</p>
          </div>
        </div>

        <div className="space-y-6 text-zinc-400">
          <section>
            <h2 className="text-white text-lg font-medium mb-2">Regras Gerais</h2>
            <p>
              As regras seguem o padrão oficial da modalidade com algumas adaptações para o formato do campeonato.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-medium mb-2">Sistema de Pontuação</h2>
            <ul className="list-disc pl-4 space-y-2">
              <li>Sets até 21 pontos</li>
              <li>Melhor de 3 sets</li>
              <li>Diferença mínima de 2 pontos</li>
              <li>Último set até 15 pontos</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-lg font-medium mb-2">Formato do Torneio</h2>
            <ul className="list-disc pl-4 space-y-2">
              <li>Fase de grupos com 4 equipes</li>
              <li>2 melhores de cada grupo avançam</li>
              <li>Playoffs em eliminação simples</li>
              <li>Final em melhor de 5 sets</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-lg font-medium mb-2">Categorias e Níveis</h2>
            <p>
              Os jogadores devem respeitar os níveis definidos para cada categoria. Jogadores de níveis superiores não podem participar de categorias inferiores.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-medium mb-2">Punições</h2>
            <ul className="list-disc pl-4 space-y-2">
              <li>Cartão amarelo: advertência</li>
              <li>Cartão vermelho: ponto para o adversário</li>
              <li>Dois cartões vermelhos: desclassificação</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ChampionshipRules;
