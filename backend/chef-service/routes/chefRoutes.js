const express = require('express');
const {
  receiveOrder,
  pendingOrders,
} = require('../controllers/chefController');
const router = express.Router();

router.get('/pending-orders', pendingOrders);
router.post('/new-order', receiveOrder);

module.exports = router;
