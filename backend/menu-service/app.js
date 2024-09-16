const express = require('express');
const menuRoutes = require('./routes/menuRoutes');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// Middleware
const corsOpts = {
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  exposedHeaders: ['Content-Type'],
};
app.use(cors(corsOpts));

app.use(express.json());

// Routes
app.use('/menu', menuRoutes);

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Menu service running on port ${PORT}`);
});
