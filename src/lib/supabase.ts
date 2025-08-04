import { createClient } from '@supabase/supabase-js';

// Environment variables with fallbacks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Check if Supabase is configured
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey;

// Database types (we'll create this later)
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: any;
        Insert: any;
        Update: any;
      };
      organizations: {
        Row: any;
        Insert: any;
        Update: any;
      };
      // Add other tables as needed
    };
  };
};

// Client-side Supabase client
export const supabase = isSupabaseConfigured 
  ? createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    })
  : null;

// Browser client for client-side usage
export function createClientComponentClient() {
  if (!isSupabaseConfigured) {
    console.warn('Supabase not configured - client will be null');
    return null;
  }
  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  });
}

// Server client for server-side usage (only use in server components)
export function createServerComponentClient() {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase URL and Anon Key are required for server client');
  }
  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  });
}

// Middleware client for API routes (only use in API routes)
export function createMiddlewareClient(request: Request) {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase URL and Anon Key are required for middleware client');
  }
  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  });
}

// Utility functions for common operations
export const supabaseUtils = {
  // Get current user
  async getCurrentUser() {
    try {
      if (!supabase) {
        console.warn('Supabase not configured');
        return null;
      }
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      return user;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  // Get user profile
  async getUserProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error getting user profile:', error);
      return null;
    }
  },

  // Get organization by user
  async getOrganizationByUser(userId: string) {
    try {
      const { data, error } = await supabase
        .from('organization_members')
        .select(`
          organization_id,
          role,
          organizations (*)
        `)
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error getting organization by user:', error);
      return null;
    }
  },

  // Check if user has permission
  async checkPermission(userId: string, organizationId: string, requiredRole: string) {
    try {
      const { data, error } = await supabase
        .from('organization_members')
        .select('role')
        .eq('user_id', userId)
        .eq('organization_id', organizationId)
        .single();

      if (error) throw error;
      
      const roleHierarchy = {
        'owner': 4,
        'admin': 3,
        'member': 2,
        'viewer': 1,
      };

      const userRoleLevel = roleHierarchy[data.role as keyof typeof roleHierarchy] || 0;
      const requiredRoleLevel = roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0;

      return userRoleLevel >= requiredRoleLevel;
    } catch (error) {
      console.error('Error checking permission:', error);
      return false;
    }
  },

  // Subscribe to real-time changes
  subscribeToChanges(table: string, filter: string, callback: (payload: any) => void) {
    return supabase
      .channel(`${table}_changes`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: table,
          filter: filter,
        },
        callback
      )
      .subscribe();
  },

  // Handle Supabase errors
  handleError(error: any): string {
    if (typeof error === 'string') {
      return error;
    }

    if (error?.message) {
      return error.message;
    }

    if (error?.error_description) {
      return error.error_description;
    }

    return 'An unexpected error occurred. Please try again.';
  },
};

// Export types for use in components
export type SupabaseClient = typeof supabase; 