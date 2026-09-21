export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      component_categories: {
        Row: {
          id: string
          name: string
          slug: string
          sort_order: number
        }
        Insert: {
          id?: string
          name: string
          slug: string
          sort_order?: number
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          sort_order?: number
        }
        Relationships: []
      }
      components: {
        Row: {
          advantages: string | null
          category_id: string | null
          considerations: string | null
          created_at: string
          description: string | null
          id: string
          material: string | null
          name: string
          seo_description: string | null
          seo_title: string | null
          short_description: string | null
          slug: string
          sort_order: number
          specifications: Json
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
        }
        Insert: {
          advantages?: string | null
          category_id?: string | null
          considerations?: string | null
          created_at?: string
          description?: string | null
          id?: string
          material?: string | null
          name: string
          seo_description?: string | null
          seo_title?: string | null
          short_description?: string | null
          slug: string
          sort_order?: number
          specifications?: Json
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Update: {
          advantages?: string | null
          category_id?: string | null
          considerations?: string | null
          created_at?: string
          description?: string | null
          id?: string
          material?: string | null
          name?: string
          seo_description?: string | null
          seo_title?: string | null
          short_description?: string | null
          slug?: string
          sort_order?: number
          specifications?: Json
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "components_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "component_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          created_at: string
          id: string
          name: string
          phone: string
          phone_normalized: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          phone: string
          phone_normalized: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          phone?: string
          phone_normalized?: string
          updated_at?: string
        }
        Relationships: []
      }
      homepage_sections: {
        Row: {
          content: Json
          id: string
          is_visible: boolean
          section_key: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          content?: Json
          id?: string
          is_visible?: boolean
          section_key: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          content?: Json
          id?: string
          is_visible?: boolean
          section_key?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      lead_activities: {
        Row: {
          activity_type: string
          created_at: string
          created_by: string | null
          from_status: Database["public"]["Enums"]["lead_status"] | null
          id: string
          lead_id: string
          note: string | null
          to_status: Database["public"]["Enums"]["lead_status"] | null
        }
        Insert: {
          activity_type: string
          created_at?: string
          created_by?: string | null
          from_status?: Database["public"]["Enums"]["lead_status"] | null
          id?: string
          lead_id: string
          note?: string | null
          to_status?: Database["public"]["Enums"]["lead_status"] | null
        }
        Update: {
          activity_type?: string
          created_at?: string
          created_by?: string | null
          from_status?: Database["public"]["Enums"]["lead_status"] | null
          id?: string
          lead_id?: string
          note?: string | null
          to_status?: Database["public"]["Enums"]["lead_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_activities_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          assigned_to: string | null
          contact_id: string
          created_at: string
          id: string
          need: string | null
          product_interest_id: string | null
          project_interest_id: string | null
          source_page: string | null
          source_type: string | null
          status: Database["public"]["Enums"]["lead_status"]
          updated_at: string
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          assigned_to?: string | null
          contact_id: string
          created_at?: string
          id?: string
          need?: string | null
          product_interest_id?: string | null
          project_interest_id?: string | null
          source_page?: string | null
          source_type?: string | null
          status?: Database["public"]["Enums"]["lead_status"]
          updated_at?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          assigned_to?: string | null
          contact_id?: string
          created_at?: string
          id?: string
          need?: string | null
          product_interest_id?: string | null
          project_interest_id?: string | null
          source_page?: string | null
          source_type?: string | null
          status?: Database["public"]["Enums"]["lead_status"]
          updated_at?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_product_interest_id_fkey"
            columns: ["product_interest_id"]
            isOneToOne: false
            referencedRelation: "product_lines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_project_interest_id_fkey"
            columns: ["project_interest_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      media: {
        Row: {
          alt_text: string | null
          caption: string | null
          created_at: string
          credit: string | null
          file_size: number | null
          focal_x: number | null
          focal_y: number | null
          height: number | null
          id: string
          mime_type: string | null
          original_filename: string
          storage_path: string
          width: number | null
        }
        Insert: {
          alt_text?: string | null
          caption?: string | null
          created_at?: string
          credit?: string | null
          file_size?: number | null
          focal_x?: number | null
          focal_y?: number | null
          height?: number | null
          id?: string
          mime_type?: string | null
          original_filename: string
          storage_path: string
          width?: number | null
        }
        Update: {
          alt_text?: string | null
          caption?: string | null
          created_at?: string
          credit?: string | null
          file_size?: number | null
          focal_x?: number | null
          focal_y?: number | null
          height?: number | null
          id?: string
          mime_type?: string | null
          original_filename?: string
          storage_path?: string
          width?: number | null
        }
        Relationships: []
      }
      post_blocks: {
        Row: {
          block_type: string
          data: Json
          id: string
          post_id: string
          sort_order: number
        }
        Insert: {
          block_type: string
          data?: Json
          id?: string
          post_id: string
          sort_order?: number
        }
        Update: {
          block_type?: string
          data?: Json
          id?: string
          post_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "post_blocks_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          canonical_url: string | null
          content_updated_at: string | null
          created_at: string
          excerpt: string | null
          featured: boolean
          id: string
          post_type: string
          published_at: string | null
          quick_answer: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at: string
        }
        Insert: {
          canonical_url?: string | null
          content_updated_at?: string | null
          created_at?: string
          excerpt?: string | null
          featured?: boolean
          id?: string
          post_type: string
          published_at?: string | null
          quick_answer?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at?: string
        }
        Update: {
          canonical_url?: string | null
          content_updated_at?: string | null
          created_at?: string
          excerpt?: string | null
          featured?: boolean
          id?: string
          post_type?: string
          published_at?: string | null
          quick_answer?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      product_line_components: {
        Row: {
          component_id: string
          is_standard: boolean
          notes: string | null
          product_line_id: string
          sort_order: number
        }
        Insert: {
          component_id: string
          is_standard?: boolean
          notes?: string | null
          product_line_id: string
          sort_order?: number
        }
        Update: {
          component_id?: string
          is_standard?: boolean
          notes?: string | null
          product_line_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_line_components_component_id_fkey"
            columns: ["component_id"]
            isOneToOne: false
            referencedRelation: "components"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_line_components_product_line_id_fkey"
            columns: ["product_line_id"]
            isOneToOne: false
            referencedRelation: "product_lines"
            referencedColumns: ["id"]
          },
        ]
      }
      product_lines: {
        Row: {
          canonical_url: string | null
          created_at: string
          description: string | null
          display_name: string
          id: string
          name: string
          parent_id: string | null
          positioning: string | null
          published_at: string | null
          seo_description: string | null
          seo_title: string | null
          short_description: string | null
          slug: string
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
          subtitle: string | null
          updated_at: string
        }
        Insert: {
          canonical_url?: string | null
          created_at?: string
          description?: string | null
          display_name: string
          id?: string
          name: string
          parent_id?: string | null
          positioning?: string | null
          published_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          short_description?: string | null
          slug: string
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          subtitle?: string | null
          updated_at?: string
        }
        Update: {
          canonical_url?: string | null
          created_at?: string
          description?: string | null
          display_name?: string
          id?: string
          name?: string
          parent_id?: string | null
          positioning?: string | null
          published_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          short_description?: string | null
          slug?: string
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          subtitle?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_lines_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "product_lines"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          role?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      project_components: {
        Row: {
          component_id: string
          notes: string | null
          project_id: string
        }
        Insert: {
          component_id: string
          notes?: string | null
          project_id: string
        }
        Update: {
          component_id?: string
          notes?: string | null
          project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_components_component_id_fkey"
            columns: ["component_id"]
            isOneToOne: false
            referencedRelation: "components"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_components_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          canonical_url: string | null
          completion_year: number | null
          created_at: string
          featured: boolean
          id: string
          kitchen_layout: string | null
          location_text: string | null
          problem: string | null
          product_line_id: string | null
          project_type: string | null
          project_value: number | null
          published_at: string | null
          seo_description: string | null
          seo_title: string | null
          short_description: string | null
          show_project_value: boolean
          slug: string
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at: string
          value_delivered: string | null
        }
        Insert: {
          canonical_url?: string | null
          completion_year?: number | null
          created_at?: string
          featured?: boolean
          id?: string
          kitchen_layout?: string | null
          location_text?: string | null
          problem?: string | null
          product_line_id?: string | null
          project_type?: string | null
          project_value?: number | null
          published_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          short_description?: string | null
          show_project_value?: boolean
          slug: string
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at?: string
          value_delivered?: string | null
        }
        Update: {
          canonical_url?: string | null
          completion_year?: number | null
          created_at?: string
          featured?: boolean
          id?: string
          kitchen_layout?: string | null
          location_text?: string | null
          problem?: string | null
          product_line_id?: string | null
          project_type?: string | null
          project_value?: number | null
          published_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          short_description?: string | null
          show_project_value?: boolean
          slug?: string
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          title?: string
          updated_at?: string
          value_delivered?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_product_line_id_fkey"
            columns: ["product_line_id"]
            isOneToOne: false
            referencedRelation: "product_lines"
            referencedColumns: ["id"]
          },
        ]
      }
      warranty_policies: {
        Row: {
          conditions: string | null
          created_at: string
          description: string | null
          effective_from: string
          effective_to: string | null
          frame_unit: string
          frame_value: number | null
          glass_unit: string | null
          glass_value: number | null
          id: string
          maintenance_unit: string | null
          maintenance_value: number | null
          product_line_id: string
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
        }
        Insert: {
          conditions?: string | null
          created_at?: string
          description?: string | null
          effective_from?: string
          effective_to?: string | null
          frame_unit: string
          frame_value?: number | null
          glass_unit?: string | null
          glass_value?: number | null
          id?: string
          maintenance_unit?: string | null
          maintenance_value?: number | null
          product_line_id: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Update: {
          conditions?: string | null
          created_at?: string
          description?: string | null
          effective_from?: string
          effective_to?: string | null
          frame_unit?: string
          frame_value?: number | null
          glass_unit?: string | null
          glass_value?: number | null
          id?: string
          maintenance_unit?: string | null
          maintenance_value?: number | null
          product_line_id?: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "warranty_policies_product_line_id_fkey"
            columns: ["product_line_id"]
            isOneToOne: false
            referencedRelation: "product_lines"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_staff: { Args: never; Returns: boolean }
      submit_public_lead: {
        Args: {
          p_name: string
          p_need?: string
          p_phone: string
          p_source_page?: string
          p_utm_campaign?: string
          p_utm_medium?: string
          p_utm_source?: string
        }
        Returns: string
      }
      update_lead_status: {
        Args: {
          p_lead_id: string
          p_note?: string
          p_status: Database["public"]["Enums"]["lead_status"]
        }
        Returns: undefined
      }
    }
    Enums: {
      content_status: "draft" | "published" | "archived"
      lead_status:
        | "new"
        | "contacted"
        | "consulting"
        | "appointment"
        | "converted"
        | "not_suitable"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      content_status: ["draft", "published", "archived"],
      lead_status: [
        "new",
        "contacted",
        "consulting",
        "appointment",
        "converted",
        "not_suitable",
      ],
    },
  },
} as const
