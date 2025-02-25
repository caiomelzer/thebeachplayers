
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const isFormValid = () => {
    return formData.email.trim() !== "" && formData.password.trim() !== "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6 bg-black">
      {/* Back Button */}
      <button 
        onClick={() => navigate("/")}
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
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-3 rounded-lg bg-white text-black"
              placeholder="Email"
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
            disabled={!isFormValid()}
            className={`w-full ${isFormValid() ? 'bg-[#0EA5E9]' : 'bg-gray-500'} text-white font-medium py-4 rounded-lg transition-colors`}
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
