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

module.exports.getProduct = async (req, res) => {
  try {
    let { id } = req.params;
    const result = await productService.getProduct(id);
    return res.status(200).json({
      success: true,
      message: "Product Data Fetch successfully",
      cart: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    let { id } = req.params;
    const result = await productService.deleteProduct(id);
    return res.status(200).json({
      success: true,
      message: "Product Deleted successfully",
      cart: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
