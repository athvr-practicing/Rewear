const express = require("express");
const router = express.Router();

const isLoggedIn = require("../middleware/auth.middleware");
const { createItem } = require("../controllers/item.controller");
const listItem = require("../controllers/list.controller");
const specificItem = require("../controllers/specificItem.controller")
const swapItem = require("../controllers/swap.controller");

// Test endpoint to verify backend is working
router.get('/test-backend', (req, res) => {
  res.json({
    success: true,
    message: 'Backend is working correctly',
    timestamp: new Date().toISOString(),
    user: req.user ? { name: req.user.name, email: req.user.email } : null
  });
});

// Test endpoint for S3 upload
router.get('/test-s3', async (req, res) => {
  try {
    console.log('🔧 Testing S3 configuration...');
    console.log('🔧 AWS_REGION:', process.env.AWS_REGION);
    console.log('🔧 BUCKET_NAME:', process.env.BUCKET_NAME);
    console.log('🔧 AWS_ACCESS_KEY_ID:', process.env.AWS_ACCESS_KEY_ID ? 'SET' : 'NOT SET');
    console.log('🔧 AWS_SECRET_ACCESS_KEY:', process.env.AWS_SECRET_ACCESS_KEY ? 'SET' : 'NOT SET');
    
    res.json({
      success: true,
      message: 'S3 configuration test',
      config: {
        region: process.env.AWS_REGION,
        bucket: process.env.BUCKET_NAME,
        accessKeySet: !!process.env.AWS_ACCESS_KEY_ID,
        secretKeySet: !!process.env.AWS_SECRET_ACCESS_KEY
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Test endpoint to list S3 files
router.get('/test-s3-files', async (req, res) => {
  try {
    const { ListObjectsV2Command } = require("@aws-sdk/client-s3");
    const client = require('../aws/awsClient');
    
    console.log('🔧 Listing S3 files...');
    
    const command = new ListObjectsV2Command({
      Bucket: process.env.BUCKET_NAME,
      Prefix: 'uploads/', // Only list files in uploads folder
      MaxKeys: 20 // Limit to 20 files for testing
    });

    const response = await client.send(command);
    
    const files = response.Contents?.map(obj => ({
      key: obj.Key,
      size: obj.Size,
      lastModified: obj.LastModified
    })) || [];
    
    console.log('🔧 Found S3 files:', files.length);
    
    res.json({
      success: true,
      bucket: process.env.BUCKET_NAME,
      files,
      count: files.length
    });
  } catch (error) {
    console.error('❌ Error listing S3 files:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Test endpoint for user items
router.get('/test-user-items/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const User = require('../models/user.model');
    const Item = require('../models/item.model');
    const getFile = require('../aws/s3/get-file');
    
    console.log('🔍 Testing user items for:', username);
    
    // Find user by name
    const user = await User.findOne({ name: username }).select('_id name email');
    console.log('🔍 Found user:', user);
    
    if (!user) {
      return res.json({ success: false, message: 'User not found', username });
    }
    
    // Find items by user ID
    const items = await Item.find({ uploader: user._id })
      .populate('category', 'name description')
      .populate('uploader', 'name email')
      .select('title description category type size condition imageKey status pointsRequired uploader swapPreference createdAt updatedAt');
    
    console.log('🔍 Found items:', items.length);
    
    // Test image URL generation for each item
    const itemsWithImageTest = await Promise.all(
      items.map(async (item) => {
        const imageTests = {};
        
        if (item.imageKey) {
          // Test different key formats
          const keyVariations = [
            item.imageKey, // As stored in DB
            `uploads/${item.imageKey}`, // With uploads prefix
            `uploads/${item.imageKey}.jpeg`, // With uploads prefix and .jpeg extension
          ];
          
          for (const key of keyVariations) {
            try {
              const url = await getFile(key);
              imageTests[key] = { success: true, url: url.substring(0, 100) + '...' };
            } catch (error) {
              imageTests[key] = { success: false, error: error.message };
            }
          }
        }
        
        return {
          _id: item._id,
          title: item.title,
          imageKey: item.imageKey,
          imageTests
        };
      })
    );
    
    res.json({
      success: true,
      user: user,
      items: itemsWithImageTest,
      count: items.length
    });
  } catch (error) {
    console.error('❌ Error testing user items:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/upload/item', isLoggedIn, createItem);
router.get('/items', listItem);
router.get('/items/:id', specificItem);
router.post('/items/:id/swap', swapItem);

module.exports = router;