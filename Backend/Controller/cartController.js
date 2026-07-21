const cartService = require("../Services/cartServices");

module.exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await cartService.getCart(userId);
    return res.status(200).json({
      success: true,
      message: "Cart Data Fetch successfully",
      cart: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.cartAdd = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product id is required",
      });
    }
    const userId = req.user.id;

    const result = await cartService.addToCart(id, userId);
    return res.status(200).json({
      success: true,
      message: "Product Added successfully",
      cart: result.cartItems,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.decreaseCount = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product id is required",
      });
    }
    const userId = req.user.id;

    const result = await cartService.countDCart(id, userId);
    return res.status(200).json({
      success: true,
      message: "Cart Count Decreased successfully",
      cart: result.cartItems,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.increaseCount = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product id is required",
      });
    }
    const userId = req.user.id;

    const result = await cartService.countICart(id, userId);
    return res.status(200).json({
      success: true,
      message: "Cart Count Increased successfully",
      cart: result.cartItems,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.removecartItem = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product id is required",
      });
    }
    const userId = req.user.id;

    const result = await cartService.removeItemCart(id, userId);
    return res.status(200).json({
      success: true,
      message: "Cart Item Remove successfully",
      cart: result.cartItems,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
