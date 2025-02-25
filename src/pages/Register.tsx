
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    cpf: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    cpf: "",
    password: "",
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateCPF = (cpf: string) => {
    const cleanCPF = cpf.replace(/[^\d]/g, '');
    if (cleanCPF.length !== 11) return false;
    
    // CPF validation algorithm
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCPF[i]) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF[9])) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCPF[i]) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF[10])) return false;

    return true;
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Validate fields
    if (field === 'email') {
      setErrors(prev => ({
        ...prev,
        email: validateEmail(value) ? "" : "Email inválido"
      }));
    } else if (field === 'cpf') {
      setErrors(prev => ({
        ...prev,
        cpf: validateCPF(value) ? "" : "CPF inválido"
      }));
    } else if (field === 'password') {
      setErrors(prev => ({
        ...prev,
        password: validatePassword(value) 
          ? "" 
          : "A senha deve conter no mínimo 8 caracteres, um número e um caractere especial"
      }));
    }
  };

  const isFormValid = () => {
    return validateEmail(formData.email) && 
           validateCPF(formData.cpf) && 
           validatePassword(formData.password);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      // Handle registration logic here
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
        {/* Logo */}
        <div className="flex items-center justify-center mb-12">
          <img 
            src="/lovable-uploads/logo.png"
            alt="The BeachPlayers Logo" 
            className="w-32 h-24"
          />
        </div>

        {/* Welcome Text */}
        <p className="text-white text-lg mb-8">Seja bem-vindo...</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-white">Email:</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full p-3 rounded-lg bg-white text-black ${errors.email ? 'border-2 border-red-500' : ''}`}
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="cpf" className="text-white">CPF:</label>
            <input
              type="text"
              id="cpf"
              value={formData.cpf}
              onChange={(e) => handleInputChange('cpf', e.target.value)}
              className={`w-full p-3 rounded-lg bg-white text-black ${errors.cpf ? 'border-2 border-red-500' : ''}`}
              placeholder="123.456.789-00"
            />
            {errors.cpf && <p className="text-red-500 text-sm">{errors.cpf}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-white">Senha:</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className={`w-full p-3 rounded-lg bg-white text-black ${errors.password ? 'border-2 border-red-500' : ''}`}
              placeholder="********"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Terms */}
          <div className="mt-8 text-center">
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

          <button 
            type="submit"
            disabled={!isFormValid()}
            className={`w-full ${isFormValid() ? 'bg-[#0EA5E9]' : 'bg-gray-500'} text-white font-medium py-4 rounded-lg transition-colors mt-4`}
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
