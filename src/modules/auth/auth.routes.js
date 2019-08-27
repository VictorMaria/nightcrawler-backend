import express from 'express';
import authController from './auth.controller';

const router = express.Router();
router.post('/signin', authController.signin);

export default router;
