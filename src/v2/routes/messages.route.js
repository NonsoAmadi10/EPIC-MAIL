import { Router } from 'express';
import token from '../middleware/token';
import messageController from '../controllers/messages.controllers';
import Validation from '../middleware/message.validation';

const router = Router();

router.post('/messages', token.authorize, Validation.msgPost, messageController.postMessages);
router.get('/messages/received', token.authorize, messageController.getAllreceived);
router.get('/messages/unread', token.authorize, messageController.getAllUnreadMessages);
router.get('/messages/sent', token.authorize, messageController.getSentMessage);
router.get('/messages/:id', token.authorize, Validation.msgParam, messageController.getASpecificMessage);
//router.delete('/messages/:id', token.authorize, messageController.deleteMessages);

export default router;
