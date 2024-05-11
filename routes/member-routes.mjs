import express from 'express';
import { listMembers } from '../controllers/member-controller.mjs';

const router = express.Router();

router.route('/').get(listMembers);

export default router;
