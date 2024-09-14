const { Queue } = require('bullmq');
const connection = require('../config/redis');

const pizzaQueue = new Queue('pizzaQueue', { connection });
const jobQueue = new Queue('jobQueue', { connection });
const splitQueue = new Queue('splitQueue', { connection });

module.exports = { pizzaQueue, jobQueue, splitQueue };
