import express from 'express';
import Teacher from '../models/Teacher.js';

const router = express.Router();

// Hàm tạo mã số ngẫu nhiên
const generateUniqueCode = async () => {
    let code;
    const existingCodes = await Teacher.find().select('code');
    const existingCodeSet = new Set(existingCodes.map(teacher => teacher.code));

    do {
        code = Math.floor(100000 + Math.random() * 900000).toString(); // Tạo chuỗi số ngẫu nhiên 6 chữ số
    } while (existingCodeSet.has(code)); // Kiểm tra mã có trùng lặp không

    return code;
};

// POST: /api/teachers
router.post('/teachers', async (req, res) => {
    const { email, userId, degrees, teacherPositions } = req.body;

    try {
        const existingTeacher = await Teacher.findOne({ email });
        if (existingTeacher) {
            return res.status(400).json({ message: 'Email đã tồn tại' });
        }

        const code = await generateUniqueCode();

        const newTeacher = new Teacher({
            code,
            email,
            userId,
            degrees,
            teacherPositions,
            isActive: true,
            isDeleted: false
        });

        await newTeacher.save();

        res.status(201).json({ message: 'Giáo viên đã được tạo thành công', teacher: newTeacher });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
    }
});

export default router;
