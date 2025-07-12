const Item = require("../models/item.model");

let listItem = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;
    const status = req.query.status || 'available';
    const approvalStatus = req.query.approvalStatus || 'approved';

    const query = {
      status,
      approvalStatus,
    };

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
            imageUrl = await getFile(item.imageKey); // Generate pre-signed URL
          } catch (error) {
            console.error(`Failed to generate signed URL for key ${item.imageKey}:`, error);
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