import express from 'express';
import mongoose from 'mongoose';
import Teacher from '../models/Teacher.js';
import user from "../models/User.js"
import teacherPosition from "../models/TeacherPosition.js"

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
        // Kiểm tra định dạng của userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'userId không hợp lệ' });
        }

        // Kiểm tra định dạng của từng phần tử trong teacherPositions
        const validPositions = teacherPosition.every(position => mongoose.Types.ObjectId.isValid(position));
        if (!validPositions) {
            return res.status(400).json({ message: 'Một hoặc nhiều vị trí không hợp lệ' });
        }

        // Kiểm tra xem email có tồn tại chưa
        const existingTeacher = await Teacher.findOne({ email });
        if (existingTeacher) {
            return res.status(400).json({ message: 'Email đã tồn tại' });
        }

        const code = await generateUniqueCode();

        // Tạo một giáo viên mới
        const newTeacher = new Teacher({
            code,
            email,
            userId: new mongoose.Types.ObjectId(userId), // Chuyển đổi thành ObjectId
            degrees,
            teacherPositions: teacherPosition.map(position => new mongoose.Types.ObjectId(position)), // Chuyển đổi từng vị trí thành ObjectId
            isActive: true,
            isDeleted: false,
            startDate: new Date(), // Thêm startDate nếu cần
        });

        await newTeacher.save();

        res.status(201).json({ message: 'Giáo viên đã được tạo thành công', teacher: newTeacher });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
    }
});

// GET: /teachers - Lấy danh sách toàn bộ giáo viên
router.get('/teachers', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const teachers = await Teacher.find()
            .populate({
                path: "userId",
                select: "name email phoneNumber address",
                match: { role: 'TEACHER' }
            })
            .populate("teacherPositions", "name")
            .skip(skip)
            .limit(limit)
            .exec();

        const teacherList = teachers
            .filter(teacher => teacher.userId)
            .map(teacher => ({
                code: teacher.code,
                name: teacher.userId.name,
                email: teacher.userId.email,
                phoneNumber: teacher.userId.phoneNumber,
                address: teacher.userId.address,
                isActive: teacher.isActive,
                teacherPositions: teacher.teacherPositions.map(pos => pos.name),
                degrees: teacher.degrees.map(degree => ({
                    type: degree.type,
                    school: degree.school,
                    major: degree.major,
                    year: degree.year,
                    isGraduated: degree.isGraduated
                }))
            }));

        res.status(200).json(teacherList);
    } catch (error) {
        console.error("Error retrieving teachers:", error);
        res.status(500).json({ message: "Lỗi server khi lấy danh sách giáo viên", error });
    }
});



export default router;

