const express = require('express');
const orderRoutes = require('./routes/orderRoutes');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// Middleware
app.use(
  cors({
    origin: 'http://localhost:3000', // Allow your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow the HTTP methods you use
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow headers you need
  })
);

app.use(express.json());

// Routes
app.use('/orders', orderRoutes);

connectDB();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Order service running on port ${PORT}`);
});
