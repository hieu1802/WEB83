import express from 'express';
import { createWork, getWorks, updateWork, deleteWork } from '../controllers/workController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createWork);
router.get('/', authMiddleware, getWorks);
router.put('/:id', authMiddleware, updateWork);
router.delete('/:id', authMiddleware, deleteWork);

export default router;
