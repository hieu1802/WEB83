const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const skillRoutes = require('./routes/skillRoutes');
const projectRoutes = require('./routes/projectRoutes');
const workRoutes = require('./routes/workRoutes');
const goalRoutes = require('./routes/goalRoutes');

const app = express();
app.use(express.json());

/*---------------------------------- */
app.use('/api/users', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/works', workRoutes);
app.use('/api/goals', goalRoutes);


export default app;