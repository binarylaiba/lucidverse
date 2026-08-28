import { Router } from 'express';
import {
  generateDream,
  createDream,
  getDreams,
  getDreamById,
  deleteDream,
} from '../controllers/dream.controller.js';
import { validateBody } from '../middleware/validate.js';
import { GenerateDreamRequestSchema, CreateDreamRequestSchema } from '../types/dream.types.js';

const router = Router();

// Dream synthesis via OpenRouter AI
router.post('/generate', validateBody(GenerateDreamRequestSchema), generateDream);

// Supabase dream persistence CRUD
router.post('/', validateBody(CreateDreamRequestSchema), createDream);
router.get('/', getDreams);
router.get('/:id', getDreamById);
router.delete('/:id', deleteDream);

export default router;
