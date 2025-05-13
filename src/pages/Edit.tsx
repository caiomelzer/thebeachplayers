
import { ArrowLeft, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { apiClient } from "@/integrations/api/client";
import { toast } from "sonner";
import type { UserModality } from "@/types/database";
import imageCompression from 'browser-image-compression';

type Modality = UserModality['modality'];

const Edit = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    // Extrai a data em formato ISO e pega só a parte "YYYY-MM-DD"
    return date.toISOString().split("T")[0];
  };
  const [formData, setFormData] = useState({
    full_name: user?.full_name || "",
    nickname: user?.nickname || "",
    born: formatDate(user?.born),
    gender: user?.gender || "",
  });
  const [selectedModalities, setSelectedModalities] = useState<Modality[]>(
    user?.modalities?.map(m => m.modality as Modality) || []
  );
  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
  
    try {
      setIsLoading(true);
      toast.success('Foto selecionada com sucesso');
  
      const options = {
        maxSizeMB: 1, // tamanho máximo em MB
        maxWidthOrHeight: 1024, // limita o tamanho da imagem
        useWebWorker: true,
      };
  
      const compressedFile = await imageCompression(file, options);
      
      const formData = new FormData();
      formData.append('avatar', compressedFile);
  
      const response = await apiClient.put('/api/user/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        toast.success('Foto atualizada com sucesso!');
      } else {
        throw new Error('Upload falhou');
      }
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      toast.error('Erro ao atualizar a foto: ' + error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalityToggle = (modality: Modality) => {
    setSelectedModalities(prev => 
      prev.includes(modality) 
        ? prev.filter(m => m !== modality)
        : [...prev, modality]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!user?.id) throw new Error('No user ID');

      // Update user profile using the API
      const response = await apiClient.put('/api/user/me', {
        ...formData,
        modalities: selectedModalities.map(modality => ({
          modality,
          status: 'active'
        }))
      });

      if (response.status === 200) {
        toast.success('Perfil atualizado com sucesso!');
        navigate('/home');
      } else {
        throw new Error('Update failed');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Erro ao atualizar perfil');
    } finally {
      setIsLoading(false);
    }
  };
  console.log(user);
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
          <div className="relative">
            <img
              src={user?.avatar_url || "http://thebeachplayers.com/lovable-uploads/avatar.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full mb-4 cursor-pointer"
              onClick={handleAvatarClick}
            />
            <button
              className="absolute bottom-4 right-0 bg-[#0EA5E9] p-2 rounded-full"
              onClick={handleAvatarClick}
            >
              <Camera size={16} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>
          <h1 className="text-2xl font-bold">{user?.full_name || 'Nome do Usuário'}</h1>
          <p className="text-zinc-400">Seu ID: {user?.id}</p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
          <div className="space-y-2">
            <label className="text-zinc-400">Nome completo:</label>
            <input
              type="text"
              value={formData.full_name}
              onChange={e => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
              className="w-full p-3 rounded-lg bg-zinc-900 text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-zinc-400">Apelido:</label>
            <input
              type="text"
              value={formData.nickname}
              onChange={e => setFormData(prev => ({ ...prev, nickname: e.target.value }))}
              className="w-full p-3 rounded-lg bg-zinc-900 text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-zinc-400">Data de nascimento:</label>
            <input
              type="date"
              value={formData.born}
              onChange={e => setFormData(prev => ({ ...prev, born: e.target.value }))}
              className="w-full p-3 rounded-lg bg-zinc-900 text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-zinc-400">Gênero:</label>
            <select
              value={formData.gender}
              onChange={e => setFormData(prev => ({ ...prev, gender: e.target.value }))}
              className="w-full p-3 rounded-lg bg-zinc-900 text-white"
            >
              <option value="">Selecione</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
              <option value="outro">Outro</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-zinc-400">Modalidades:</label>
            <div className="flex gap-2 flex-wrap">
              {(['Vôlei'] as const).map(modality => (
                <button
                  key={modality}
                  type="button"
                  onClick={() => handleModalityToggle(modality)}
                  className={`px-4 py-2 rounded-full ${
                    selectedModalities.includes(modality)
                      ? 'bg-[#0EA5E9] text-white'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {modality.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#0EA5E9] text-white font-medium py-3 rounded-lg hover:bg-[#0EA5E9]/90 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Salvando...' : 'Salvar'}
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
