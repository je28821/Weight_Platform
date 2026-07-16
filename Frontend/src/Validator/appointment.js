import { z } from "zod";

export const appointmentSchema = z
  .object({
    type: z.string().trim().min(1, "Appointment type is required"),

    date: z
      .string()
      .min(1, "Appointment date is required")
      .refine((value) => !isNaN(Date.parse(value)), {
        message: "Please select a valid date",
      }),

    time: z.string().min(1, "Appointment time is required"),

    reason: z
      .string()
      .trim()
      .min(5, "Reason must be at least 5 characters")
      .max(300, "Reason cannot exceed 300 characters"),

    address: z
      .object({
        address: z.string().trim(),
        city: z.string().trim(),
        village: z.string().trim(),
        pincode: z.string().trim(),
      })
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === "Home Repair") {
      if (!data.address?.address || data.address.address.length < 5) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["address", "address"],
          message: "Address must be at least 5 characters",
        });
      }

      if (!data.address?.city || data.address.city.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["address", "city"],
          message: "City is required",
        });
      }

      if (!data.address?.village || data.address.village.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["address", "village"],
          message: "Village is required",
        });
      }

      if (
        !data.address?.pincode ||
        !/^[1-9][0-9]{5}$/.test(data.address.pincode)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["address", "pincode"],
          message: "Please enter a valid 6-digit pincode",
        });
      }
    }
  });
