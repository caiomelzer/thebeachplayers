
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-6">
        <button 
          onClick={() => navigate('/home')}
          className="bg-[#0EA5E9] p-2 rounded-lg mb-6"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="flex flex-col items-center">
          <img
            src="/lovable-uploads/6e0fd4b5-bb25-459b-a6d4-dd1554ad50ec.png"
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4"
          />
          <h1 className="text-2xl font-bold">Kleber Utrilha</h1>
          <p className="text-zinc-400 mb-4">#123456</p>
          
          <div className="w-full max-w-md space-y-4">
            <div className="bg-zinc-900 rounded-lg p-4">
              <h2 className="text-zinc-400 mb-2">Dados pessoais</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Apelido:</span>
                  <span>Klebinho</span>
                </div>
                <div className="flex justify-between">
                  <span>Idade:</span>
                  <span>36 anos</span>
                </div>
                <div className="flex justify-between">
                  <span>Localização:</span>
                  <span>São Paulo/SP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
