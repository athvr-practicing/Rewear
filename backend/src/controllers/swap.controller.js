const Swap = require("../models/swap.model")

const swapComplete = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id.toString();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid swap ID',
      });
    }

    // Fetch the swap
    const swap = await Swap.findById(id)
      .populate('requester', 'name email points')
      .populate('receiver', 'name email')
      .populate({
        path: 'requestedItem',
        populate: { path: 'category', select: 'name description' },
      })
      .populate({
        path: 'offeredItem',
        populate: { path: 'category', select: 'name description' },
      });

    if (!swap) {
      return res.status(404).json({
        success: false,
        message: 'Swap not found',
      });
    }

    // Check if the user is the receiver
    if (swap.receiver._id.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Only the receiver can complete the swap',
      });
    }

    // Check if swap is pending
    if (swap.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Swap is not in pending status',
      });
    }

    // Validate requestedItem
    if (swap.requestedItem.status !== 'available' || swap.requestedItem.approvalStatus !== 'approved') {
      return res.status(400).json({
        success: false,
        message: 'Requested item is not available or approved',
      });
    }

    // Validate offeredItem if present
    if (swap.offeredItem && (swap.offeredItem.status !== 'available' || swap.offeredItem.approvalStatus !== 'approved')) {
      return res.status(400).json({
        success: false,
        message: 'Offered item is not available or approved',
      });
    }

    // Validate points if used
    if (swap.pointsUsed > 0) {
      if (!swap.requester.points || swap.requester.points < swap.pointsUsed) {
        return res.status(400).json({
          success: false,
          message: 'Requester has insufficient points',
        });
      }

      // Update requester's points
      await mongoose.model('User').updateOne(
        { _id: swap.requester._id },
        { $inc: { points: -swap.pointsUsed } }
      );

      // Credit points to receiver
      await mongoose.model('User').updateOne(
        { _id: swap.receiver._id },
        { $inc: { points: swap.pointsUsed } }
      );
    }

    // Update swap status
    swap.status = 'completed';
    await swap.save();

    // Update item statuses
    await Item.updateOne({ _id: swap.requestedItem._id }, { status: 'swapped' });
    if (swap.offeredItem) {
      await Item.updateOne({ _id: swap.offeredItem._id }, { status: 'swapped' });
    }

    // Generate pre-signed URLs
    let requestedItemImageUrl = null;
    let offeredItemImageUrl = null;
    try {
      if (swap.requestedItem.imageKey) {
        requestedItemImageUrl = await getFile(swap.requestedItem.imageKey);
      }
      if (swap.offeredItem && swap.offeredItem.imageKey) {
        offeredItemImageUrl = await getFile(swap.offeredItem.imageKey);
      }
    } catch (error) {
      console.error('Error generating signed URLs:', error);
    }

    // Prepare response
    const response = {
      ...swap.toObject(),
      requestedItem: {
        ...swap.requestedItem.toObject(),
        imageUrl: requestedItemImageUrl,
        status: 'swapped',
      },
      offeredItem: swap.offeredItem
        ? {
            ...swap.offeredItem.toObject(),
            imageUrl: offeredItemImageUrl,
            status: 'swapped',
          }
        : null,
      status: 'completed',
    };

    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error('Error completing swap:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while completing swap',
    });
  }
};


module.exports = swapComplete