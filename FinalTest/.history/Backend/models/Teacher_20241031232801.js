const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isActive: { type: Boolean, default: true }, // Trạng thái hoạt động của giáo viên
    isDeleted: { type: Boolean, default: false }, // Trạng thái xóa của giáo viên
    code: { type: String, unique: true, required: true }, // Mã định danh giáo viên
    startDate: { type: Date, required: true }, // Ngày bắt đầu công tác
    endDate: { type: Date }, // Ngày kết thúc công tác

    teacherPositions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TeacherPosition' }], // Danh sách khóa ngoại liên kết với Teacher Position

    degrees: {
        type: {
            type: String, // Loại bằng cấp (Cử nhân, Thạc sĩ, ...)
            required: true,
        },
        school: { type: String, required: true }, // Tên trường đào tạo
        major: { type: String }, // Chuyên ngành học
        year: { type: Number }, // Năm tốt nghiệp
        isGraduated: { type: Boolean, default: true } // Trạng thái tốt nghiệp
    }
});

module.exports = mongoose.model('Teacher', teacherSchema);
