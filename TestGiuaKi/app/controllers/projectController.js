import Project from '../models/Project.js';


export const createProject = async (req, res) => {
  const { name, description, role, start_date, end_date } = req.body;
  const project = new Project({ name, description, role, start_date, end_date, user_id: req.userId });

  try {
    await project.save();
    res.status(201).json({ message: 'Project created successfully', project });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getProjects = async (req, res) => {
  const projects = await Project.find({ user_id: req.userId });
  res.json(projects);
};


export const updateProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findByIdAndUpdate(id, req.body, { new: true });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project updated successfully', project });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    await Project.findByIdAndDelete(id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
