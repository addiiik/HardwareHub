import { z } from "zod"

export const loginSchema = z.object({
  email: z
    .email("Please enter a valid email address")
    .refine(
      (email) => email.endsWith("@company.com"),
      {
        message: "You must use your @company.com email address",
      }
    ),

  password: z
    .string()
    .min(1, "Password is required"),
})

export type LoginFormValues = z.infer<typeof loginSchema>