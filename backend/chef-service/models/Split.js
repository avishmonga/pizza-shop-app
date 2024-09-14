const mongoose = require('mongoose');
const statusEnum = ['created', 'in-progress', 'completed'];
const splitSchema = new mongoose.Schema({
  status: { type: String, enum: statusEnum, default: 'created' },
  isRunning: { type: Boolean, default: false },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu',
  },
  name: { type: String, required: true },
  size: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
});

splitSchema.statics.markAsInProgress = async function (id) {
  let updateOptions = { $set: { status: 'in-progress' } };

  await this.updateOne({ _id: id }, updateOptions);
  return;
};
splitSchema.statics.markAsCompleted = async function (id) {
  let updateOptions = { $set: { status: 'completed' } };

  await this.updateOne({ _id: id }, updateOptions);
  return;
};
module.exports = mongoose.model('Split', splitSchema, 'splits');
