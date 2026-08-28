import { Request, Response, NextFunction } from 'express';
import { dimensionService } from '../services/dimension.service.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const getDimensions = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const dimensions = await dimensionService.getDimensions();
    sendSuccess(res, dimensions, 200, {
      count: dimensions.length,
    });
  } catch (error) {
    next(error);
  }
};

export const getDimensionById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : (req.params.id as string);
    const dimension = await dimensionService.getDimensionById(id);
    sendSuccess(res, dimension);
  } catch (error) {
    next(error);
  }
};
