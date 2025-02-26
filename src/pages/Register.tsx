
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Register = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
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
           validatePassword(formData.password) &&
           !isLoading;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      toast.error("Por favor, corrija os erros no formulário");
      return;
    }

    try {
      setIsLoading(true);
      console.log('Attempting to sign up with:', {
        email: formData.email,
        cpf: formData.cpf
      });
      
      const { data, error } = await signUp(formData.email, formData.password, formData.cpf);
      
      if (error) {
        throw error;
      }

      toast.success("Cadastro realizado com sucesso! Verifique seu email para confirmar o cadastro.");
      navigate('/login');
    } catch (error: any) {
      console.error('Erro no cadastro:', error);
      
      if (error.message === 'CPF já cadastrado') {
        toast.error("CPF já cadastrado");
      } else if (error.message?.includes('Email already registered')) {
        toast.error("Email já cadastrado");
      } else if (error.message?.includes('Password should be at least 6 characters')) {
        toast.error("A senha deve ter no mínimo 6 caracteres");
      } else {
        toast.error("Erro ao realizar cadastro. Por favor, tente novamente.");
      }
    } finally {
      setIsLoading(false);
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
            src="/lovable-uploads/logo-t.png" 
            alt="The BeachPlayers Logo" 
            className="w-92 h-24"
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
              disabled={isLoading}
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
              disabled={isLoading}
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
              disabled={isLoading}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Terms */}
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

          <Button 
            type="submit"
            disabled={!isFormValid()}
            className={`w-full ${isFormValid() ? 'bg-[#0EA5E9]' : 'bg-gray-500'} text-white font-medium py-4 rounded-lg transition-colors mt-4`}
          >
            {isLoading ? 'Cadastrando...' : 'Cadastrar'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
