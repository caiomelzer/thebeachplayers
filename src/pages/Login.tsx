
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

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
    console.log('Clicou')
    e.preventDefault();
    if (isFormValid()) {
      console.log('valido')
      try {
        console.log('Loading')
        setIsLoading(true);
        const { data, error } = await signIn(formData.email, formData.password);
        console.log('Retornou')
        if (error) throw error;

        // Only show success and navigate if we have user data
        if (data?.user) {
          console.log(data.user);
          toast.success("Login realizado com sucesso!");
          navigate('/home', { replace: true });
        }
      } catch (error: any) {
        console.error('Erro no login:', error);
        toast.error("Email ou senha incorretos. Por favor, tente novamente.");
      } finally {
        setIsLoading(false);
      }
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
