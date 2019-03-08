import { Router } from 'express';
import userController from '../controllers/user.controller';

const router = Router();
router.post('/auth/signup', userController.signUp);
router.post('/auth/login', userController.loginUser);

export default router;

