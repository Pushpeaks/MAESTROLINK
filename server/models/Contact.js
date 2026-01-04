const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  source: { type: String },
  createdAt: { type: Date, default: () => new Date() },
});

module.exports = mongoose.model('Contact', contactSchema);