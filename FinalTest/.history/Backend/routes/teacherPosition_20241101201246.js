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


// POST: /teacher-positions
router.post('/teacher-positions', async (req, res) => {
    const { name, code, des, isActive } = req.body;

    // Kiểm tra tính hợp lệ của dữ liệu
    if (!name || !code) {
        return res.status(400).json({ message: 'Tên và mã vị trí là bắt buộc.' });
    }

    try {
        // Kiểm tra xem mã đã tồn tại chưa
        const existingPosition = await TeacherPosition.findOne({ code });
        if (existingPosition) {
            return res.status(400).json({ message: 'Mã vị trí đã tồn tại. Vui lòng chọn mã khác.' });
        }

        // Tạo mới vị trí công tác
        const newPosition = new TeacherPosition({
            name,
            code,
            des,
            isActive: isActive !== undefined ? isActive : true, // Nếu không có giá trị, mặc định là true
        });

        // Lưu vào cơ sở dữ liệu
        await newPosition.save();

        // Trả về thông tin vị trí mới đã tạo
        res.status(201).json({
            id: newPosition._id,
            name: newPosition.name,
            code: newPosition.code,
            description: newPosition.des,
            isActive: newPosition.isActive,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình xử lý yêu cầu.' });
    }
});


export default router;
