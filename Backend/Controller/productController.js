const Product = require("../Model/product");
const productService = require("../Services/productService");

module.exports.homeController = async (req, res) => {
  try {
    const result = await productService.homeService(req.query);

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products: result.products,
      totalpages: result.totalPages,
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

module.exports.updateProduct = async (req, res) => {
  try {
    let { id } = req.params;
    let data = req.body;

    const result = await productService.updateProduct(id, data);

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: result,
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
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
