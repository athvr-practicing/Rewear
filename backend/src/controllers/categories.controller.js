const Category = require("../models/category.model");

const listCategories = async (req, res) => {
  try {
    const categories = await Category.find().select(
      "name description _id createdAt updatedAt"
    );

    if (categories.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No categories found",
        count: 0,
      });
    }

    res.status(200).json({
      success: true,
      data: categories,
      count: categories.length,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching categories",
    });
  }
};

module.exports = listCategories;
