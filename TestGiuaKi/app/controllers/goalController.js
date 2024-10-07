import Goal from '../models/Goal.js';


export const createGoal = async (req, res) => {
  const { description } = req.body;
  const goal = new Goal({ description, user_id: req.userId });

  try {
    await goal.save();
    res.status(201).json({ message: 'Goal created successfully', goal });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const getGoals = async (req, res) => {
  const goals = await Goal.find({ user_id: req.userId });
  res.json(goals);
};


export const updateGoal = async (req, res) => {
  const { id } = req.params;
  try {
    const goal = await Goal.findByIdAndUpdate(id, req.body, { new: true });
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    res.json({ message: 'Goal updated successfully', goal });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const deleteGoal = async (req, res) => {
  const { id } = req.params;
  try {
    await Goal.findByIdAndDelete(id);
    res.json({ message: 'Goal deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
