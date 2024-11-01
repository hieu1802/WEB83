import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true },
    phoneNumber: { type: String, required: false },
    address: { type: String, required: false },
    identity: { type: String, required: false, unique: true },
    dob: { type: Date, required: true },
    isDeleted: { type: Boolean, default: false },
    role: { type: String, enum: ['STUDENT', 'TEACHER', 'ADMIN'], default: 'STUDENT' }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;
