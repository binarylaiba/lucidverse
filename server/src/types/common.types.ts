export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: unknown;
  };
  meta?: Record<string, unknown>;
}

export interface HealthCheckResponse {
  status: 'ok';
  timestamp?: string;
  uptime?: number;
  environment?: string;
  services?: {
    supabase: boolean;
    openrouter: boolean;
  };
}
