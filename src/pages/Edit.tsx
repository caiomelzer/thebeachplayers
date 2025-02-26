
import { ArrowLeft, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { UserModality } from "@/types/database";

type Modality = UserModality['modality'];

const Edit = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: user?.full_name || "",
    nickname: user?.nickname || "",
    born: user?.born || "",
    gender: user?.gender || "",
  });
  const [selectedModalities, setSelectedModalities] = useState<Modality[]>([]);

  useEffect(() => {
    const fetchUserModalities = async () => {
      if (!user) return;

      try {
        const { data: modalities, error } = await supabase
          .from('user_modalities')
          .select('modality')
          .eq('user_id', user.id)
          .eq('status', 'active');

        if (error) throw error;

        if (modalities) {
          setSelectedModalities(modalities.map(m => m.modality));
        }
      } catch (error) {
        console.error('Error fetching modalities:', error);
      }
    };

    fetchUserModalities();
  }, [user]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
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
      const formData = new FormData();
      formData.append('avatar', file);

      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) throw new Error('No session');

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/upload-avatar`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
      });

      if (!response.ok) throw new Error('Upload failed');

      const { avatarUrl } = await response.json();
      toast.success('Foto atualizada com sucesso!');
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast.error('Erro ao atualizar a foto');
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

      // Update user profile
      const { error: profileError } = await supabase
        .from('users')
        .update(formData)
        .eq('id', user.id);

      if (profileError) throw profileError;

      // Delete existing modalities
      const { error: deleteError } = await supabase
        .from('user_modalities')
        .delete()
        .eq('user_id', user.id);

      if (deleteError) throw deleteError;

      // Insert new modalities
      if (selectedModalities.length > 0) {
        const modalitiesData = selectedModalities.map(modality => ({
          user_id: user.id,
          modality: modality as Modality,
          status: 'active' as const
        }));

        const { error: modalitiesError } = await supabase
          .from('user_modalities')
          .insert(modalitiesData);

        if (modalitiesError) throw modalitiesError;
      }

      toast.success('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Erro ao atualizar perfil');
    } finally {
      setIsLoading(false);
    }
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
          <div className="relative">
            <img
              src={user?.avatar_url || "/lovable-uploads/kleber.png"}
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
          <p className="text-zinc-400">{user?.id}</p>
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
              {(['volei', 'futvolei', 'beach_tennis'] as const).map(modality => (
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
