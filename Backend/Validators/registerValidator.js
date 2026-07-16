const { z } = require("zod");

const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(20, "Name cannot exceed 20 characters")
    .regex(
      /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/,
      "Name can only contain letters, spaces, apostrophes, and hyphens",
    ),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Email is required")
    .max(50, "Email cannot exceed 100 characters")
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

  contactNo: z.coerce
    .number({
      invalid_type_error: "Contact number must be a number",
    })
    .refine((num) => /^[6-9]\d{9}$/.test(num.toString()), {
      message: "Invalid mobile number",
    }),

  address: z
    .array(
      z.object({
        address: z.string().trim().min(3, "Address is required"),

        village: z.string().trim().min(2, "Village is required"),
      }),
    )
    .min(1, "At least one address is required"),
});

module.exports = registerSchema;
