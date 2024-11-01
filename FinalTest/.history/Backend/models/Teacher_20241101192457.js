import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    code: { type: String, unique: true, required: true }, 
    startDate: { type: Date, required: true },
    endDate: { type: Date },

    teacherPositions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TeacherPosition' }],
    degrees: [{
        type: {type: String},
        school: { type: String, required: true },
        major: { type: String },
        year: { type: Number },
        isGraduated: { type: Boolean, default: true }
    }]},
    {
        timestamps: true // Tự động thêm các trường createdAt và updatedAt
    });
const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher;