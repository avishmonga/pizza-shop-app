const { Server } = require('socket.io');
let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: '*', // Allow all origins (will adjust in production)
      methods: ['GET', 'POST'],
    },
  });

  // Handle  connection
  io.on('connection', (socket) => {
    console.log('Admin connected for real-time updates');
    // Handle  disconnection
    socket.on('disconnect', () => {
      console.log('Admin disconnected');
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};

module.exports = { initSocket, getIO };
