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
      projects: {
        Row: {
          id: string
          uniqueId: string | null
          budgetId: string | null
          contract: string | null
          projectName: string
          scope: string | null
          sector: string | null
          tag: string | null
          team: string | null
          valueBudget: number | null
          valueRealized: number | null
          valueRemaining: number | null
          slug: string | null
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          uniqueId?: string | null
          budgetId?: string | null
          contract?: string | null
          projectName: string
          scope?: string | null
          sector?: string | null
          tag?: string | null
          team?: string | null
          valueBudget?: number | null
          valueRealized?: number | null
          valueRemaining?: number | null
          slug?: string | null
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          uniqueId?: string | null
          budgetId?: string | null
          contract?: string | null
          projectName?: string
          scope?: string | null
          sector?: string | null
          tag?: string | null
          team?: string | null
          valueBudget?: number | null
          valueRealized?: number | null
          valueRemaining?: number | null
          slug?: string | null
          createdAt?: string
          updatedAt?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
