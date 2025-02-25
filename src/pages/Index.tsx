
import { useState } from 'react';
import { VolleyballIcon } from 'lucide-react';

const Index = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 animate-fadeIn">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <VolleyballIcon size={40} className="text-white" />
          <h1 className="text-2xl font-bold">The BeachPlayers</h1>
        </div>

        {/* Main Content */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold leading-tight">
            Rankings e campeonatos em uma mesmo lugar
          </h2>
        </div>

        {/* Buttons */}
        <div className="space-y-4">
          <button className="btn-primary w-full">
            Entrar
          </button>
          <button className="btn-secondary w-full">
            Cadastrar
          </button>
        </div>

        {/* Terms */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-400">
            Ao continuar, você aceita os{' '}
            <button 
              className="text-primary hover:underline"
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
