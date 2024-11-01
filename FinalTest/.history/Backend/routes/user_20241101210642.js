import express from 'express';
import TeacherPosition from '../models/TeacherPosition.js'; // Import mô hình

const router = express.Router();

// GET: /teacher-positions
router.get('/teacher-positions', async (req, res) => {
    try {
        // Lấy tất cả các vị trí công tác không bị xóa
        const teacherPositions = await TeacherPosition.find({ isDeleted: true });

        // Kiểm tra xem có vị trí nào không
        if (teacherPositions.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy vị trí nào.' });
        }

        // Xử lý và định dạng dữ liệu để trả về
        const response = teacherPositions.map(position => ({
            id: position._id,
            name: position.name,
            code: position.code,
            description: position.des,
            isActive: position.isActive,
        }));

        // Trả về phản hồi
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình xử lý yêu cầu.' });
    }
});

export default router;