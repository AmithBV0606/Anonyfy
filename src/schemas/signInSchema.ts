import { z } from "zod";

// Identifier = email
export const signInSchema = z.object({
  identifier: z.string(),
  password: z.string(),
});