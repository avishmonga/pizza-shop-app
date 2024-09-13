const express = require('express');
const {
  createOrder,
  getOrders,
  getOrderById,
} = require('../controllers/orderController');

const router = express.Router();

// Route to create a new order
router.post('/', createOrder);

// Route to get all orders
router.get('/', getOrders);

// Route to get a order by ID
router.get('/:id', getOrderById);

module.exports = router;
