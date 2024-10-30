import { Router } from 'express';
import userController from '../controllers/userController.js';

const router: Router = Router();

router.get('/users', userController.getUser);
router.get('/users/:id', userController.getUserById);

export default router;
