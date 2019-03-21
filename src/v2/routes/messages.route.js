import { Router } from 'express';
import token from '../middleware/token';
import messageController from '../controllers/messages.controllers';

const router = Router();

router.post('/messages', token.authorize, messageController.postMessages);
router.get('/messages/received', token.authorize, messageController.getAllreceived);
router.get('/messages/unread', token.authorize, messageController.getAllUnreadMessages);
router.get('/messages/sent', token.authorize, messageController.getSentMessage);
router.get('/messages/:id', token.authorize, messageController.getASpecificMessage);

export default router;
