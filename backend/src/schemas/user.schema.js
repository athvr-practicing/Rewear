const { z } = require("zod");

// Define enum for role
const RoleEnum = z.enum(["user", "admin"]);

// Define the Zod schema for User
const UserSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Please provide a valid email")
    .toLowerCase(),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters long"),
  name: z.string({ required_error: "Please tell us your name" }),
  points: z.number().default(50),
  role: RoleEnum.default("user"),
  avatarSeed: z.string().optional(),
  location: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

module.exports = { UserSchema };
