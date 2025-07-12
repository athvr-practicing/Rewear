const { z } = require("zod");

// Define enum for category names
const CategoryNameEnum = z.enum([
  "T-shirt",
  "Jeans",
  "Dress",
  "Jacket",
  "Sweater",
  "Skirt",
  "Shorts",
  "Coat",
  "Cap",
  "Shirt",
]);

// Define the Zod schema for Category
const CategorySchema = z.object({
  name: CategoryNameEnum,
  description: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

module.exports = { CategorySchema };
