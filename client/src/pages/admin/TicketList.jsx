// src/pages/admin/TicketList.jsx
import React, { useEffect, useState } from 'react';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/tickets')
      .then((res) => res.json())
      .then((data) => setTickets(data))
      .catch((err) => console.error('Error fetching tickets:', err));
  }, []);

  return (
    <div>
      <h2>All Tickets</h2>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket._id}>
            <strong>{ticket.title}</strong> - {ticket.priority} - {ticket.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketList;
