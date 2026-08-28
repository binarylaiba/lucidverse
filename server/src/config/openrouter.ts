import { env, isOpenRouterConfigured } from './env.js';

export const OPENROUTER_API_BASE = 'https://openrouter.ai/api/v1';

export const getOpenRouterHeaders = (): Record<string, string> => {
  if (!isOpenRouterConfigured()) {
    throw new Error('OpenRouter API is not configured. Please set OPENROUTER_API_KEY in server/.env');
  }

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
    'HTTP-Referer': 'https://aetherdream.ai',
    'X-Title': 'AetherDream Subconscious Explorer',
  };
};

export const openrouter = {
  isConfigured: isOpenRouterConfigured,
  getHeaders: getOpenRouterHeaders,
  apiBase: OPENROUTER_API_BASE,
  defaultModel: env.OPENROUTER_MODEL,
};
