import Profile from '../models/Profile.js';


export const createProfile = async (req, res) => {
  const { full_name, dob, birthplace, nationality, education } = req.body;
  const profile = new Profile({ full_name, dob, birthplace, nationality, education, user_id: req.userId });

  try {
    await profile.save();
    res.status(201).json({ message: 'Profile created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const getProfile = async (req, res) => {
  const profile = await Profile.findOne({ user_id: req.userId });
  if (!profile) {
    return res.status(404).json({ message: 'Profile not found' });
  }
  res.json(profile);
};


export const updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate({ user_id: req.userId }, req.body, { new: true });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const deleteProfile = async (req, res) => {
  try {
    await Profile.findOneAndDelete({ user_id: req.userId });
    res.json({ message: 'Profile deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
