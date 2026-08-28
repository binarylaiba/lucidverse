import { Router } from 'express';
import { chatWithAether } from '../controllers/ai.controller.js';
import { validateBody } from '../middleware/validate.js';
import { ChatRequestSchema } from '../types/ai.types.js';

const router = Router();

router.post('/chat', validateBody(ChatRequestSchema), chatWithAether);

export default router;
