import { z } from "zod";

export const contentValidation = z
  .string()
  .min(5, { message: "Content must be atleast 5 characters long!!" })
  .max(200, { message: "Content must be no longer than 200 characters!!" });

export const messageSchema = z.object({
  content: contentValidation,
});