const mongoose = require('mongoose');
const itemTypeEnum = ['pizza', 'soda'];
const sizeEnum = ['small', 'medium', 'large'];

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  size: { type: String, enum: sizeEnum, required: true },
  price: { type: Number, required: true },
  type: { type: String, enum: itemTypeEnum, required: true },
});

module.exports = mongoose.model('Menu', menuSchema, 'menu');
