const Item = require('../models/item.model');
const Category = require('../models/category.model');
const putFileURL = require('../aws/s3/upload-file');
const generateImgname = require('../utils/image-name');

const createItem = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      type,
      size,
      condition,
      pointsRequired = 0,
      swapPreference = 'both',
    } = req.body;

    // fetch from middleware
    const user = req.user;

    // Validate required fields
    const requiredFields = ['title', 'description', 'category', 'type', 'size', 'condition'];
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`,
      });
    }

    // Validate category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category',
      });
    }

    // Validate optional fields
    if (pointsRequired < 0) {
      return res.status(400).json({
        success: false,
        message: 'Points required cannot be negative',
      });
    }
    const validSwapPreferences = ['both', 'swap', 'points']; // Example values
    if (swapPreference && !validSwapPreferences.includes(swapPreference)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid swap preference',
      });
    }

    // Ensure user is authenticated
    if (!req.user?._id) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
    }

    // Generate image name and S3 key
    const imgName = generateImgname(user); // Fixed user reference
    const fileExt = 'jpeg';
    const fileKey = `uploads/${imgName}.${fileExt}`;

    // Generate pre-signed URL for upload
    const uploadUrl = await putFileURL(fileKey);

    // Create new item
    const newItem = await Item.create({
      title,
      description,
      category,
      type,
      size,
      condition,
      imageKey: imgName,
      pointsRequired,
      swapPreference,
      uploader: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: 'Item created successfully',
      data: {
        item: {
          _id: newItem._id,
          title: newItem.title,
          description: newItem.description,
          category: newItem.category,
          imageKey: newItem.imageKey,
          pointsRequired: newItem.pointsRequired,
          swapPreference: newItem.swapPreference,
        },
        uploadUrl,
      },
    });
  } catch (error) {
    console.error('Create item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating item',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

module.exports = { createItem };