import express from 'express';
import User from '../models/User.js'; // Import mô hình

const router = express.Router();


router.get('/user', async (req, res) => {
    try {
        // Lấy tất cả các vị trí công tác không bị xóa
        const user = await User.find({ isDeleted: false });

        // Kiểm tra xem có vị trí nào không
        if (user.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy vị trí nào.' });
        }

    

        // Trả về phản hồi
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình xử lý yêu cầu.' });
    }
});

export default router;