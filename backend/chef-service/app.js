const connectDB = require('./config/db');

require('./workers/pizzaWorker');
connectDB();
console.log('Chef service running, processing jobs...');
