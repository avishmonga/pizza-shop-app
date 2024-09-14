const mongoose = require('mongoose');
const statusEnum = ['created', 'in-progress', 'completed'];

const jobSchema = new mongoose.Schema({
  status: { type: String, enum: statusEnum, default: 'created' },
  isRunning: { type: Boolean, default: false },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  },
});

jobSchema.statics.markAsInProgress = async function (job) {
  let updateOptions = { $set: { status: 'in-progress' } };

  await this.updateOne({ _id: job._id }, updateOptions);
  return;
};
jobSchema.statics.markAsCompleted = async function (job) {
  let updateOptions = { $set: { status: 'completed' } };

  await this.updateOne({ _id: job._id }, updateOptions);
  return;
};

module.exports = mongoose.model('Job', jobSchema, 'jobs');
