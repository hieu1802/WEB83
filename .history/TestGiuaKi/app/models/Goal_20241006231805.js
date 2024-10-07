import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true }
});

export default mongoose.model('Goal', goalSchema);
