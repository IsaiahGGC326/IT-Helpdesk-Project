// src/components/TicketList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TicketList = ({ token, user }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/tickets', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      setTickets(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.error('Error fetching tickets:', err);
      setLoading(false);
    });
  }, [token]);

  if (loading) return <p>Loading tickets...</p>;

  return (
    <div>
      <h2>{user.role === 'user' ? 'My Tickets' : 'All Tickets'}</h2>
      {tickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        tickets.map(ticket => (
          <div key={ticket._id} className="ticket-card">
            <h3>{ticket.title}</h3>
            <p><strong>Status:</strong> {ticket.status}</p>
            <p><strong>Priority:</strong> {ticket.priority}</p>
            <p><strong>Created:</strong> {new Date(ticket.createdAt).toLocaleString()}</p>
            {user.role !== 'user' && ticket.createdBy?.email && (
              <p><strong>Submitted By:</strong> {ticket.createdBy.email}</p>
            )}
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default TicketList;
