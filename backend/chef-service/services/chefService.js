const { getIO } = require('../socket');
const { pizzaQueue, jobQueue, splitQueue } = require('../queue/chefQueue');
const Order = require('shared/pizza-shop-app/models/orderModel');
const Job = require('../models/Job');
const Split = require('../models/Split');

const jobOptions = {
  attempts: 5,
  backoff: {
    type: 'exponential',
    delay: 5000,
  },
};
/**
 * Calculates the estimated time remaining and the number of  pending orders.
 *
 * @returns {Promise<Object>} - An object containing:
 *  - `estimatedTimeInMinutes`: The total estimated time in minutes.
 *  - `pendingOrders`: The count of unique pending orders.
 *
 */
const calculatePendingOrdersAndTime = async () => {
  try {
    const results = await Split.aggregate([
      {
        $match: {
          status: { $ne: 'completed' },
          type: 'pizza',
        },
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          uniqueOrderIds: { $addToSet: '$orderId' },
        },
      },
      {
        $project: {
          _id: 0,
          estimatedPreprationTimeInMinutes: { $multiply: ['$count', 5] },
          pendingOrders: { $size: '$uniqueOrderIds' },
        },
      },
    ]);

    const result = results[0] || {
      estimatedPreprationTimeInMinutes: 0,
      pendingOrders: 0,
    };
    return result;
  } catch (error) {
    console.error('Error executing calculatePendingOrdersAndTime:', error);
    throw error;
  }
};

/**
 * Adding pizza to the pizzaQueue for chef to be prepared
 *
 * @param {ObjectId} orderId - The ID of the order to which the pizza belongs.
 * @param {ObjectId} jobId - The job ID associated with the task of preparing the pizza.
 * @param {ObjectId} splitId - The ID of the split in which the pizza is being prepared.
 * @returns {Promise<void>} - A promise that resolves when the pizza is successfully added to the queue.

 */
const addPizzaToQueue = async (orderId, jobId, splitId) => {
  try {
    // Add pizza to the pizzaQueue for chef
    await pizzaQueue.add(
      'preparePizza',
      {
        orderId,
        jobId,
        splitId,
      },
      jobOptions
    );
    console.log(
      `Order ${orderId} pizza of split ${splitId} added to pizza queue`
    );
  } catch (error) {
    console.error(
      `Failed to add pizza of order ${orderId} split ${splitId}  to pizza queue:`,
      error
    );
  }
};
/**
 * Adds an order to the jobQueue for processing by the chef.
 *
 * @param {Object} order - The order object that contains details of the order.
 * @returns {Promise<void>} - A promise that resolves when the order is successfully added to the job queue.
 *
 */
const addOrderToJobQueue = async (order) => {
  let orderId = order._id;
  try {
    let job = await Job.create({
      orderId,
      status: 'created',
      isRunning: false,
    });
    await jobQueue.add(
      'prepareOrder',
      {
        order,
        jobId: job._id,
      },
      jobOptions
    );

    // Emit an event to notify admin that a new order has been placed
    const io = getIO();
    io.emit('orderAdded', {
      order,
    });
    console.log(`Order ${orderId} added to pizza queue`);
  } catch (error) {
    console.error(`Failed to add order ${orderId} to job queue:`, error);
  }
};

/**
 * Adds an order's item to the splitQueue for processing by the chef.
 * @param {ObjectId} orderId - The ID of the order to which the pizza belongs.
 * @param {ObjectId} jobId - The job ID associated with the task of preparing the pizza.
 * @param {Object} item - The item object that contains details of the item of the menu.
 * @returns {Promise<void>} - A promise that resolves when the item is successfully added to the split queue.
 *
 */
const addItemToSplitQueue = async (orderId, jobId, item) => {
  try {
    let split = await Split.create({
      orderId,
      jobId,
      itemId: item._id,
      name: item.name,
      size: item.size,
      type: item.type,
      price: item.price,
    });
    await splitQueue.add(
      'prepareItem',
      { item, splitId: split._id, jobId, orderId },
      jobOptions
    );
    console.log(`Item ${item._id} for order  ${orderId}  added to split queue`);
  } catch (error) {
    console.error(
      `Failed to add item ${item._id} for order ${orderId} to split queue:`,
      error
    );
  }
};

/**
 * Function to handle pizza preparation used by pizza worker.
 * @param {ObjectId} orderId - The ID of the order to which the pizza belongs.
 * @param {ObjectId} jobId - The job ID associated with the task of preparing the pizza.
 * @param {ObjectId} splitId - The ID of the split in which the pizza is being prepared.
 * @returns {Promise<void>} - A promise that resolves when the pizza got ready.
 *
 */
// Function to handle pizza preparation
async function processPizzaOrder(orderId, jobId, splitId) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 5000 * 60)); // 5 minutes
    await Split.markAsCompleted(splitId);

    let pendingSplits = await Split.find({
      jobId,
      status: { $ne: 'completed' },
    }).countDocuments();
    if (pendingSplits === 0) {
      const order = await Order.findByIdAndUpdate(orderId, {
        status: 'completed',
      });
      const io = getIO();

      if (order) {
        console.log(`Order with ID: ${orderId} has been completed`);
        await Job.markAsCompleted(jobId);
        // Notify admin that the pizza is ready
        io.emit('orderCompleted', {
          orderId,
        });
      } else {
        console.error(`Order with ID: ${orderId} not found`);
      }
      // Notify admin about estimated time remaining and pending orders
      let { estimatedPreprationTimeInMinutes, pendingOrders } =
        await calculatePendingOrdersAndTime();
      io.emit('pendingOrdersAndTime', {
        estimatedPreprationTimeInMinutes,
        pendingOrders,
      });
    }
  } catch (error) {
    console.error(`Failed to process order ${orderId}:`, error);
  }
}

module.exports = {
  addOrderToJobQueue,
  processPizzaOrder,
  addItemToSplitQueue,
  addPizzaToQueue,
};
