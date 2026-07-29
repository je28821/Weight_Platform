const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minlength: [3, "Product name must be at least 3 characters"],
      maxlength: [100, "Product name cannot exceed 100 characters"],
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },

    stock: {
      type: Number,
      required: [true, "Stock is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },

    category: {
      type: String,
      required: [true, "Category is required"],
    },

    image: {
      type: String,
      required: [true, "Product image is required"],
      trim: true,
    },
    description: {
      overview: {
        type: String,
        required: [true, "Product description is required"],
        trim: true,
      },

      specifications: {
        brand: {
          type: String,
          trim: true,
        },

        capacity: {
          type: String,
          trim: true,
        },

        weight: {
          type: String,
          trim: true,
        },

        dimensions: {
          type: String,
          trim: true,
        },

        warranty: {
          type: String,
          trim: true,
        },
      },
    },
  },
  {
    timestamps: true,
  },
);
productSchema.index({
  name: "text",
  description: "text",
});

productSchema.index({
  category: 1,
  price: 1,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
