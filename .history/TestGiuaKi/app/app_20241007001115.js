import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import workRoutes from './routes/workRoutes.js';
import goalRoutes from './routes/goalRoutes.js';

// Khởi tạo dotenv
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Định nghĩa các route
app.use('/api/users', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/works', workRoutes);
app.use('/api/goals', goalRoutes);

// Route mặc định
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Kết nối MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
        // Lắng nghe server sau khi kết nối thành công
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => console.log('MongoDB connection error:', error));



export default app;