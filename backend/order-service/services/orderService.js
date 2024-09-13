const Order = require('../models/orderModel');
const { pizzaQueue } = require('../queue/orderQueue');

// Create a new order
exports.createOrder = async (orderData) => {
  const order = await Order.create(orderData);

  // Add the order to the pizzaQueue for chef service
  await pizzaQueue.add('preparePizza', {
    orderId: order._id,
    items: order.items.filter((item) => item.type === 'pizza'),
  });

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
