const { Worker } = require('bullmq');
const redisConnection = require('../config/redis');
const Order = require('shared/pizza-shop-app/models/orderModel');

const worker = new Worker(
  'pizzaQueue',
  async (job) => {
    console.log(`Processing pizza order with ID: ${job.id}`);
    await new Promise((resolve) => setTimeout(resolve, 5000 * 60)); // 5-minute preparation time
    const order = await Order.findByIdAndUpdate(job.data.orderId, {
      status: 'completed',
    });
    if (order) {
      console.log(`Order with ID: ${job.data.orderId} has been completed`);
    } else {
      console.error(`Order with ID: ${job.data.orderId} not found`);
    }
  },
  { connection: redisConnection }
);

worker.on('completed', (job) => {
  console.log(`Job completed with ID: ${job.id}`);
});

worker.on('failed', (job, err) => {
  console.error(`Job failed with ID: ${job.id}, Error: ${err}`);
});
