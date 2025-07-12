const { configDotenv } = require('dotenv');
const mongoose = require('mongoose');
const Category = require('./models/category.model');

configDotenv();

const defaultCategories = [
  { name: 'T-shirt', description: 'Casual t-shirts and tops' },
  { name: 'Jeans', description: 'Denim jeans and pants' },
  { name: 'Dress', description: 'Dresses for all occasions' },
  { name: 'Jacket', description: 'Jackets and blazers' },
  { name: 'Sweater', description: 'Sweaters and pullovers' },
  { name: 'Skirt', description: 'Skirts of all lengths' },
  { name: 'Shorts', description: 'Shorts and short pants' },
  { name: 'Coat', description: 'Coats and heavy outerwear' },
  { name: 'Cap', description: 'Hats and caps' },
  { name: 'Shirt', description: 'Formal and casual shirts' }
];

async function seedCategories() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if categories already exist
    const existingCategories = await Category.countDocuments();
    if (existingCategories > 0) {
      console.log('Categories already exist, skipping seeding');
      process.exit(0);
    }

    // Create categories
    const categories = await Category.insertMany(defaultCategories);
    console.log(`Successfully seeded ${categories.length} categories`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding categories:', error);
    process.exit(1);
  }
}

seedCategories(); 