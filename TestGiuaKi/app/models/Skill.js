import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  level: { type: String, required: true }
});

export default mongoose.model('Skill', skillSchema);
