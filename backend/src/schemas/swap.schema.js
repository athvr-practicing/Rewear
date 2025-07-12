const { z } = require("zod");

// Define enum for status
const StatusEnum = z.enum(["pending", "accepted", "rejected", "completed"]);

// Define the Zod schema for Swap
const SwapSchema = z.object({
  requester: z.string({ required_error: "A swap must have a requester" }),
  receiver: z.string({ required_error: "A swap must have a receiver" }),
  requestedItem: z.string({
    required_error: "A swap must have a requested item",
  }),
  offeredItem: z.string().optional(),
  pointsUsed: z.number().default(0),
  status: StatusEnum.default("pending"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

module.exports = { SwapSchema };
