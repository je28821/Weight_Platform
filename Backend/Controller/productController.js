const Product = require("../Model/product");
const productService = require("../Services/productService");

module.exports.homeController = async (req, res) => {
  try {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 9;

    if (page < 1) page = 1;
    if (limit < 1) limit = 9;
    if (limit > 9) limit = 9;

    const result = await productService.homeService(page, limit);

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await productService.getCart(userId);
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

    const result = await productService.addToCart(id, userId);
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

    const result = await productService.countDCart(id, userId);
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

    const result = await productService.countICart(id, userId);
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

    const result = await productService.removeItemCart(id, userId);
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
