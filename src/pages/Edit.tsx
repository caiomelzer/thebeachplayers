
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add any logout logic here if needed
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-6">
        <button 
          onClick={() => navigate('/home')}
          className="bg-[#0EA5E9] p-2 rounded-lg mb-6"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="flex flex-col items-center mb-6">
          <img
            src="/lovable-uploads/6e0fd4b5-bb25-459b-a6d4-dd1554ad50ec.png"
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4"
          />
          <h1 className="text-2xl font-bold">Kleber Utrilha</h1>
          <p className="text-zinc-400">#123456</p>
        </div>

        <form className="max-w-md mx-auto space-y-4">
          <div className="space-y-2">
            <label className="text-zinc-400">Apelido:</label>
            <input
              type="text"
              defaultValue="Klebinho"
              className="w-full p-3 rounded-lg bg-zinc-900 text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-zinc-400">Email:</label>
            <input
              type="email"
              defaultValue="kleber123@teste.com.br"
              className="w-full p-3 rounded-lg bg-zinc-900 text-white"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-[#0EA5E9] text-white font-medium py-3 rounded-lg hover:bg-[#0EA5E9]/90 transition-colors"
          >
            Salvar
          </button>

          <button 
            type="button"
            onClick={handleLogout}
            className="w-full bg-zinc-800 text-white font-medium py-3 rounded-lg hover:bg-zinc-700 transition-colors"
          >
            Sair
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
