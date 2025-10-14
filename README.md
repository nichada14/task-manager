# 📝 Task Manager

A full-stack task management application built with:

- **Frontend**: Next.js + TypeScript + Tailwind CSS  
- **Backend**: Node.js + Express + MongoDB + TypeScript

---

## 🚀 Features

- User Authentication (Register / Login / Logout)
- Create, Edit, Delete tasks
- Mark tasks as done
- Task filtering (All / Active / Done)
- JWT-based protected API
- Full separation: `/client` (frontend), `/server` (backend)

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/nichada14/task-manager.git
cd task-manager

2. Install dependencies

cd client
npm install

cd server
npm install

3. Setup environment variables

Create a .env file inside the /server folder with the following content:

PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=

4. Run the project

Start the backend
cd server
npm run dev

Start the frontend
cd client
npm run dev

