
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateEmail(email)) {
      toast.success("Sua solicitação de redefinição de senha foi feita com sucesso, em breve você receberá um email. Até mais!");
      setTimeout(() => navigate('/login'), 2000);
    } else {
      toast.error("Por favor, insira um email válido");
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6 bg-black">
      {/* Back Button */}
      <button 
        onClick={() => navigate("/login")}
        className="text-white p-2 rounded-lg bg-[#0EA5E9] w-fit"
      >
        <ArrowLeft size={20} />
      </button>

      <div className="flex-1 flex flex-col items-center mt-8">
        {/* Logo */}
        <div className="flex items-center justify-center mb-12">
        <img 
            src="/lovable-uploads/logo-t.png" 
            alt="The BeachPlayers Logo" 
            className="w-92 h-24"
          />
        </div>

        {/* Welcome Text */}
        <p className="text-white text-lg mb-8">Seja bem-vindo novamente...</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-white">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-white text-black"
              placeholder="Email"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-[#0EA5E9] text-white font-medium py-4 rounded-lg hover:bg-[#0EA5E9]/90 transition-colors"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
