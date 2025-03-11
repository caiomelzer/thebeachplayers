
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
  name?: string; // Added for compatibility with player API response
  whatsapp?: string; // Added for team creation
}

export type TeamMember = {
  player_id: string;
  nickname?: string;
  avatar_url?: string;
  rating?: string;
  whatsapp?: string;
}

export type Team = {
  id: string;
  championship_id: string;
  team_members: TeamMember[];
  created_at: string;
  updated_at: string;
}
