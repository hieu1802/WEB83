import WorkExperience from '../models/WorkExperience.js';

// Tạo quá trình làm việc mới
export const createWork = async (req, res) => {
  const { company_name, role, start_date, end_date } = req.body;
  const work = new WorkExperience({ company_name, role, start_date, end_date, user_id: req.userId });

  try {
    await work.save();
    res.status(201).json({ message: 'Work experience created successfully', work });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Lấy tất cả quá trình làm việc của người dùng
export const getWorks = async (req, res) => {
  const works = await WorkExperience.find({ user_id: req.userId });
  res.json(works);
};

// Cập nhật quá trình làm việc
export const updateWork = async (req, res) => {
  const { id } = req.params;
  try {
    const work = await WorkExperience.findByIdAndUpdate(id, req.body, { new: true });
    if (!work) {
      return res.status(404).json({ message: 'Work experience not found' });
    }
    res.json({ message: 'Work experience updated successfully', work });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Xóa quá trình làm việc
export const deleteWork = async (req, res) => {
  const { id } = req.params;
  try {
    await WorkExperience.findByIdAndDelete(id);
    res.json({ message: 'Work experience deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
