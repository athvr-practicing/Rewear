const Item = require("../models/item.model");
const getFile = require("../aws/s3/get-file")

const specificItem = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid item ID',
      });
    }

    const item = await Item.findById(id)
      .populate('category', 'name description')
      .populate('uploader', 'name email')
      .select('title description category type size condition imageKey status approvalStatus pointsRequired uploader swapPreference createdAt updatedAt');

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
      });
    }

    // pre-signed URL for the item's image
    let imageUrl = null;
    if (item.imageKey) {
      try {
        imageUrl = await getFile(item.imageKey);
      } catch (error) {
        console.error(`Failed to generate signed URL for key ${item.imageKey}:`, error);
      }
    }

    const pastListingsPage = parseInt(req.query.pastListingsPage) || 1;
    const pastListingsLimit = parseInt(req.query.pastListingsLimit) || 5;
    const pastListingsSkip = (pastListingsPage - 1) * pastListingsLimit;

    const pastListings = await Item.find({
      uploader: item.uploader._id,
      _id: { $ne: id },
      status: 'available',
      approvalStatus: 'approved',
    })
      .populate('category', 'name description')
      .select('title description category type size condition imageKey status approvalStatus pointsRequired swapPreference createdAt updatedAt')
      .skip(pastListingsSkip)
      .limit(pastListingsLimit)
      .sort({ createdAt: -1 });

    const pastListingsTotal = await Item.countDocuments({
      uploader: item.uploader._id,
      _id: { $ne: id },
      status: 'available',
      approvalStatus: 'approved',
    });

    // Generate pre-signed URLs for past listings
    const pastListingsWithImageUrl = await Promise.all(
      pastListings.map(async (listing) => {
        let listingImageUrl = null;
        if (listing.imageKey) {
          try {
            listingImageUrl = await getFile(listing.imageKey);
          } catch (error) {
            console.error(`Failed to generate signed URL for key ${listing.imageKey}:`, error);
          }
        }
        return {
          ...listing.toObject(),
          imageUrl: listingImageUrl,
        };
      })
    );

    res.status(200).json({
      success: true,
      data: {
        item: {
          ...item.toObject(),
          imageUrl,
        },
        uploader: {
          _id: item.uploader._id,
          name: item.uploader.name,
          email: item.uploader.email,
          pastListings: pastListingsWithImageUrl,
          pastListingsCount: pastListings.length,
          pastListingsTotal,
          pastListingsPage,
          pastListingsTotalPages: Math.ceil(pastListingsTotal / pastListingsLimit),
        },
      },
    });
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching item',
    });
  }
};

module.exports = specificItem;