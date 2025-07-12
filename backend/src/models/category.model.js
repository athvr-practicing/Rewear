const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true,
    enum: ["T-shirt", "Jeans", "Dress", "Jacket", "Sweater", "Skirt", "Shorts", "Coat", "Cap", "Shirt"]
  },
  description: { type: String },
},{timestamps: true});

module.exports = mongoose.model('Category', categorySchema);