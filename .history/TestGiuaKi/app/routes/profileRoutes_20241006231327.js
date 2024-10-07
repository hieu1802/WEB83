import express from 'express';
import { createProfile, getProfile, updateProfile, deleteProfile } from '../controllers/profileController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createProfile);
router.get('/', authMiddleware, getProfile);
router.put('/:id', authMiddleware, updateProfile);
router.delete('/:id', authMiddleware, deleteProfile);

export default router;
