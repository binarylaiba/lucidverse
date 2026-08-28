import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/customErrors.js';
import { sendError } from '../utils/apiResponse.js';
import { logger } from '../utils/logger.js';

export const errorHandler = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  // If headers have already been sent, delegate to default Express handler
  if (res.headersSent) {
    return;
  }

  logger.error(`${err.name}: ${err.message}`);

  if (err instanceof AppError) {
    sendError(res, err.message, err.statusCode, err.code, err.details);
    return;
  }

  // Handle SyntaxError (e.g. malformed JSON in request body)
  if (err instanceof SyntaxError && 'status' in err && (err as { status: number }).status === 400) {
    sendError(res, 'Malformed JSON payload in request body', 400, 'MALFORMED_JSON');
    return;
  }

  // Handle unexpected errors
  const isDev = process.env.NODE_ENV !== 'production';
  sendError(
    res,
    isDev ? err.message : 'An unexpected server error occurred',
    500,
    'INTERNAL_SERVER_ERROR',
    isDev ? err.stack : undefined
  );
};
