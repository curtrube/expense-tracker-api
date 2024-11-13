import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().max(100),
  firstName: z.string().max(5),
  lastName: z.string().max(50),
  password: z.string().max(255),
});

export type ICreateUserSchema = z.infer<typeof createUserSchema>;
