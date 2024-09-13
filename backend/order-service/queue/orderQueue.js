const { Queue } = require('bullmq');
const redis = require('../config/redis');

const pizzaQueue = new Queue('pizzaQueue', { connection: redis });

module.exports = { pizzaQueue };
