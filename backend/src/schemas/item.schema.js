const { z } = require("zod");

// Define enums for validation
const ItemTypeEnum = z.enum(["men", "women", "unisex", "kids"]);
const SizeEnum = z.enum(["XS", "S", "M", "L", "XL", "XXL", "XXXL", "Other"]);
const ConditionEnum = z.enum(["new", "like new", "good", "fair", "poor"]);
const StatusEnum = z.enum(["available", "swapped", "removed"]);
const SwapPreferenceEnum = z.enum(["points", "swap", "both"]);

// Define the Zod schema for Item
const ItemSchema = z.object({
  title: z
    .string({ required_error: "An item must have a title" })
    .trim()
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string({ required_error: "An item must have a description" })
    .trim()
    .max(500, "Description must be less than 500 characters"),
  category: z
    .string({ required_error: "An item must belong to a category" })
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid category ID format"),
  type: ItemTypeEnum,
  size: SizeEnum,
  condition: ConditionEnum.default("good"),
  imageKey: z.string({ required_error: "Max one img allowed" }),
  status: StatusEnum.default("available"),
  pointsRequired: z.number().min(0).default(0),
  uploader: z
    .string({ required_error: "An item must belong to a user" })
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID format"),
  swapPreference: SwapPreferenceEnum.default("both"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

module.exports = { ItemSchema };
