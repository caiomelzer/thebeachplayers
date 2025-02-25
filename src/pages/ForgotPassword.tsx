
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password reset logic here
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
        <div className="flex flex-col items-center gap-2 mb-8">
          <img 
            src="/lovable-uploads/logo.png"
            alt="The BeachPlayers Logo" 
            className="w-16 h-16"
          />
          <h1 className="text-2xl font-bold text-white">The BeachPlayers</h1>
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
