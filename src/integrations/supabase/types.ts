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
      challenge_participants: {
        Row: {
          challenge_id: string
          id: string
          joined_at: string | null
          payment_id: string | null
          position: number | null
          prize_amount: number | null
          team_id: string | null
          user_id: string | null
        }
        Insert: {
          challenge_id: string
          id?: string
          joined_at?: string | null
          payment_id?: string | null
          position?: number | null
          prize_amount?: number | null
          team_id?: string | null
          user_id?: string | null
        }
        Update: {
          challenge_id?: string
          id?: string
          joined_at?: string | null
          payment_id?: string | null
          position?: number | null
          prize_amount?: number | null
          team_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "challenge_participants_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "challenge_participants_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "challenge_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      challenges: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          ends_at: string | null
          entry_fee: number
          id: string
          max_participants: number
          name: string
          platform_fee: number
          prize_pool: number
          starts_at: string | null
          status: Database["public"]["Enums"]["game_status"] | null
          type: Database["public"]["Enums"]["challenge_type"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          ends_at?: string | null
          entry_fee: number
          id?: string
          max_participants: number
          name: string
          platform_fee: number
          prize_pool: number
          starts_at?: string | null
          status?: Database["public"]["Enums"]["game_status"] | null
          type: Database["public"]["Enums"]["challenge_type"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          ends_at?: string | null
          entry_fee?: number
          id?: string
          max_participants?: number
          name?: string
          platform_fee?: number
          prize_pool?: number
          starts_at?: string | null
          status?: Database["public"]["Enums"]["game_status"] | null
          type?: Database["public"]["Enums"]["challenge_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "challenges_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      game_sessions: {
        Row: {
          challenge_id: string
          completed_at: string | null
          created_at: string | null
          game_data: Json | null
          id: string
          participant_id: string
          score: number | null
          stage: number
          time_taken: number | null
        }
        Insert: {
          challenge_id: string
          completed_at?: string | null
          created_at?: string | null
          game_data?: Json | null
          id?: string
          participant_id: string
          score?: number | null
          stage: number
          time_taken?: number | null
        }
        Update: {
          challenge_id?: string
          completed_at?: string | null
          created_at?: string | null
          game_data?: Json | null
          id?: string
          participant_id?: string
          score?: number | null
          stage?: number
          time_taken?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "game_sessions_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_sessions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "challenge_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      leaderboards: {
        Row: {
          created_at: string | null
          games_played: number | null
          id: string
          period: string
          period_end: string | null
          period_start: string
          ranking: number | null
          total_earnings: number | null
          updated_at: string | null
          user_id: string
          wins: number | null
        }
        Insert: {
          created_at?: string | null
          games_played?: number | null
          id?: string
          period: string
          period_end?: string | null
          period_start: string
          ranking?: number | null
          total_earnings?: number | null
          updated_at?: string | null
          user_id: string
          wins?: number | null
        }
        Update: {
          created_at?: string | null
          games_played?: number | null
          id?: string
          period?: string
          period_end?: string | null
          period_start?: string
          ranking?: number | null
          total_earnings?: number | null
          updated_at?: string | null
          user_id?: string
          wins?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "leaderboards_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          challenge_id: string | null
          created_at: string | null
          id: string
          payment_type: string | null
          phone_number: string
          provider: Database["public"]["Enums"]["payment_provider"]
          status: Database["public"]["Enums"]["payment_status"] | null
          transaction_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          challenge_id?: string | null
          created_at?: string | null
          id?: string
          payment_type?: string | null
          phone_number: string
          provider: Database["public"]["Enums"]["payment_provider"]
          status?: Database["public"]["Enums"]["payment_status"] | null
          transaction_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          challenge_id?: string | null
          created_at?: string | null
          id?: string
          payment_type?: string | null
          phone_number?: string
          provider?: Database["public"]["Enums"]["payment_provider"]
          status?: Database["public"]["Enums"]["payment_status"] | null
          transaction_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          is_active: boolean | null
          phone_number: string
          referral_code: string | null
          referred_by: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          total_games: number | null
          total_wins: number | null
          updated_at: string | null
          wallet_balance: number | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          is_active?: boolean | null
          phone_number: string
          referral_code?: string | null
          referred_by?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          total_games?: number | null
          total_wins?: number | null
          updated_at?: string | null
          wallet_balance?: number | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          phone_number?: string
          referral_code?: string | null
          referred_by?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          total_games?: number | null
          total_wins?: number | null
          updated_at?: string | null
          wallet_balance?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_referred_by_fkey"
            columns: ["referred_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          id: string
          joined_at: string | null
          team_id: string
          user_id: string
        }
        Insert: {
          id?: string
          joined_at?: string | null
          team_id: string
          user_id: string
        }
        Update: {
          id?: string
          joined_at?: string | null
          team_id?: string
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
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string | null
          creator_id: string
          id: string
          is_active: boolean | null
          max_members: number | null
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          creator_id: string
          id?: string
          is_active?: boolean | null
          max_members?: number | null
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          creator_id?: string
          id?: string
          is_active?: boolean | null
          max_members?: number | null
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "teams_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      wallet_transactions: {
        Row: {
          amount: number
          challenge_id: string | null
          created_at: string | null
          description: string | null
          id: string
          payment_id: string | null
          type: string
          user_id: string
        }
        Insert: {
          amount: number
          challenge_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          payment_id?: string | null
          type: string
          user_id: string
        }
        Update: {
          amount?: number
          challenge_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          payment_id?: string | null
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wallet_transactions_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wallet_transactions_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wallet_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      challenge_type: "solo" | "team"
      game_status: "waiting" | "in_progress" | "completed" | "cancelled"
      payment_provider: "mtn" | "airtel"
      payment_status: "pending" | "completed" | "failed" | "refunded"
      user_role: "user" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      challenge_type: ["solo", "team"],
      game_status: ["waiting", "in_progress", "completed", "cancelled"],
      payment_provider: ["mtn", "airtel"],
      payment_status: ["pending", "completed", "failed", "refunded"],
      user_role: ["user", "admin"],
    },
  },
} as const
