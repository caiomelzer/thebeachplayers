
export type UserModality = {
  id: string;
  user_id: string;
  modality: 'Vôlei' | 'Beach Tennis' | 'Futvôlei';
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export type PlayerStatistics = {
  user_id: string;
  ranking: number;
  victories: number;
  defeats: number;
  total_championships: number;
  recent_championships: number;
  created_at: string;
  updated_at: string;
}

export type User = {
  id: string;
  full_name: string | null;
  nickname: string | null;
  born: string | null;
  gender: string | null;
  avatar_url: string | null;
  cpf: string;
  created_at: string;
  updated_at: string;
  ranking?: number;
  rating?: number;
  statistics?: PlayerStatistics;
  modalities?: UserModality[];
}
