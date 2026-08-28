import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

export interface EnvironmentConfig {
  NODE_ENV: string;
  PORT: number;
  OPENROUTER_API_KEY: string;
  OPENROUTER_MODEL: string;
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
}

export const env: EnvironmentConfig = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '5000', 10),
  OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY || '',
  OPENROUTER_MODEL: process.env.OPENROUTER_MODEL || 'meta-llama/llama-3.3-70b-instruct',
  SUPABASE_URL: process.env.SUPABASE_URL || '',
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
};

export const isOpenRouterConfigured = (): boolean => {
  return Boolean(env.OPENROUTER_API_KEY && env.OPENROUTER_API_KEY.trim() !== '');
};

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    env.SUPABASE_URL &&
    env.SUPABASE_URL.trim() !== '' &&
    env.SUPABASE_SERVICE_ROLE_KEY &&
    env.SUPABASE_SERVICE_ROLE_KEY.trim() !== ''
  );
};
