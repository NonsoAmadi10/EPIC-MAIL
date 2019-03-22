import { Router } from 'express';
import token from '../middleware/token';
import groupController from '../controllers/groupControllers';
import Validator from '../middleware/message.validation';
import Validate from '../middleware/groups.validation';

const router = Router();

router.post('/groups', token.authorize, groupController.createGroup);
router.get('/groups', token.authorize, groupController.getAllGroups);
router.post('/group/:id/users/', token.authorize, Validate.groupUtils, groupController.addUsertoGroup);
router.patch('/group/:id/name', token.authorize, Validator.msgParam, Validate.groupUtils, groupController.updateAllGroups);
router.delete('/group/:id/name', token.authorize, Validator.msgParam, groupController.deleteAGroup);
router.delete('/group/:id/users/:id', token.authorize, Validator.msgParam, groupController.deleteUserInGroup);

export default router;
