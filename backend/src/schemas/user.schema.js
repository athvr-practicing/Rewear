const { z } = require('zod');

const userSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email format')
    .nonempty('Email cannot be empty'),
  password: z
    .string({ required_error: 'Password is required' })
    .nonempty('Password cannot be empty').minLength(8),
  name: z.string().optional(),
  points: z.number().default(0).optional(),
  role: z.enum(['user', 'admin']).default('user').optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

module.exports = userSchema;