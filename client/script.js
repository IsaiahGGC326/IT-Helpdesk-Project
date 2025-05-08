// client/script.js

const form = document.getElementById('ticketForm');
const list = document.getElementById('ticketList');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const ticket = {
    title: document.getElementById('title').value,
    description: document.getElementById('description').value,
    priority: document.getElementById('priority').value
  };

  try {
    const res = await fetch('http://localhost:5000/api/tickets', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ticket)
  });

  if (!res.ok) {
    throw new Error('Failed to submit ticket');
  }

  const data = await res.json();
  showToast('Ticket submitted successfully!');
  form.reset();
  fetchTickets(); // reload tickets list
} catch (error) {
    showToast('Something went wrong! Please try again.', true);
    console.error (error);
}
});

async function fetchTickets() {
  const res = await fetch('http://localhost:5000/api/tickets');
  const tickets = await res.json();

  list.innerHTML = '';
  tickets.forEach(t => {
    const li = document.createElement('li');

    const icon = {
        High: '<i class="fas fa-exclamation-circle"></i>',
        Medium: '<i class="fas fa-exclamation-triangle"></i>',
        Low: '<i class="fas fa-info-circle"></i>'
    }[t.priority];

    li.innerHTML = `${icon} [${t.priority}] <strong>${t.title}</strong> - ${t.status}`;
    li.setAttribute('data-priority', t.priority); // Set attribute for styling
    list.appendChild(li);
  });
}

document.getElementById('message').textContent = "Ticket submitted successfully!";
document.getElementById('message').style.display = "block";
setTimeout(() => {
  document.getElementById('message').style.display = "none";
}, 3000);

// Dark Mode //
const toggle = document.getElementById('darkModeToggle');

toggle.addEventListener('change', () => {
  document.body.classList.toggle('dark', toggle.checked);
});

// Toast Function //
function showToast(message, isError = false) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.backgroundColor = isError ? '#e74c3c' : '#2ecc71';
    toast.classList.add('show');
  
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
  

fetchTickets();
