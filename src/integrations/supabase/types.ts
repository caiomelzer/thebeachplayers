export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      arenas: {
        Row: {
          address: string
          created_at: string
          email: string | null
          id: string
          instagram: string | null
          latitude: number
          longitude: number
          main_image_url: string | null
          name: string
          status: Database["public"]["Enums"]["arena_status_type"]
          updated_at: string
          whatsapp: string | null
        }
        Insert: {
          address: string
          created_at?: string
          email?: string | null
          id?: string
          instagram?: string | null
          latitude: number
          longitude: number
          main_image_url?: string | null
          name: string
          status?: Database["public"]["Enums"]["arena_status_type"]
          updated_at?: string
          whatsapp?: string | null
        }
        Update: {
          address?: string
          created_at?: string
          email?: string | null
          id?: string
          instagram?: string | null
          latitude?: number
          longitude?: number
          main_image_url?: string | null
          name?: string
          status?: Database["public"]["Enums"]["arena_status_type"]
          updated_at?: string
          whatsapp?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          id: string
          level: Database["public"]["Enums"]["level_type"]
          modality: Database["public"]["Enums"]["modality_type"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          level: Database["public"]["Enums"]["level_type"]
          modality: Database["public"]["Enums"]["modality_type"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          level?: Database["public"]["Enums"]["level_type"]
          modality?: Database["public"]["Enums"]["modality_type"]
          updated_at?: string
        }
        Relationships: []
      }
      championships: {
        Row: {
          banner_url: string | null
          category_id: string
          created_at: string
          gender: Database["public"]["Enums"]["gender_type"]
          id: string
          min_score: number
          price: number
          publication_date: string
          registration_deadline: string
          responsible_id: string
          title: string
          updated_at: string
        }
        Insert: {
          banner_url?: string | null
          category_id: string
          created_at?: string
          gender: Database["public"]["Enums"]["gender_type"]
          id?: string
          min_score?: number
          price: number
          publication_date?: string
          registration_deadline: string
          responsible_id: string
          title: string
          updated_at?: string
        }
        Update: {
          banner_url?: string | null
          category_id?: string
          created_at?: string
          gender?: Database["public"]["Enums"]["gender_type"]
          id?: string
          min_score?: number
          price?: number
          publication_date?: string
          registration_deadline?: string
          responsible_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "championships_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "championships_responsible_id_fkey"
            columns: ["responsible_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      complaints: {
        Row: {
          created_at: string
          id: string
          message: string
          reported_by_id: string
          status: Database["public"]["Enums"]["complaint_status_type"]
          team_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          reported_by_id: string
          status?: Database["public"]["Enums"]["complaint_status_type"]
          team_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          reported_by_id?: string
          status?: Database["public"]["Enums"]["complaint_status_type"]
          team_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "complaints_reported_by_id_fkey"
            columns: ["reported_by_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "complaints_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      matches: {
        Row: {
          championship_id: string
          created_at: string
          id: string
          is_completed: boolean
          match_date: string | null
          team_a_id: string
          team_a_score: number | null
          team_b_id: string
          team_b_score: number | null
          updated_at: string
        }
        Insert: {
          championship_id: string
          created_at?: string
          id?: string
          is_completed?: boolean
          match_date?: string | null
          team_a_id: string
          team_a_score?: number | null
          team_b_id: string
          team_b_score?: number | null
          updated_at?: string
        }
        Update: {
          championship_id?: string
          created_at?: string
          id?: string
          is_completed?: boolean
          match_date?: string | null
          team_a_id?: string
          team_a_score?: number | null
          team_b_id?: string
          team_b_score?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "matches_championship_id_fkey"
            columns: ["championship_id"]
            isOneToOne: false
            referencedRelation: "championships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_team_a_id_fkey"
            columns: ["team_a_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_team_b_id_fkey"
            columns: ["team_b_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          created_at: string
          id: string
          joined_at: string
          team_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          joined_at?: string
          team_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          joined_at?: string
          team_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_modalities: {
        Row: {
          created_at: string
          id: string
          modality: Database["public"]["Enums"]["modality_type"]
          status: Database["public"]["Enums"]["user_modality_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          modality: Database["public"]["Enums"]["modality_type"]
          status?: Database["public"]["Enums"]["user_modality_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          modality?: Database["public"]["Enums"]["modality_type"]
          status?: Database["public"]["Enums"]["user_modality_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_modalities_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          born: string | null
          cpf: string
          created_at: string
          full_name: string | null
          gender: string | null
          id: string
          nickname: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          born?: string | null
          cpf: string
          created_at?: string
          full_name?: string | null
          gender?: string | null
          id: string
          nickname?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          born?: string | null
          cpf?: string
          created_at?: string
          full_name?: string | null
          gender?: string | null
          id?: string
          nickname?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      arena_status_type: "active" | "inactive" | "maintenance"
      complaint_status_type:
        | "pending"
        | "under_review"
        | "resolved"
        | "dismissed"
      gender_type: "masculino" | "feminino" | "misto"
      level_type:
        | "estreante"
        | "iniciante"
        | "intermediario"
        | "intermediario_plus"
        | "avancado"
        | "open"
        | "master"
      modality_type: "volei" | "beach_tennis" | "futvolei"
      user_modality_status: "active" | "inactive"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
