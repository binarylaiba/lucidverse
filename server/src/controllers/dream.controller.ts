import { Request, Response, NextFunction } from 'express';
import { dreamService } from '../services/dream.service.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const generateDream = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { prompt } = req.body;
    const generatedDream = await dreamService.generateDream(prompt);
    sendSuccess(res, generatedDream, 200, {
      synthesizedAt: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};

export const createDream = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const savedDream = await dreamService.saveDream(req.body);
    sendSuccess(res, savedDream, 201);
  } catch (error) {
    next(error);
  }
};

export const getDreams = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const dreams = await dreamService.getDreams();
    sendSuccess(res, dreams, 200, {
      count: dreams.length,
    });
  } catch (error) {
    next(error);
  }
};

export const getDreamById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : (req.params.id as string);
    const dream = await dreamService.getDreamById(id);
    sendSuccess(res, dream);
  } catch (error) {
    next(error);
  }
};

export const deleteDream = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : (req.params.id as string);
    await dreamService.deleteDream(id);
    sendSuccess(res, { message: `Dream ${id} removed successfully` });
  } catch (error) {
    next(error);
  }
};
