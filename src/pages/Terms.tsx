
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-6">
        <button 
          onClick={() => navigate(-1)}
          className="bg-[#0EA5E9] p-2 rounded-lg mb-6"
        >
          <ArrowLeft size={20} />
        </button>

        <h1 className="text-2xl font-bold mb-6">Termos de Uso</h1>

        <div className="space-y-6 text-zinc-400">
          <section>
            <h2 className="text-white text-lg font-medium mb-2">1. Aceitação dos Termos</h2>
            <p>
              Ao acessar e utilizar este aplicativo, você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não poderá acessar o aplicativo.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-medium mb-2">2. Cadastro e Conta</h2>
            <p>
              Para utilizar determinados recursos do aplicativo, você precisará criar uma conta. Você é responsável por manter a confidencialidade de suas credenciais de login e por todas as atividades que ocorrerem em sua conta.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-medium mb-2">3. Uso do Aplicativo</h2>
            <p>
              Você concorda em usar o aplicativo apenas para fins legais e de acordo com estes termos. Você não deve usar o aplicativo de maneira que possa danificar, desativar ou sobrecarregar nossos servidores.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-medium mb-2">4. Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo presente no aplicativo, incluindo textos, gráficos, logos, imagens e software, é propriedade exclusiva nossa ou de nossos licenciadores e está protegido por leis de propriedade intelectual.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-medium mb-2">5. Privacidade</h2>
            <p>
              Nosso uso de suas informações pessoais é regido por nossa Política de Privacidade. Ao usar o aplicativo, você concorda com nossas práticas de coleta e uso de dados conforme descrito na Política de Privacidade.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
