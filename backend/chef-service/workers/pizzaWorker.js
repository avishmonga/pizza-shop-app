const { Worker } = require('bullmq');
const redisConnection = require('../config/redis');
const { processPizzaOrder } = require('../services/chefService');

const worker = new Worker(
  'pizzaQueue',
  async (job) => {
    console.log(`Processing pizza order with ID: ${job.id}`);
    let { orderId, splitId, jobId } = job.data;
    await processPizzaOrder(orderId, jobId, splitId);
  },
  { connection: redisConnection }
);

worker.on('completed', (job) => {
  console.log(`Pizza queue job completed with ID: ${job.id}`);
});

worker.on('failed', (job, err) => {
  console.error(`Pizza queue job failed with ID: ${job.id}, Error: ${err}`);
});
