const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'This field is required.'
  },
  description: {
    type: String,
    required: 'This field is required.'
  }
});

categorySchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Category', categorySchema);