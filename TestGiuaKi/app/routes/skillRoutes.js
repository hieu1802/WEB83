import express from 'express';
import { createSkill, getSkills, updateSkill, deleteSkill } from '../controllers/skillController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createSkill);
router.get('/', authMiddleware, getSkills);
router.put('/:id', authMiddleware, updateSkill);
router.delete('/:id', authMiddleware, deleteSkill);

export default router;
