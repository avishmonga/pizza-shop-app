const express = require('express');
const mongoose = require('mongoose');
const orderRoutes = require('./routes/orderRoutes');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/orders', orderRoutes);

connectDB();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Order service running on port ${PORT}`);
});
