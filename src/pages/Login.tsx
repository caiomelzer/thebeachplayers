
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { API_URL } from "@/integrations/api/client";

const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const isFormValid = () => {
    return formData.email.trim() !== "" && formData.password.trim() !== "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    try {
      setIsLoading(true);
      const requestId = `login-${Date.now()}`;
      
      console.log('Tentando fazer login com:', {
        email: formData.email,
        apiUrl: API_URL,
        requestId
      });
      
      const { data, error } = await signIn(formData.email, formData.password);

      console.log('Resposta do login:', { data, error, requestId });

      if (error) {
        console.error('Erro detalhado:', error, { requestId });
        
        // Mensagens mais específicas com base no tipo de erro
        if (error.message?.includes('CORS') || error.message?.includes('Network Error')) {
          toast.error("Erro de comunicação com o servidor. Verifique sua conexão.");
        } else {
          toast.error(error.message || "Erro ao realizar login. Tente novamente.");
        }
        return;
      }

      // Only show success and navigate if we have user data
      if (data) {
        toast.success("Login realizado com sucesso!");
        console.log("Redirecionando para /home após login bem-sucedido");
        // Garantindo que a navegação aconteça após a atualização do estado
        setTimeout(() => {
          navigate('/home', { replace: true });
        }, 100);
      }
    } catch (error: any) {
      console.error('Erro no login:', error);
      
      // Tratamento de erro mais específico
      if (error.message?.includes('Network Error')) {
        toast.error("Erro de conexão. Verifique se o servidor está acessível.");
      } else {
        toast.error("Erro ao realizar login. Por favor, tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6 bg-black">
      <button 
        onClick={() => navigate("/")}
        className="text-white p-2 rounded-lg bg-[#0EA5E9] w-fit"
      >
        <ArrowLeft size={20} />
      </button>

      <div className="flex-1 flex flex-col items-center mt-8">
        <div className="flex items-center justify-center mb-12">
          <img 
            src="/lovable-uploads/logo-t.png" 
            alt="The BeachPlayers Logo" 
            className="w-92 h-24"
          />
        </div>

        <p className="text-white text-lg mb-8">Seja bem-vindo novamente...</p>

        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-white">Email:</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-3 rounded-lg bg-white text-black"
              placeholder="Email"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-white">Senha:</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full p-3 rounded-lg bg-white text-black"
              placeholder="********"
              disabled={isLoading}
            />
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="text-[#0EA5E9] text-sm hover:underline"
            >
              Esqueci minha senha
            </button>
          </div>

          <button 
            type="submit"
            disabled={!isFormValid() || isLoading}
            className={`w-full ${isFormValid() && !isLoading ? 'bg-[#0EA5E9]' : 'bg-gray-500'} text-white font-medium py-4 rounded-lg transition-colors`}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
