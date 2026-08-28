import { Request, Response } from 'express';
import { sendSuccess } from '../utils/apiResponse.js';
import { isSupabaseConfigured, isOpenRouterConfigured, env } from '../config/env.js';

export const getHealth = (_req: Request, res: Response): void => {
  sendSuccess(res, {
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
    services: {
      supabase: isSupabaseConfigured(),
      openrouter: isOpenRouterConfigured(),
    },
  });
};
