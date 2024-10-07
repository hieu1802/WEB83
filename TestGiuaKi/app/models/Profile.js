import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  full_name: { type: String, required: true },
  dob: { type: Date, required: true },
  birthplace: { type: String, required: true },
  nationality: { type: String, required: true },
  education: { type: String, required: true }
});

export default mongoose.model('Profile', profileSchema);
