const orderService = require('../services/orderService');

exports.createOrder = async (req, res) => {
  try {
    let { clientId } = req.query;
    const order = await orderService.createOrder({
      items: req.body.items,
      totalPrice: req.body.totalPrice,
      clientId,
    });
    return res.status(201).send(order);
  } catch (err) {
    return res.status(500).send({ error: 'Error creating order' });
  }
};

exports.getOrders = async (req, res) => {
  try {
    let { clientId } = req.query;
    const orders = await orderService.getOrders(clientId);
    return res.status(200).send(orders);
  } catch (err) {
    return res.status(500).send({ error: 'Error fetching orders' });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).send({ error: 'Order not found' });
    }
    return res.status(200).send(order);
  } catch (err) {
    return res.status(500).send({ error: 'Error fetching order' });
  }
};
