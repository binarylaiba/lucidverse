import { Request, Response, NextFunction } from 'express';
import { aiService } from '../services/ai.service.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const chatWithAether = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await aiService.chatWithAether(req.body);
    sendSuccess(res, response);
  } catch (error) {
    next(error);
  }
};
