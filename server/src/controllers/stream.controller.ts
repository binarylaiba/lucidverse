import { Request, Response, NextFunction } from 'express';
import { streamService } from '../services/stream.service.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const getStream = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 30;
    const transmissions = await streamService.getRecentTransmissions(limit);
    sendSuccess(res, transmissions, 200, {
      count: transmissions.length,
    });
  } catch (error) {
    next(error);
  }
};

export const createTransmission = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const transmission = await streamService.recordTransmission(req.body);
    sendSuccess(res, transmission, 201);
  } catch (error) {
    next(error);
  }
};
