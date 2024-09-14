const { Worker } = require('bullmq');
const redisConnection = require('../config/redis');
const Job = require('../models/Job');
const { addItemToSplitQueue } = require('../services/chefService');

const worker = new Worker(
  'jobQueue',
  async (job) => {
    console.log(`Processing  job with ID: ${job.id}`);
    let { order, jobId } = job.data;
    await Job.markAsInProgress(jobId);
    let orderId = order._id;
    for (let item of order.items) {
      for (let i = 1; i <= item.quantity; i++) {
        await addItemToSplitQueue(orderId, jobId, item);
      }
    }
  },
  { connection: redisConnection }
);

worker.on('completed', (job) => {
  console.log(`Job queue job completed with ID: ${job.id}`);
});

worker.on('failed', (job, err) => {
  console.error(`Job queue job failed with ID: ${job.id}, Error: ${err}`);
});
