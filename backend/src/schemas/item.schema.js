const { z } = require('zod');

const itemSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .nonempty('Title cannot be empty'),
  description: z.string().optional(),
  category: z.string().optional(),
  type: z.string().optional(),
  size: z.string().optional(),
  condition: z.string().optional(),
  tags: z.array(z.string()).optional(),
  imageName: z.array(z.string()).optional(),
  status: z.enum(['available', 'pending', 'swapped']).default('available').optional(),
  approvalStatus: z.enum(['pending', 'approved', 'rejected']).default('pending').optional(),
  pointsRequired: z.number().default(0).optional(),
  uploader: z
    .string({ required_error: 'Uploader is required' })
    .nonempty('Uploader ID cannot be empty')
    .refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
      message: 'Uploader must be a valid MongoDB ObjectId',
    }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

module.exports = itemSchema;