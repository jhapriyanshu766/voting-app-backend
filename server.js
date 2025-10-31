const express = require("express");
const app = express();
const db = require('./db');
require('dotenv').config();

app.use(express.json());

const port = process.env.PORT || 8080;

// Import routes
const userRoutes = require('./routes/userRoutes');
const candidateRoutes = require('./routes/candidateRoutes');



app.use('/user', userRoutes);
app.use('/candidate', candidateRoutes);

// Test root route
app.get('/', (req, res) => {
    res.send("Server is up and running!");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
