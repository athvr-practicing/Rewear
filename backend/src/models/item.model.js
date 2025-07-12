const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'An item must have a title'],
    trim: true,
    maxlength: [100, 'Title must be less than 100 characters']
  },
  description: { 
    type: String,
    required: [true, 'An item must have a description'],
    trim: true,
    maxlength: [500, 'Description must be less than 500 characters']
  },
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', 
    required: [true, 'An item must belong to a category']
  },
  type: { 
    type: String,
    enum: ['men', 'women', 'unisex', 'kids'],
    required: true
  },
  size: { 
    type: String,
    required: true,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'Other']
  },
  condition: { 
    type: String,
    required: true,
    enum: ['new', 'like new', 'good', 'fair', 'poor'],
    default: 'good'
  },
  imageKey: { 
    type: String,
    required: [true, 'Max one img allowed']
  },
  status: { 
    type: String, 
    enum: ['available', 'pending', 'swapped', 'removed'], 
    default: 'available' 
  },
  approvalStatus: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  },
  pointsRequired: { 
    type: Number, 
    min: 0,
    default: 0 
  },
  uploader: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: [true, 'An item must belong to a user']
  },
  swapPreference: {
    type: String,
    enum: ['points', 'swap', 'both'],
    default: 'both'
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

itemSchema.index({ title: 'text', description: 'text', tags: 'text' });
itemSchema.index({ uploader: 1 });
itemSchema.index({ status: 1, approvalStatus: 1 });

module.exports = mongoose.model('Item', itemSchema);