import { Router } from 'express';
import healthRoutes from './health.routes.js';
import dreamRoutes from './dream.routes.js';
import dimensionRoutes from './dimension.routes.js';
import streamRoutes from './stream.routes.js';
import aiRoutes from './ai.routes.js';

const router = Router();

router.use('/health', healthRoutes);
router.use('/dreams', dreamRoutes);
router.use('/dimensions', dimensionRoutes);
router.use('/stream', streamRoutes);
router.use('/ai', aiRoutes);

export default router;
