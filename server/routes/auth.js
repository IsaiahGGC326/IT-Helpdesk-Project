const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user exists
        const existUser = await User.findOne({ email });
        if (existUser) return res.status(400).json({ message: 'User already exists'});

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        res.status(201).json({ message: 'User Created', user: savedUser.username });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid email or password'});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password'});

        const token = jwt.sign(
            { id: user._id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
          );          

        res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
      } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;