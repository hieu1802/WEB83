import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    code: { type: String, unique: true, required: true }, 
    startDate: { type: Date, required: true },
    endDate: { type: Date },

    teacherPositions: [{ type: Schema.Types.ObjectId, ref: 'TeacherPosition' }],
    degrees: {
        type: {
            type: String,
            required: true,
        },
        school: { type: String, required: true },
        major: { type: String },
        year: { type: Number },
        isGraduated: { type: Boolean, default: true }
    }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher;
