const express = require('express');
const menuRoutes = require('./routes/menuRoutes');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/menu', menuRoutes);

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Menu service running on port ${PORT}`);
});
