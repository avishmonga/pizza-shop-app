const express = require('express');
const { receiveOrder } = require('../controllers/chefController');
const router = express.Router();

router.post('/new-order', receiveOrder);

module.exports = router;
