# 🛠️ IT Help Desk Ticketing System

This is a full-stack web application that simulates a help desk support ticketing system for IT departments. Users can submit issues, and admins can manage and resolve them.

---

## 🚀 Features

- User registration and login
- Submit a new ticket with priority and category
- View tickets by status (Open, In Progress, Resolved)
- Admin panel to manage and update tickets
- Role-based access control (User/Admin)
- Search and filter tickets
- Email notification system (optional)

---

## 🖥️ Tech Stack

**Frontend**
- React (HTML/CSS/JS)

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- CORS + dotenv

---

## 📁 Project Structure

```bash
it-helpdesk-system/
├── client/                # Frontend (optional for now)
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── .env
│   ├── server.js
