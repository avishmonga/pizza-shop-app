const { Worker } = require('bullmq');
const redisConnection = require('../config/redis');
const { addPizzaToQueue } = require('../services/chefService');
const Split = require('../models/Split');

const worker = new Worker(
  'splitQueue',
  async (job) => {
    console.log(`Processing  split with ID: ${job.id}`);
    let { orderId, jobId, splitId, item } = job.data;
    await Split.markAsInProgress(splitId);
    if (item.type === 'pizza') {
      await addPizzaToQueue(orderId, jobId, splitId);
    }
  },
  { connection: redisConnection }
);

worker.on('completed', (job) => {
  console.log(`Split queue job completed with ID: ${job.id}`);
});

worker.on('failed', (job, err) => {
  console.error(`Split queue job failed with ID: ${job.id}, Error: ${err}`);
});
