const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Low',
    },
    status: {
        type: String,
        enum: ['Open', 'In Progress', 'Resolved'],
        default: 'Open',
    },
        createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Ticket', ticketSchema);