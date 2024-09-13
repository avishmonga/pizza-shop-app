const Menu = require('../models/menuModel');

// Add a new menu item
exports.addMenuItem = async (menuData) => {
  return await Menu.create(menuData);
};

// Get all menu items
exports.getMenuItems = async () => {
  return await Menu.find();
};

// Get a specific menu item by ID
exports.getMenuItemById = async (id) => {
  return await Menu.findById(id);
};

// Update a menu item
exports.updateMenuItem = async (id, menuData) => {
  return await Menu.findByIdAndUpdate(id, menuData, { new: true });
};

// Delete a menu item
exports.deleteMenuItem = async (id) => {
  return await Menu.findByIdAndDelete(id);
};
