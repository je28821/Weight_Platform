import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Email is required")
    .max(100, "Email cannot exceed 100 characters")
    .email("Please enter a valid email address"),

  password: z
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password cannot exceed 20 characters")
    .regex(
      /^(?=.*[a-z])/,
      "Password must contain at least one lowercase letter",
    )
    .regex(
      /^(?=.*[A-Z])/,
      "Password must contain at least one uppercase letter",
    )
    .regex(/^(?=.*\d)/, "Password must contain at least one number")
    .regex(
      /^(?=.*[@$!%*?&])/,
      "Password must contain at least one special character (@$!%*?&)",
    )
    .regex(/^[A-Za-z\d@$!%*?&]+$/, "Password contains invalid characters"),
});
