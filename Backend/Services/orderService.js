const User = require("../Model/user");
const Order = require("../Model/order");

module.exports.addOrder = async (userId) => {
  try {
    const user = await User.findById(userId).populate("cartItems.product");

    if (!user) {
      throw new Error("User not found");
    }

    if (user.cartItems.length === 0) {
      throw new Error("Cart is empty");
    }

    let totalAmount = 0;

    const products = user.cartItems.map((item) => {
      totalAmount += item.product.price * item.quantity;

      return {
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      };
    });

    const order = await Order.create({
      user: user._id,
      products,
      totalAmount,
      payment: {
        method: "COD",
        status: "Pending",
      },
    });

    user.orders.push(order._id);

    user.cartItems = [];

    await user.save();

    return order;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports.getOrder = async (userId) => {
  const orders = await Order.find({ user: userId })
    .populate("products.product")
    .sort({ createdAt: -1 });

  return orders;
};
