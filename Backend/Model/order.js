const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        qty: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    payment: {
      method: {
        type: String,
        enum: ["COD", "UPI", "Card"],
        required: true,
      },

      status: {
        type: String,
        enum: ["Pending", "Paid", "Failed", "Refunded"],
        default: "Pending",
      },

      transactionId: {
        type: String,
        default: "",
      },

      paidAt: {
        type: Date,
      },
    },
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
