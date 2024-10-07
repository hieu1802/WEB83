import Skill from '../models/Skill.js';

// Tạo kỹ năng mới
export const createSkill = async (req, res) => {
  const { name, level } = req.body;
  const skill = new Skill({ name, level, user_id: req.userId });

  try {
    await skill.save();
    res.status(201).json({ message: 'Skill created successfully', skill });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Lấy tất cả kỹ năng của người dùng
export const getSkills = async (req, res) => {
  const skills = await Skill.find({ user_id: req.userId });
  res.json(skills);
};

// Cập nhật kỹ năng
export const updateSkill = async (req, res) => {
  const { id } = req.params;
  try {
    const skill = await Skill.findByIdAndUpdate(id, req.body, { new: true });
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.json({ message: 'Skill updated successfully', skill });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Xóa kỹ năng
export const deleteSkill = async (req, res) => {
  const { id } = req.params;
  try {
    await Skill.findByIdAndDelete(id);
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};