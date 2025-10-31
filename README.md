**🗳️ Voting Application Backend**

A Node.js + Express.js based backend system for an online voting application where both Admin and Voter roles are managed.
Admins can handle voters and candidates, while voters can cast their vote only once.


🚀 **Features**

User Roles: Admin and Voter

Voter Management:Admin can add, update, and delete voters

Candidate Management: Admin can add and view candidates

**Voting System:**
Each voter can vote only once
Votes are counted and stored securely

**Results:**
Admin can view top candidates (sorted by highest to lowest votes)
Authentication & Authorization:Secure JWT-based authentication
Passwords hashed using bcrypt

Database: MongoDB used for data storage

🛠️ **Tech Stack**
Backend: Node.js, Express.js
Database: MongoDB (Mongoose)
Authentication: JWT, bcrypt
Environment Variables: dotenv

📂 **Project Structure**

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

⚙️ Setup and Installation

1. Clone the repository
   git clone https://github.com/jhapriyanshu766/voting-app-backend.git
   cd voting-app-backend
2.Install dependencies
   npm install
3.Create .env file
   **Add your environment variables**
   
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=8080
4. Start the server
   npm start


📡 **API Endpoints**

🔐 Auth
| Method   | Endpoint       | Description                                                  |
| :------- | :------------- | :----------------------------------------------------------- |
| **POST** | `/user/signup` | Register a new user (admin/voter). Only one admin can exist. |
| **POST** | `/user/login`  | Login with Aadhar number and password to get a JWT token.    |

👤 User Routes
| Method  | Endpoint                 | Description                                        |
| :------ | :----------------------- | :------------------------------------------------- |
| **GET** | `/user/profile`          | Get logged-in user details. *(Requires JWT token)* |
| **PUT** | `/user/profile/password` | Update user password. *(Requires JWT token)*       |

🗳️ Candidate Routes
| Method     | Endpoint                       | Description                                                   |
| :--------- | :----------------------------- | :------------------------------------------------------------ |
| **POST**   | `/candidate/`                  | Add a new candidate. *(Admin only)*                           |
| **PUT**    | `/candidate/:candidateID`      | Update candidate details. *(Admin only)*                      |
| **DELETE** | `/candidate/:candidateID`      | Delete a candidate. *(Admin only)*                            |
| **POST**   | `/candidate/vote/:candidateId` | Cast a vote for a candidate. *(Voter only, one vote allowed)* |
| **GET**    | `/candidate/vote/count`        | Get vote counts for all candidates (sorted by highest votes). |


📈** Future Enhancements**

Add role-based dashboard APIs
Add email verification for voters
Integrate frontend (React/Next.js)
Deploy backend on Render/Railway


👨‍💻 **Author**
Priyanshu Jha
Computer Science & Engineering Student


