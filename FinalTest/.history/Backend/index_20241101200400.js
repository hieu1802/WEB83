import express from 'express';
import mongoose from 'mongoose';
import teacherRouter from './routes/teacher.js'; // Đường dẫn đến tệp router của bạn
import teacherPositionRoutes from './routes/teacherPosition.js'

const app = express();
const PORT = process.env.PORT || 3000;

// Kết nối đến MongoDB
mongoose.connect('mongodb://localhost:27017/hieu', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Kết nối thành công đến MongoDB'))
.catch(err => console.error('Lỗi kết nối đến MongoDB:', err));

// Middleware
app.use(express.json()); // Để nhận dữ liệu JSON
app.use('/api', teacherRouter); // Sử dụng router cho các API liên quan đến giáo viên
app.use('/api', teacherPositionRoutes);

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
