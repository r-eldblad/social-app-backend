const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};
// Import routes
const authRoute = require('./routes/auth');

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

mongoose.connect(process.env.DB_CONNECT, () => {
  console.log('Connected to database!');
});

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
// Route middleware
app.use('/api/user', authRoute);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
