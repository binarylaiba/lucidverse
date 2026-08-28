import { Response } from 'express';
import { ApiResponse } from '../types/common.types.js';

export const sendSuccess = <T>(
  res: Response,
  data: T,
  statusCode = 200,
  meta?: Record<string, unknown>
): Response => {
  const response: ApiResponse<T> = {
    success: true,
    data,
    ...(meta && { meta }),
  };
  return res.status(statusCode).json(response);
};

export const sendError = (
  res: Response,
  message: string,
  statusCode = 500,
  code = 'ERROR',
  details?: unknown
): Response => {
  const response: ApiResponse = {
    success: false,
    error: {
      message,
      code,
      ...(details !== undefined && { details }),
    },
  };
  return res.status(statusCode).json(response);
};
