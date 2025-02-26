
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { RegisterInput } from "./RegisterInput";
import { TermsAgreement } from "./TermsAgreement";
import { validateEmail, validateCPF, validatePassword } from "@/utils/validation";

interface FormData {
  email: string;
  cpf: string;
  password: string;
}

interface FormErrors {
  email: string;
  cpf: string;
  password: string;
}

export const RegistrationForm = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    cpf: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({
    email: "",
    cpf: "",
    password: "",
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
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
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <RegisterInput
        id="email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={(value) => handleInputChange('email', value)}
        error={errors.email}
        placeholder="Email"
        disabled={isLoading}
      />

      <RegisterInput
        id="cpf"
        label="CPF"
        type="text"
        value={formData.cpf}
        onChange={(value) => handleInputChange('cpf', value)}
        error={errors.cpf}
        placeholder="123.456.789-00"
        disabled={isLoading}
      />

      <RegisterInput
        id="password"
        label="Senha"
        type="password"
        value={formData.password}
        onChange={(value) => handleInputChange('password', value)}
        error={errors.password}
        placeholder="********"
        disabled={isLoading}
      />

      <TermsAgreement />

      <Button 
        type="submit"
        disabled={!isFormValid()}
        className={`w-full ${isFormValid() ? 'bg-[#0EA5E9]' : 'bg-gray-500'} text-white font-medium py-4 rounded-lg transition-colors mt-4`}
      >
        {isLoading ? 'Cadastrando...' : 'Cadastrar'}
      </Button>
    </form>
  );
};
