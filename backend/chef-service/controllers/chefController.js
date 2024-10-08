const {
  addOrderToJobQueue,
  getPendingOrders,
} = require('../services/chefService');

exports.receiveOrder = async (req, res) => {
  try {
    const { order } = req.body;
    console.log(`Chef-service received order: ${order._id}`);

    await addOrderToJobQueue(order);

    return res
      .status(200)
      .send({ message: 'Order received by chef-service and added to queue' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.pendingOrders = async (req, res) => {
  try {
    let data = await getPendingOrders();
    return res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
