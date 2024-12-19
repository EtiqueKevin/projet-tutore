import express from 'express';
import * as userController from 'app/controllers/UserControllers';

const router = express.Router();


router.get('/', userController.getAllUserAction);
router.get('/:id',userController.getUserByIdAction);

export default router;