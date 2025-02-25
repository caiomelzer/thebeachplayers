
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-black">
      <div className="w-full max-w-md space-y-8 px-4">
        {/* Logo */}
        <div className="flex items-center justify-center mb-12">
          <img 
            src="/lovable-uploads/logo-t.png" 
            alt="The BeachPlayers Logo" 
            className="w-92 h-24"
          />
        </div>

        {/* Main Content */}
        <div className="space-y-4 mb-16">
          <h2 className="text-4xl font-bold leading-tight text-white">
            Rankings e campeonatos em uma mesmo lugar
          </h2>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button 
            onClick={() => navigate('/login')}
            className="w-full bg-[#0EA5E9] text-white font-medium py-4 rounded-lg hover:bg-[#0EA5E9]/90 transition-colors"
          >
            Entrar
          </button>
          <button 
            onClick={() => navigate('/register')}
            className="w-full bg-[#262626] text-white font-medium py-4 rounded-lg hover:bg-[#363636] transition-colors"
          >
            Cadastrar
          </button>
        </div>

        {/* Terms */}
        <div className="mt-8">
          <p className="text-sm text-gray-400">
            Ao continuar, você aceita os{' '}
            <button 
              className="text-[#0EA5E9] hover:underline"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              termos de uso
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
