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
    limit = 6,
  } = query;

  page = Math.max(1, Number(page));
  limit = Math.max(1, Number(limit));

  const filter = {};

  if (search?.trim()) {
    filter.$or = [
      {
        name: {
          $regex: search.trim(),
          $options: "i",
        },
      },
      {
        description: {
          $regex: search.trim(),
          $options: "i",
        },
      },
    ];
  }

  if (category && category !== "All") {
    filter.category = category;
  }

  if (minPrice || maxPrice) {
    filter.price = {};

    if (minPrice) {
      filter.price.$gte = Number(minPrice);
    }

    if (maxPrice) {
      filter.price.$lte = Number(maxPrice);
    }
  }

  const sortOption = {};

  switch (sort) {
    case "low":
      sortOption.price = 1;
      sortOption._id = 1;
      break;

    case "high":
      sortOption.price = -1;
      sortOption._id = 1;
      break;

    case "name":
      sortOption.name = 1;
      sortOption._id = 1;
      break;

    case "latest":
    default:
      sortOption.createdAt = -1;
      sortOption._id = -1;
      break;
  }

  const total = await Product.countDocuments(filter);

  const skip = (page - 1) * limit;

  const products = await Product.find(filter)
    .sort(sortOption)
    .skip(skip)
    .limit(limit);

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
