# JobTrack-MERN – Job Application Tracker

A MERN Stack web application that helps users manage and track their job applications in one place.

## Features

- User registration and login
- Secure authentication using JWT
- Password hashing using bcrypt
- Add, edit, and delete job applications
- Track application statuses: Applied, Interview, Offer, and Rejected
- Search and filter job applications
- Dashboard with application statistics and charts
- Protected routes for authenticated users
- User-specific job application data
- Secure access control to prevent users from modifying other users' job applications

## Technologies Used

**Frontend**
- React.js
- Vite
- JavaScript
- CSS

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB
- Mongoose

**Authentication and Security**
- JSON Web Token (JWT)
- bcrypt.js

## Project Structure

```text
JobTrack-MERN/
├── client/                 # React frontend
└── server/                 # Node.js and Express backend
    ├── middleware/
    ├── models/
    ├── routes/
    ├── .env                # Private environment variables
    ├── server.js
    └── package.json
```

## Prerequisites

Before running the project, install:

- Node.js and npm
- MongoDB or a MongoDB Atlas account
- Git

## Run the Project Locally

### 1. Clone the Repository

```bash
git clone https://github.com/Lokessingh/JobTrack-MERN.git
cd JobTrack-MERN
```

### 2. Configure the Backend

Open a terminal in the project folder and run:

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder and configure these environment variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
```

Replace the example values with your own configuration. Never upload your actual `.env` file or secrets to GitHub.

**Note:** The variable names above must match those used in your backend code.

### 3. Start the Backend

From the `server` folder, run:

```bash
npm run dev
```

Alternatively, use the start script:

```bash
npm start
```

The backend is expected to run on port `5000`, provided that your configuration and server code use this port.

### 4. Install Frontend Dependencies

Open a second terminal in the project root and run:

```bash
cd client
npm install
```

### 5. Start the Frontend

Run:

```bash
npm run dev
```

Open the local URL displayed in your terminal. With the current Vite configuration, it may be:

```text
http://localhost:5173
```

## Security

- Passwords are hashed before being stored.
- Protected API routes require valid authentication.
- JWT is used to authenticate users.
- Users can access only their own job applications.
- Environment variables and credentials should remain private.

## Future Enhancements

- AI-powered resume analysis
- Job recommendations
- Application reminders
- Online deployment

## Author

**Lokessingh**

GitHub: https://github.com/Lokessingh
