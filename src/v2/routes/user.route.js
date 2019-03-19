import { Router } from 'express';
import Sanitize from '../../middlewares/user.validation';
import token from '../middleware/token';
import userController from '../controllers/authController';

const router = Router();

router.post('/signup', Sanitize.signup, userController.signup, token.generateTokenSignup);
router.post('/login', Sanitize.login, userController.login, token.generateTokenLogin);
export default router;
