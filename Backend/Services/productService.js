const Product = require("../Model/product");
const User = require("../Model/user");

module.exports.homeService = async (query) => {
  let {
    search,
    category,
    minPrice,
    maxPrice,
    sort,
    page = 1,
    limit = 9,
  } = query;

  page = Number(page);
  limit = Number(limit);

  const filter = {};

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  if (category && category !== "All") {
    filter.category = category;
  }

  if (minPrice || maxPrice) {
    filter.price = {};

    if (minPrice) filter.price.$gte = Number(minPrice);

    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }
  const sortOption = {};

  switch (sort) {
    case "low":
      sortOption.price = 1;
      break;

    case "high":
      sortOption.price = -1;
      break;

    case "name":
      sortOption.name = 1;
      break;

    case "latest":
      sortOption.createdAt = -1;
      break;

    default:
      sortOption.createdAt = -1;
  }

  const products = await Product.find(filter)
    .sort(sortOption)
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Product.countDocuments(filter);

  return {
    products,

    totalProducts: total,

    totalPages: Math.ceil(total / limit),

    currentPage: page,
  };
};
module.exports.getProduct = async (id) => {
  const product = await Product.findById(id);
  return product;
};

module.exports.updateProduct = async (id, data) => {
  const product = await Product.findByIdAndUpdate(
    id,
    { ...data },
    {
      new: true,
      runValidators: true,
    },
  );

  return product;
};

module.exports.deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  return product;
};
