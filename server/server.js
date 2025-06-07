const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Student = require('./models/Student');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // parse JSON bodies

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://admin:L8oe304pefsNeq3y@cluster0.chi71iy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes

// 1. Create new student
app.post('/api/students', async (req, res) => {
    try {
        const { name, email, enrollmentNumber } = req.body;
        const existingEmail = await Student.findOne({ email });
        const existingEnroll = await Student.findOne({ enrollmentNumber });

        if (existingEmail) {
            return res.status(400).json({ message: 'Email already exists.' });
        }
        if (existingEnroll) {
            return res.status(400).json({ message: 'Enrollment number already exists.' });
        }

        const newStudent = new Student({ name, email, enrollmentNumber });
        await newStudent.save();
        return res.status(201).json(newStudent);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error.' });
    }
});

// 2. Get all students
app.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find().sort({ createdAt: -1 });
        return res.json(students);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error.' });
    }
});

// 3. Health check (optional)
app.get('/', (req, res) => {
    res.send('Student App API is running.');
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
