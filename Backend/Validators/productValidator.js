const { z } = require("zod");

module.exports.productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Product name must be at least 3 characters.")
    .max(100, "Product name cannot exceed 100 characters."),

  price: z.coerce
    .number({
      invalid_type_error: "Price must be a number.",
    })
    .positive("Price must be greater than 100."),

  stock: z.coerce
    .number({
      invalid_type_error: "Stock must be a number.",
    })
    .min(0, "Stock cannot be negative."),

  category: z.string().trim().min(2, "Category is required."),

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
        .regex(/\d/, "Dimensions must contain at least one number."),
    }),
  }),
});
