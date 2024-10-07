import express from 'express'
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import workRoutes from './routes/workRoutes.js';
import goalRoutes from './routes/goalRoutes.js';

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Server is running');
  });
  
  mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log('MongoDB connection error:', error));
  
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

/*---------------------------------- */
app.use('/api/users', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/works', workRoutes);
app.use('/api/goals', goalRoutes);


export default app;