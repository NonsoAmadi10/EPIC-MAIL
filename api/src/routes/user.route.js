import { Router } from 'express';
import userController from '../controllers/user.controller';

const router = Router();
router.post('/auth/signup', userController.signUp);


export default router;

