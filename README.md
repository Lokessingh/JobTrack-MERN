# 🚀 JobTrack – Job Application Tracker

**JobTrack** is a full-stack MERN application designed to help job seekers manage, organize, and track their job applications in one place.

Users can create an account, manage job applications, update application statuses, and monitor their job search progress through an interactive dashboard.

---

## 🌐 Live Demo

| Resource | Link |
|---|---|
| **Live Website** | https://job-track-mern.vercel.app |
| **Backend API** | https://jobtrack-backend-82z3.onrender.com |
| **GitHub Repository** | https://github.com/Lokessingh/JobTrack-MERN |

---

## ✨ Features

- **User Authentication:** Secure registration and login.
- **Password Security:** Password hashing using bcrypt.
- **JWT Authentication:** Token-based authentication.
- **Protected Routes:** Dashboard accessible only to authenticated users.
- **Job Management:** Add, view, edit, and delete job applications.
- **Application Status Tracking:** Applied, Interview, Offer, and Rejected.
- **Search Functionality:** Search by company, role, or location.
- **Status Filtering:** Filter applications by their current status.
- **Dashboard Analytics:** Summary cards and interactive charts.
- **User Data Isolation:** Each user can access only their own applications.
- **Responsive Design:** Works on desktop and smaller screens.
- **Session Management:** Secure logout and session handling.

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- React Router
- Axios
- Recharts
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt

### Deployment & Tools
- Git & GitHub
- Vercel (Frontend Hosting)
- Render (Backend Hosting)
- MongoDB Atlas

---

## 📂 Project Structure

```text
JobTrack-MERN/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── Dashboard.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## ⚙️ Installation & Setup

Follow these steps to run JobTrack locally.

### 1. Clone the Repository

```bash
git clone https://github.com/Lokessingh/JobTrack-MERN.git
```

```bash
cd JobTrack-MERN
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend:

```bash
npm start
```

### 3. Setup Frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Open the local URL displayed in your terminal.

---

## 🔐 Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Backend server port |
| `MONGODB_URI` | MongoDB database connection string |
| `JWT_SECRET` | Secret key used for JWT authentication |

**Note:** Never upload your actual `.env` file, database credentials, or JWT secret to GitHub.

---

## 🔄 Application Workflow

1. Register a new account.
2. Login using your email and password.
3. Access the protected dashboard.
4. Add a new job application.
5. Update application details and status.
6. Search and filter your applications.
7. Monitor your progress using dashboard charts.
8. Logout securely.

---

## 📊 Dashboard Analytics

JobTrack provides an interactive dashboard to visualize:

- Total job applications.
- Applied applications.
- Interviews in progress.
- Offers received.
- Applications by job type.
- Applications by status.

---

## 🔒 Security

- Passwords are hashed before being stored.
- JWT-based authentication protects private routes.
- Backend middleware verifies authentication tokens.
- User-specific database queries prevent access to other users' applications.
- Sensitive environment variables are stored separately.

---

## 👨‍💻 Author

**Lokesh Singh**

B.Tech – Computer Science and Engineering

GitHub: [Lokessingh](https://github.com/Lokessingh)


