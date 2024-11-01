import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name:{type:String, require:true},
    email:{type:String, require:true, unique: true, trim:true},
    phoneNumber:{type:String, required: false},
    address:{type:String, required: false},
    identity:{type:String, rrequired: false,unique: true},
    dob:{type:Date, require:true},
    isDeleted: { type: Boolean, default: false },
    role: {type: String,enum: ['STUDENT', 'TEACHER', 'ADMIN'],default: 'STUDENT'}
},{
    timestamps: true
});

export default mongoose.model('User', userSchema);