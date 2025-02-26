
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const TermsAgreement = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="mt-8 text-center">
      <p className="text-sm text-gray-400">
        Ao continuar, você aceita os{' '}
        <button 
          type="button"
          className="text-[#0EA5E9] hover:underline"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => navigate('/terms')}
        >
          termos de uso
        </button>
      </p>
    </div>
  );
};
