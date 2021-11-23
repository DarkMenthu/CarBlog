const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'This field is required.'
  },
  description: {
    type: String,
    required: 'This field is required.'
  },
  email: {
    type: String,
    required: 'This field is required.'
  },
  specs: {
    type: Array,
    required: 'This field is required.'
  },
  category: {
    type: String,
    required: 'This field is required.'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

articleSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Article', articleSchema);