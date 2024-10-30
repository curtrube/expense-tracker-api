import { Router } from 'express';
import userRoutes from './userRoutes.js';

const router: Router = Router();

router.use('/v1', userRoutes);

export default router;
