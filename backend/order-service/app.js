const express = require('express');
const orderRoutes = require('./routes/orderRoutes');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// Middleware
const corsOpts = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Type'],
  credentials: true,
};

app.use(cors(corsOpts));
app.use(express.json());

// Routes
app.use('/orders', orderRoutes);

connectDB();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Order service running on port ${PORT}`);
});
