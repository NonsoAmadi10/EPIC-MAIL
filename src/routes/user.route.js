import { Router } from 'express';
import userController from '../controllers/user.controller';
import Sanitize from '../middlewares/user';

const router = Router();
router.post('/auth/signup', Sanitize.signup, userController.signUp);
router.post('/auth/login', Sanitize.login, userController.loginUser);

export default router;

