import { z } from "zod";

// Here we are verifying the format of the code, that the user will provide to us while
export const codeValidation = z
  .string()
  .length(6, "Verification code must be 6 digits!");

export const verifySchema = z.object({
  code: codeValidation,
});