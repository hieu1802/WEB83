import express from 'express';
import Teacher from '../models/Teacher.js';

const router = express.Router();

// GET: /teachers
router.get('/teachers', async (req, res) => {
    try {
        const teachers = await Teacher.find({ isDeleted: false })
            .populate({
                path: 'userId',
                select: 'name email phoneNumber address -_id' // Lấy thông tin từ User
            })
            .populate({
                path: 'teacherPositions',
                select: 'name code -_id' // Lấy tên và mã của vị trí công tác
            })
            .select('code isActive degrees'); // Chọn các trường cần thiết từ Teacher

        const response = teachers.map(teacher => ({
            code: teacher.code,
            name: teacher.userId?.name,
            email: teacher.userId?.email,
            phoneNumber: teacher.userId?.phoneNumber,
            isActive: teacher.isActive,
            address: teacher.userId?.address,
            position: teacher.teacherPositions.map(position => ({
                name: position.name,
                code: position.code
            })),
            education: {
                type: teacher.degrees?.type,
                school: teacher.degrees?.school,
                major: teacher.degrees?.major,
                year: teacher.degrees?.year,
                isGraduated: teacher.degrees?.isGraduated
            }
        }));

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;