import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(3, "Username must be of atleast 3 characters!")
  .max(20, "Username must be no more than 20 characters!")
  .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special character!");

export const emailValidation = z
  .string()
  .email({ message: "Invalid email address!" });

export const passwordValidation = z
  .string()
  .min(6, { message: "Password must be at least 6 characters!" });

export const signUpSchema = z.object({
  username: usernameValidation,
  email: emailValidation,
  password: passwordValidation,
});