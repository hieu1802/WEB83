import express from 'express';
import User from '../models/User.js'; // Import mô hình

const router = express.Router();


router.get('/user', async (req, res) => {
    try {
        const users = await User.find({ isDeleted: false });; // Tìm tất cả người dùng không bị xóa
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;