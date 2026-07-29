import { useState } from "react";
import { productSchema } from "../Validator/productValidator";
import { addProduct } from "../Api/api";
import { useNavigate } from "react-router-dom";

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: {
      overview: "",
      specifications: {
        brand: "",
        capacity: "",
        weight: "",
        dimensions: "",
        warranty: "",
      },
    },
  });
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Added separate state for safely displaying the image preview
  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleOverviewChange = (e) => {
    setProduct({
      ...product,
      description: {
        ...product.description,
        overview: e.target.value,
      },
    });
  };

  const handleSpecificationChange = (e) => {
    setProduct({
      ...product,
      description: {
        ...product.description,
        specifications: {
          ...product.description.specifications,
          [e.target.name]: e.target.value,
        },
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = productSchema.safeParse(product);

    if (!result.success) {
      setErrors(result.error.format());
      return;
    }
    const formData = new FormData();

    formData.append("image", image);
    formData.append("description", JSON.stringify(product.description));

    Object.entries(result.data).forEach(([key, value]) => {
      if (key !== "description") {
        formData.append(key, value);
      }
    });

    setErrors({});
    try {
      let res = await addProduct(formData);
      if (res) {
        navigate("/product");
      }
    } catch (err) {}
  };

  return (
    <div className="min-h-screen bg-[#FAF4ED] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">Add New Product</h1>
          <p className="text-gray-500 mt-2">
            Fill in the details to add a new product.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-xl border border-[#E8DCCB] overflow-hidden"
        >
          <div className="grid lg:grid-cols-2 gap-10 p-8">
            {/* Left Section */}
            <div className="space-y-6">
              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  placeholder="Smart BMI Scale"
                  className="w-full rounded-xl border border-[#E8DCCB] p-3 focus:ring-2 focus:ring-orange-300 outline-none"
                />
                {errors.name?._errors && (
                  <p className="mt-2 ml-2 text-sm text-red-400">
                    {errors.name._errors[0]}
                  </p>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    placeholder="2499"
                    className="w-full rounded-xl border border-[#E8DCCB] p-3 focus:ring-2 focus:ring-orange-300 outline-none"
                  />
                  {errors.price?._errors && (
                    <p className="mt-2 ml-2 text-sm text-red-400">
                      {errors.price._errors[0]}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                    Stock
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={product.stock}
                    onChange={handleChange}
                    placeholder="15"
                    className="w-full rounded-xl border border-[#E8DCCB] p-3 focus:ring-2 focus:ring-orange-300 outline-none"
                  />
                  {errors.stock?._errors && (
                    <p className="mt-2 ml-2 text-sm text-red-400">
                      {errors.stock._errors[0]}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  placeholder="Personal Scale"
                  className="w-full rounded-xl border border-[#E8DCCB] p-3 focus:ring-2 focus:ring-orange-300 outline-none"
                />
                {errors.category?._errors && (
                  <p className="mt-2 ml-2 text-sm text-red-400">
                    {errors.category._errors[0]}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Image URL
                </label>
                <input
                  type="file"
                  name="image"
                  accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                  onChange={handleImageChange}
                  className="w-full rounded-xl border border-[#E8DCCB] p-3 file:mr-4 file:rounded-lg file:border-0 file:bg-orange-500 file:px-4 file:py-2 file:text-white file:cursor-pointer hover:file:bg-orange-600"
                />
                {errors.image?._errors && (
                  <p className="mt-2 ml-2 text-sm text-red-400">
                    {errors.image._errors[0]}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Product Overview
                </label>
                <textarea
                  rows="5"
                  value={product.description.overview}
                  onChange={handleOverviewChange}
                  placeholder="Bluetooth-enabled smart scale with BMI and body fat analysis..."
                  className="w-full rounded-xl border border-[#E8DCCB] p-3 focus:ring-2 focus:ring-orange-300 outline-none resize-none"
                />
                {errors.description?.overview?._errors && (
                  <p className="mt-2 ml-2 text-sm text-red-400">
                    {errors.description.overview._errors[0]}
                  </p>
                )}
              </div>
            </div>

            {/* Right Section */}
            <div>
              <div className="bg-[#FFF9F4] border border-[#E8DCCB] rounded-2xl p-6 h-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Specifications
                </h2>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">
                      Brand
                    </label>
                    <input
                      type="text"
                      name="brand"
                      value={product.description.specifications.brand}
                      onChange={handleSpecificationChange}
                      placeholder="FitSense"
                      className="w-full rounded-xl border border-[#E8DCCB] p-3"
                    />
                    {errors.description?.specifications?.brand?._errors && (
                      <p className="mt-2 ml-2 text-sm text-red-400">
                        {errors.description.specifications.brand._errors[0]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700">
                      Capacity
                    </label>
                    <input
                      type="text"
                      name="capacity"
                      value={product.description.specifications.capacity}
                      onChange={handleSpecificationChange}
                      placeholder="180 kg"
                      className="w-full rounded-xl border border-[#E8DCCB] p-3"
                    />
                    {errors.description?.specifications?.capacity?._errors && (
                      <p className="mt-2 ml-2 text-sm text-red-400">
                        {errors.description.specifications.capacity._errors[0]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700">
                      Weight
                    </label>
                    <input
                      type="text"
                      name="weight"
                      value={product.description.specifications.weight}
                      onChange={handleSpecificationChange}
                      placeholder="2 kg"
                      className="w-full rounded-xl border border-[#E8DCCB] p-3"
                    />
                    {errors.description?.specifications?.weight?._errors && (
                      <p className="mt-2 ml-2 text-sm text-red-400">
                        {errors.description.specifications.weight._errors[0]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700">
                      Dimensions
                    </label>
                    <input
                      type="text"
                      name="dimensions"
                      value={product.description.specifications.dimensions}
                      onChange={handleSpecificationChange}
                      placeholder="30 x 30 x 2.8 cm"
                      className="w-full rounded-xl border border-[#E8DCCB] p-3"
                    />
                    {errors.description?.specifications?.dimensions
                      ?._errors && (
                      <p className="mt-2 ml-2 text-sm text-red-400">
                        {
                          errors.description.specifications.dimensions
                            ._errors[0]
                        }
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block mb-2 font-medium text-gray-700">
                      Warranty
                    </label>
                    <input
                      type="text"
                      name="warranty"
                      value={product.description.specifications.warranty}
                      onChange={handleSpecificationChange}
                      placeholder="2 Years"
                      className="w-full rounded-xl border border-[#E8DCCB] p-3"
                    />
                    {errors.description?.specifications?.warranty?._errors && (
                      <p className="mt-2 ml-2 text-sm text-red-400">
                        {errors.description.specifications.warranty._errors[0]}
                      </p>
                    )}
                  </div>
                </div>

                {/* FIX: Use imagePreview state here instead of the File object */}
                {imagePreview && (
                  <div className="mt-8">
                    <p className="font-semibold text-gray-700 mb-3">
                      Image Preview
                    </p>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-60 w-full rounded-2xl object-cover border border-[#E8DCCB]"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-[#FFF9F4] border-t border-[#E8DCCB] p-6 flex flex-col sm:flex-row justify-end gap-4">
            <button
              type="reset"
              onClick={() => {
                setErrors({});
                setImagePreview("");
              }}
              className="px-8 py-3 rounded-xl border border-[#E8DCCB] hover:bg-[#FAF4ED] transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition shadow-lg"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
