
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RegistrationForm } from "@/components/RegistrationForm";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col p-6 bg-black">
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
        <p className="text-white text-lg mb-8">Seja bem-vindo...</p>

        <RegistrationForm />
      </div>
    </div>
  );
};

export default Register;
