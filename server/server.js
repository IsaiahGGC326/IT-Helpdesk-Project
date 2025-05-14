const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Default route
app.get('/', (req, res) => {
    res.send('IT Help Desk API Running');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.log(err));

const ticketRoutes = require('./routes/tickets');
app.use('/api/tickets', ticketRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);