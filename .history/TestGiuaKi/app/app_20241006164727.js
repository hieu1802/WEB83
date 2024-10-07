import express from 'express';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import workRoutes from './routes/workRoutes.js';
import goalRoutes from './routes/goalRoutes.js';

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