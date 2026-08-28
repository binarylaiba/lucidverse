const sanitize = (val: unknown): unknown => {
  if (typeof val === 'string') {
    return val
      .replace(/sk-or-v1-[a-zA-Z0-9_-]+/g, '[REDACTED_OPENROUTER_KEY]')
      .replace(/Bearer\s+[a-zA-Z0-9_\-.]+/gi, 'Bearer [REDACTED_TOKEN]')
      .replace(/eyJ[a-zA-Z0-9_\-.]+/g, '[REDACTED_JWT]');
  }
  if (val && typeof val === 'object') {
    try {
      const copy = JSON.parse(JSON.stringify(val));
      for (const key of Object.keys(copy)) {
        if (/key|secret|token|password|auth/i.test(key)) {
          copy[key] = '[REDACTED]';
        } else if (typeof copy[key] === 'object') {
          copy[key] = sanitize(copy[key]);
        } else if (typeof copy[key] === 'string') {
          copy[key] = sanitize(copy[key]);
        }
      }
      return copy;
    } catch {
      return val;
    }
  }
  return val;
};

export const logger = {
  info: (message: string, ...args: unknown[]) => {
    console.log(`[INFO] ${new Date().toISOString()} - ${sanitize(message)}`, ...args.map(sanitize));
  },
  warn: (message: string, ...args: unknown[]) => {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, ...args.map(sanitize));
  },
  error: (message: string, ...args: unknown[]) => {
    console.error(`[ERROR] ${new Date().toISOString()} - ${sanitize(message)}`, ...args.map(sanitize));
  },
  debug: (message: string, ...args: unknown[]) => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[DEBUG] ${new Date().toISOString()} - ${sanitize(message)}`, ...args.map(sanitize));
    }
  },
};
