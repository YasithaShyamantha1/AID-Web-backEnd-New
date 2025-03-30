
import express from 'express';
import { generateResponse } from '../application/chatController';

const router = express.Router();

router.post('/', generateResponse);

export default router;