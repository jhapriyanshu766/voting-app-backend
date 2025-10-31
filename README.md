# Voting Application Backend

A Node.js + Express.js backend for an online voting application supporting Admin and Voter roles.

## Overview

This repository implements a secure voting backend where:

- Admins can manage voters and candidates.
- Voters can authenticate and cast exactly one vote.
- Votes are counted and stored in MongoDB.

## Features

- User Roles: Admin and Voter
- Voter Management: Admin can add, update, and delete voters
- Candidate Management: Admin can add and view candidates
- Voting System: Each voter can vote only once; votes are securely stored
- Results: Admin can view top candidates ordered by votes
- Authentication & Authorization: JWT-based auth
- Passwords hashed using bcrypt

## Tech Stack

- Backend: Node.js, Express.js
- Database: MongoDB (Mongoose)
- Authentication: JWT, bcrypt
- Environment: dotenv

## Project Structure

```text
voting-app-backend/
│
├── models/
│   ├── user.js
│   └── candidate.js
│
├── routes/
│   ├── userRoutes.js
│   ├── candidateRoutes.js
│   └── voteRoutes.js
│
├── db.js
├── jwt.js
├── server.js
├── package.json
└── .env
```

## Setup & Installation

1. Clone the repository

   git clone https://github.com/jhapriyanshu766/voting-app-backend.git
   cd voting-app-backend

2. Install dependencies

   npm install

3. Create a `.env` file in the project root and add the environment variables:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=8080
```

4. Start the server

   npm start

## API Endpoints

### Authentication

- POST `/user/signup` — Register a new user (admin/voter). Only one admin can exist.
- POST `/user/login` — Login with Aadhar number and password to receive a JWT token.

### User Routes (Require JWT)

- GET `/user/profile` — Get logged-in user details.
- PUT `/user/profile/password` — Update user password.

### Candidate Routes

- POST `/candidate/` — Add a new candidate. (Admin only)
- PUT `/candidate/:candidateID` — Update candidate details. (Admin only)
- DELETE `/candidate/:candidateID` — Delete a candidate. (Admin only)
- POST `/candidate/vote/:candidateId` — Cast a vote for a candidate. (Voter only, one vote allowed)
- GET `/candidate/vote/count` — Get vote counts for all candidates (sorted by highest votes).

## Authentication & Security

- Passwords are hashed with bcrypt.
- JWT tokens are used to protect routes and enforce role-based access.
- Ensure your `JWT_SECRET` is strong and kept secure.

## Future Enhancements

- Role-based dashboard APIs
- Email verification for voter accounts
- Frontend integration (React / Next.js)
- Deploy backend to Render / Railway / Heroku

## Author

Priyanshu Jha
Computer Science & Engineering Student
Maharana Pratap Engineering College, Kanpur
💻 Linkedin:https://www.linkedin.com/in/priyanshu-jha-139057199
Email: priyanshujha722@gmail.com

