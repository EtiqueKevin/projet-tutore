import express from 'express';
import { getAllUserAction } from '@actions/getAllUserAction';
import { getUserByIdAction } from '@actions/getUserByIdAction';

const router = express.Router();

router.get('/', getAllUserAction);
router.get('/:id', getUserByIdAction);

export default router;