const Item = require("../models/item.model");
const getFile = require("../aws/s3/get-file");

let listItem = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;
    const status = req.query.status || 'available';
    const approvalStatus = req.query.approvalStatus || 'approved';
    const uploader = req.query.uploader; // Filter by uploader ID
    const uploaderName = req.query.uploaderName; // Filter by uploader name

    const query = {
      status,
    };

    // Handle multiple approval statuses (comma-separated)
    if (approvalStatus.includes(',')) {
      query.approvalStatus = { $in: approvalStatus.split(',') };
    } else {
      query.approvalStatus = approvalStatus;
    }

    // Add uploader filter if provided
    if (uploader) {
      query.uploader = uploader;
    }

    // If filtering by uploader name, find the user first
    if (uploaderName && !uploader) {
      const User = require('../models/user.model');
      const user = await User.findOne({ name: uploaderName }).select('_id');
      if (user) {
        query.uploader = user._id;
      } else {
        // If user not found, return empty results
        return res.status(200).json({
          success: true,
          data: [],
          count: 0,
          total: 0,
          page,
          totalPages: 0,
        });
      }
    }

    const items = await Item.find(query)
      .populate('category', 'name description')
      .populate('uploader', 'name email')
      .select('title description category type size condition imageKey status approvalStatus pointsRequired uploader swapPreference createdAt updatedAt')
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder });

    const total = await Item.countDocuments(query);

    const itemsWithImageUrl = await Promise.all(
      items.map(async (item) => {
        let imageUrl = null;
        if (item.imageKey) {
          try {
            console.log('🔧 Getting signed URL for imageKey:', item.imageKey);
            imageUrl = await getFile(item.imageKey); // Use imageKey as stored in DB
            console.log('✅ Generated image URL:', imageUrl?.substring(0, 100) + '...');
          } catch (error) {
            console.error(`❌ Failed to generate signed URL for key ${item.imageKey}:`, error);
            // Fallback: try with uploads prefix if not already included
            if (!item.imageKey.includes('uploads/')) {
              try {
                console.log('🔧 Trying fallback with uploads prefix...');
                const fallbackKey = `uploads/${item.imageKey}.jpeg`;
                imageUrl = await getFile(fallbackKey);
                console.log('✅ Fallback succeeded with key:', fallbackKey);
              } catch (fallbackError) {
                console.error(`❌ Fallback also failed:`, fallbackError);
              }
            }
          }
        }
        return {
          ...item.toObject(),
          imageUrl, // Add pre-signed URL
        };
      })
    );

    res.status(200).json({
      success: true,
      data: itemsWithImageUrl,
      count: items.length,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching items',
    });
  }
};

module.exports = listItem;