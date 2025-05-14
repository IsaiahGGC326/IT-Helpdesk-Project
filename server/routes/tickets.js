const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const auth = require('./middleware/auth'); // Import auth middleware

// Protected route to get tickets
router.get('/', auth, async (req, res) => {
  try {
    const user = req.user;

    let tickets;
    if (user.role === 'admin' || user.role === 'staff') {
      tickets = await Ticket.find().populate('createdBy', 'email');
    } else {
      tickets = await Ticket.find({ createdBy: user._id });
    }

    res.json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Post /tickets - create new ticket
router.post('/', auth, async (req, res) => {
  try {
    console.log('REQ.USER:', req.user); // 👈 log user

    const ticketData = {
      ...req.body,
      createdBy: req.user._id,
    };

    const newTicket = new Ticket(ticketData);
    const savedTicket = await newTicket.save();
    res.status(201).json(savedTicket);
  } catch (err) {
    console.error('Ticket creation error:', err);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
