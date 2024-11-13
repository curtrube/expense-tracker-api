import { Router } from 'express';
import { userRouter } from '../user/user.router.js';

const router: Router = Router();

router.use('/v1', userRouter);

export default router;
