import React, { useState } from 'react';
import axios from 'axios';

const TicketForm = ({ token }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'Low',
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    try {
      const res = await axios.post('/tickets', form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess('Ticket submitted successfully!');
      setForm({ title: '', description: '', priority: 'Low' });
    } catch (err) {
      console.error(err);
      setError('Something went wrong.');
    }
  };

  return (
    <div>
      <h2>Submit a Ticket</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <br />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe your issue"
          required
        />
        <br />
        <label>Priority:</label>
        <select name="priority" value={form.priority} onChange={handleChange}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <br />
        <button type="submit">Submit Ticket</button>
      </form>

      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default TicketForm;
