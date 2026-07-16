const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    cartItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 0,
          min: 0,
        },
      },
    ],
    appointments: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "appointment",
          required: true,
        },
      },
    ],
    isLoggedinn: {
      type: Boolean,
      default: false,
    },
    address: [
      {
        address: {
          type: String,
          required: true,
          trim: true,
        },

        village: {
          type: String,
          required: true,
          trim: true,
        },

        city: {
          type: String,
          trim: true,
        },
      },
    ],
    contactNo: {
      type: Number,
      required: true,
      trim: true,
      match: [/^[6-9]\d{9}$/, "Invalid mobile number"],
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
