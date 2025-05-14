// AdminDashboard.jsx
import React from 'react';
import TicketList from '../../components/TicketList';
import TicketForm from '../../components/TicketForm';

function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, admin. Here you can manage all tickets.</p>

      {user && token ? (
        <>
        <TicketForm token={token} />
        <TicketList token={token} user={user} /> 
        </> 
      ) : (
        <p>Please log in to view tickets.</p>
      )}
   </div>
  );
}

export default AdminDashboard;
