import { Router } from 'express';
import { getStream, createTransmission } from '../controllers/stream.controller.js';
import { validateBody } from '../middleware/validate.js';
import { CreateTransmissionRequestSchema } from '../types/stream.types.js';

const router = Router();

router.get('/', getStream);
router.post('/', validateBody(CreateTransmissionRequestSchema), createTransmission);

export default router;
