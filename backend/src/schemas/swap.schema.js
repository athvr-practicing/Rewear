const { z } = require('zod');

const swapSchema = z.object({
  requester: z
    .string({ required_error: 'Requester is required' })
    .nonempty('Requester ID cannot be empty')
    .refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
      message: 'Requester must be a valid MongoDB ObjectId',
    }),
  receiver: z
    .string({ required_error: 'Receiver is required' })
    .nonempty('Receiver ID cannot be empty')
    .refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
      message: 'Receiver must be a valid MongoDB ObjectId',
    }),
  requestedItem: z
    .string({ required_error: 'Requested item is required' })
    .nonempty('Requested item ID cannot be empty')
    .refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
      message: 'Requested item must be a valid MongoDB ObjectId',
    }),
  offeredItem: z
    .string()
    .nonempty('Offered item ID cannot be empty')
    .refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
      message: 'Offered item must be a valid MongoDB ObjectId',
    })
    .optional(),
  pointsUsed: z.number().default(0).optional(),
  status: z.enum(['pending', 'accepted', 'rejected', 'completed']).default('pending').optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

module.exports = swapSchema;