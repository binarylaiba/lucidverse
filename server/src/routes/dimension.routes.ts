import { Router } from 'express';
import { getDimensions, getDimensionById } from '../controllers/dimension.controller.js';

const router = Router();

router.get('/', getDimensions);
router.get('/:id', getDimensionById);

export default router;
