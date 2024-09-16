const express = require('express');
const http = require('http');
const connectDB = require('./config/db');
const chefRoutes = require('./routes/chefRoutes');
require('./workers/pizzaWorker');
require('./workers/splitWorker');
require('./workers/jobWorker');
const { initSocket } = require('./socket');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
initSocket(server);

// Middlewares
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());

connectDB();

// Routes
app.use('/chef', chefRoutes);

const PORT = process.env.PORT || 3003;
server.listen(PORT, () => {
  console.log(`Chef service running on port ${PORT}`);
});
