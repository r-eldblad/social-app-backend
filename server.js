const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const postsRoute = require('./routes/posts');

// CORS options
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
  exposedHeaders: 'auth-token',
};

// dotenv loader
dotenv.config();

// Database connection
const app = express();
const port = process.env.PORT || 8000;

mongoose.connect(process.env.DB_CONNECT, () => {
  console.log('Connected to database!');
});

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
// Route middleware
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/posts', postsRoute);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
