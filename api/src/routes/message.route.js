import { Router } from 'express';
import messagesController from '../controllers/messages.controllers';

const router = Router();

router.get('/messages/unread', messagesController.fetchAllUnreadMessage);
router.get('/messages', messagesController.fetchAllMessages)

export default router;
