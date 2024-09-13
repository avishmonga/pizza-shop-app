const menuService = require('../services/menuService');

// Controller to add a new menu item
exports.addMenuItem = async (req, res) => {
  try {
    const menuItem = await menuService.addMenuItem(req.body);
    return res.status(201).send(menuItem);
  } catch (err) {
    return res.status(500).send({ error: 'Error adding menu item' });
  }
};

// Controller to get all menu items
exports.getMenuItems = async (req, res) => {
  try {
    const menuItems = await menuService.getMenuItems();
    return res.status(200).send(menuItems);
  } catch (err) {
    return res.status(500).send({ error: 'Error fetching menu items' });
  }
};

// Controller to get a specific menu item by ID
exports.getMenuItemById = async (req, res) => {
  try {
    const menuItem = await menuService.getMenuItemById(req.params.id);
    if (!menuItem) {
      return res.status(404).send({ error: 'Menu item not found' });
    }
    return res.status(200).send(menuItem);
  } catch (err) {
    return res.status(500).send({ error: 'Error fetching menu item' });
  }
};

// Controller to update a menu item
exports.updateMenuItem = async (req, res) => {
  try {
    const menuItem = await menuService.updateMenuItem(req.params.id, req.body);
    if (!menuItem) {
      return res.status(404).send({ error: 'Menu item not found' });
    }
    return res.status(200).send(menuItem);
  } catch (err) {
    return res.status(500).send({ error: 'Error updating menu item' });
  }
};

// Controller to delete a menu item
exports.deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await menuService.deleteMenuItem(req.params.id);
    if (!menuItem) {
      return res.status(404).send({ error: 'Menu item not found' });
    }
    return res.status(200).send({ message: 'Menu item deleted' });
  } catch (err) {
    return res.status(500).send({ error: 'Error deleting menu item' });
  }
};
