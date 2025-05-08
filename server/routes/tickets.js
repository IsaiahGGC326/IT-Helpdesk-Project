const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// Post /tickets - create new ticket
router.post('/', async (req, res) => {
    try {
        const newTicket = new Ticket(req.body);
        const savedTicket = await newTicket.save();
        res.status(201).json(savedTicket);
      } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET /tickets - View all tickets
router.get('/', async (req, res) => {
    try {
        const tickets = await Ticket.find().sort({ createdAt: -1});
        res.json(tickets); 
    }   catch (err) {
        res.status(500).json({ error: err.message});
    }
});

module.exports = router;
