/**
 * Mock Supabase Client
 * Provides the same interface as Supabase but without backend dependencies
 */

// Mock auth object
export const mockSupabase = {
  auth: {
    signOut: async () => {
      return { error: null };
    },
  signInWithPassword: async ({ email }: { email: string; password: string }) => {
      // Always succeed for demo
      return {
        data: {
          user: { id: 'mock-id', email },
          session: { access_token: 'mock-token' }
        },
        error: null
      };
    },
  signUp: async ({ email }: { email: string; password: string }) => {
      return {
        data: {
          user: { id: 'mock-id', email },
          session: null
        },
        error: null
      };
    },
  onAuthStateChange: (_callback: any) => {
      // Mock subscription
      return {
        data: { subscription: { unsubscribe: () => {} } }
      };
    }
  },
  from: (_table: string) => ({
    select: () => ({
      eq: () => ({
        single: async () => ({ data: null, error: null }),
        then: async (_fn: any) => _fn({ data: [], error: null })
      }),
      then: async (_fn: any) => _fn({ data: [], error: null })
    }),
    insert: () => ({
      select: () => ({
        single: async () => ({ data: null, error: null })
      })
    }),
    update: () => ({
      eq: () => ({
        then: async (_fn: any) => _fn({ data: null, error: null })
      })
    })
  })
};

// Export as default supabase for compatibility
export const supabase = mockSupabase;