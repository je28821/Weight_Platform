import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Product name must be at least 3 characters.")
    .max(100, "Product name cannot exceed 100 characters."),

  price: z
    .string()
    .trim()
    .regex(/^\d+(\.\d{1,2})?$/, "Price must contain only numbers.")
    .refine((value) => Number(value) > 0, {
      message: "Price must be greater than 0.",
    }),

  stock: z
    .string()
    .trim()
    .regex(/^\d+$/, "Stock must contain only numbers.")
    .refine((value) => Number(value) >= 0, {
      message: "Stock cannot be negative.",
    }),

  category: z.string().trim().min(2, "Category is required."),

  image: z
    .instanceof(File, {
      message: "Please select an image.",
    })
    .refine(
      (file) => ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
      {
        message: "Only JPG, JPEG and PNG images are allowed.",
      },
    ),

  description: z.object({
    overview: z
      .string()
      .trim()
      .min(10, "Overview must be at least 10 characters."),

    specifications: z.object({
      brand: z.string().trim().min(2, "Brand is required."),

      capacity: z.string().trim().min(1, "Capacity is required."),

      weight: z
        .string()
        .trim()
        .regex(/\d/, "Weight must contain at least one number."),

      dimensions: z
        .string()
        .trim()
        .regex(/\d/, "Dimensions must contain at least one number."),

      warranty: z
        .string()
        .trim()
        .regex(/^\d+(\.\d{1,2})?$/, "Warranty must contain only numbers."),
    }),
  }),
});
