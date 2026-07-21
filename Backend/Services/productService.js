const Product = require("../Model/product");
const User = require("../Model/user");

module.exports.homeService = async (page, limit) => {
  const skip = (page - 1) * limit;

  const products = await Product.find().skip(skip).limit(limit);

  return products;
};
module.exports.getProduct = async (id) => {
  const product = await Product.findById(id);
  return product;
};

module.exports.deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  return product;
};
