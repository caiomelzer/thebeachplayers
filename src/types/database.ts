
export type UserModality = {
  id: string;
  user_id: string;
  modality: 'volei' | 'beach_tennis' | 'futvolei';
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export type PlayerStatistics = {
  ranking: number;
  victories: number;
  defeats: number;
  totalChampionships: number;
  recentChampionships: number;
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
  statistics?: PlayerStatistics;
}
