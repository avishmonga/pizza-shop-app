const Order = require('shared/pizza-shop-app/models/orderModel');
const axios = require('axios');

// Notify the chef-service of the new order
const notifyWebSocket = async (order) => {
  try {
    // Notify the chef-service of the new order

    await axios.post(
      `http://${process.env.CHEF_SERVICE_HOST}:${process.env.CHEF_SERVICE_PORT}/chef/new-order`,
      {
        order,
      }
    );
  } catch (error) {
    console.error('Error notifying chef-service:', error.message);
    throw new Error('Failed to notify chef-service');
  }
};

// Create a new order
exports.createOrder = async (orderData) => {
  const order = await Order.create(orderData);

  await notifyWebSocket(order);

  return order;
};

// Get all orders
exports.getOrders = async () => {
  return await Order.find();
};

// Get a order by ID
exports.getOrderById = async (orderId) => {
  return await Order.findById(orderId);
};
