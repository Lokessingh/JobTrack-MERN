# JobTrack-MERN – Job Application Tracker

A MERN stack web application that helps users manage and track their job applications in one place.

## Features

- User registration and login
- Secure authentication using JWT
- Add, edit, and delete job applications
- Track application status: Applied, Interview, Offer, and Rejected
- Search and filter job applications
- Dashboard with application statistics and charts
- Protected routes
- User-specific job application data

## Technologies Used

**Frontend:** React.js, Vite, CSS  
**Backend:** Node.js, Express.js  
**Database:** MongoDB, Mongoose  
**Authentication:** JWT and bcrypt.js

## Project Structure

- `client/` – React frontend
- `server/` – Node.js and Express backend
- `.gitignore` – Files excluded from Git

## Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/Lokessingh/JobTrack-MERN.git
cd JobTrack-MERN
```

### 2. Install backend dependencies

```bash
cd server
npm install
```

Configure your backend `.env` file with your MongoDB connection string, JWT secret, and port.

### 3. Start the backend

Run the start command defined in `server/package.json`.

### 4. Install frontend dependencies

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Open the local URL displayed in the terminal.

## Security

- Passwords are hashed before storage.
- Protected API routes require authentication.
- Users can access only their own job applications.
- Environment variables must remain private and should never be committed to GitHub.

## Future Enhancements

- AI-powered resume analysis
- Job recommendations
- Application reminders
- Online deployment

## Author

**Lokessingh**

GitHub: https://github.com/Lokessingh
