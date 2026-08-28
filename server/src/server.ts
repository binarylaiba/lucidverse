import { createApp } from './app.js';
import { env, isOpenRouterConfigured, isSupabaseConfigured } from './config/env.js';
import { logger } from './utils/logger.js';

const app = createApp();
const PORT = env.PORT || 5000;

const server = app.listen(PORT, () => {
  logger.info(`✨ AetherDream Server running on http://localhost:${PORT}`);
  logger.info(`🔮 Health Check: http://localhost:${PORT}/api/health`);
  logger.info(`📡 OpenRouter API status: ${isOpenRouterConfigured() ? 'CONFIGURED' : 'NOT CONFIGURED (Check .env)'}`);
  logger.info(`🗄️ Supabase status: ${isSupabaseConfigured() ? 'CONFIGURED' : 'NOT CONFIGURED (Check .env)'}`);
});

// Graceful shutdown handling
const shutdown = (signal: string) => {
  logger.info(`Received ${signal}. Shutting down gracefully...`);
  server.close(() => {
    logger.info('Server closed cleanly.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
