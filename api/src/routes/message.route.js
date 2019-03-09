import { Router } from 'express';
import messagesController from '../controllers/messages.controllers';

const router = Router();

router.get('/messages/unread', messagesController.fetchAllUnreadMessage);
router.get('/messages', messagesController.fetchAllMessages);
router.get('/messages/sent',messagesController.fetchAllSentMessages);
router.get('/messages/:id', messagesController.fetchSingleMessage);

export default router;
