const express = require('express');
const {
  addMenuItem,
  getMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
} = require('../controllers/menuController');

const router = express.Router();

// Route to add a new menu item --> Later on we will add user validation to this means admin will only access this route
router.post('/', addMenuItem);

// Route to get all menu items
router.get('/', getMenuItems);

// Route to get a specific menu item by ID
router.get('/:id', getMenuItemById);

// Route to update a menu item --> Later on we will add user validation to this means admin will only access this route
router.put('/:id', updateMenuItem);

// Route to delete a menu item --> Later on we will add user validation to this means admin will only access this route
router.delete('/:id', deleteMenuItem);

module.exports = router;
