const Product = require("../Model/product");
const User = require("../Model/user");

module.exports.homeService = async (page, limit) => {
  const skip = (page - 1) * limit;

  const products = await Product.find().skip(skip).limit(limit);

  return products;
};

module.exports.getCart = async (userId) => {
  const user = await User.findById(userId).populate("cartItems.product");
  return user.cartItems;
};
module.exports.getProduct = async (id) => {
  const product = await Product.findById(id);
  return product;
};

module.exports.addToCart = async (productId, userId) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  if (product.stock <= 0) {
    throw new Error("Product is out of stock");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const existingItem = user.cartItems.find(
    (item) => item.product.toString() === productId,
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    user.cartItems.push({
      product: productId,
      quantity: 1,
    });
  }

  await user.save();
  await user.populate("cartItems.product");

  return user;
};

module.exports.countDCart = async (productId, userId) => {
  try {
    const user = await User.findById(userId).populate("cartItems.product");

    if (!user) {
      throw new Error("User not found");
    }

    const existingItem = user.cartItems.find(
      (item) => item.product._id.toString() === productId,
    );

    if (!existingItem) {
      throw new Error("Product not found in cart");
    }

    if (existingItem.quantity === 1) {
      user.cartItems = user.cartItems.filter(
        (item) => item.product._id.toString() !== productId,
      );
    } else {
      existingItem.quantity -= 1;
    }

    await user.save();

    return user;
  } catch (error) {
    console.log(error);
  }
};

module.exports.countICart = async (productId, userId) => {
  const user = await User.findById(userId).populate("cartItems.product");

  if (!user) {
    throw new Error("User not found");
  }

  const existingItem = user.cartItems.find(
    (item) => item.product._id.toString() === productId,
  );

  if (!existingItem) {
    throw new Error("Product not found in cart");
  }

  existingItem.quantity += 1;

  await user.save();

  return user;
};

module.exports.removeItemCart = async (productId, userId) => {
  const user = await User.findById(userId).populate("cartItems.product");

  if (!user) {
    throw new Error("User not found");
  }

  const existingItem = user.cartItems.find(
    (item) => item.product._id.toString() === productId,
  );

  if (!existingItem) {
    throw new Error("Product not found in cart");
  }
  user.cartItems = user.cartItems.filter(
    (item) => item.product._id.toString() !== productId,
  );

  await user.save();

  return user;
};
