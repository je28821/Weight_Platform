import { useEffect, useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaBoxOpen,
  FaTag,
  FaBoxes,
  FaWeightHanging,
  FaRulerCombined,
  FaShieldAlt,
  FaSearch,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { deleteProduct, homedata, updateProduct } from "../Api/api";
import { productSchema } from "../Validator/productValidator";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState({});
  const [filters, setFilters] = useState({
    page: 1,
    limit: 9,
  });
  const [totalPages, setTotalPages] = useState();
  const [openEdit, setOpenEdit] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState({
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

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      let res = await deleteProduct(id);
      setProducts(products.filter((product) => product._id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();

    const result = productSchema.safeParse(form);

    if (!result.success) {
      setErrors(result.error.format());
      return;
    }

    setErrors({});

    try {
      const res = await updateProduct(editProduct._id, form);

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === editProduct._id ? { ...product, ...form } : product,
        ),
      );
      setEditProduct(null);
      setOpenEdit(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOverviewChange = (e) => {
    setForm({
      ...form,
      description: {
        ...form.description,
        overview: e.target.value,
      },
    });
  };

  const handleSpecificationChange = (e) => {
    setForm({
      ...form,
      description: {
        ...form.description,
        specifications: {
          ...form.description.specifications,
          [e.target.name]: e.target.value,
        },
      },
    });
  };

  useEffect(() => {
    if (editProduct) {
      setForm({
        name: editProduct.name,
        price: editProduct.price,
        stock: editProduct.stock,
        category: editProduct.category,
        image: editProduct.image,
        description: {
          overview: editProduct.description.overview,
          specifications: {
            brand: editProduct.description.specifications.brand,
            capacity: editProduct.description.specifications.capacity,
            weight: editProduct.description.specifications.weight,
            dimensions: editProduct.description.specifications.dimensions,
            warranty: editProduct.description.specifications.warranty,
          },
        },
      });
    }
  }, [editProduct]);
  const fetchProducts = async () => {
    try {
      const res = await homedata({
        ...filters,
      });

      setProducts(res.products);
      setTotalPages(res.totalpages);
    } catch (err) {
      if (err.name !== "CanceledError") {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="min-h-screen bg-[#FAF4ED] p-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Product Management
            </h1>

            <p className="text-gray-500 mt-2">
              Manage your inventory, stock and product information.
            </p>
          </div>
          <Link to="/addproduct">
            <button
              className="group flex items-center gap-3 px-6 py-3 rounded-2xl
             bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600
             text-white font-semibold shadow-lg
             hover:shadow-2xl hover:scale-105
             transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center group-hover:rotate-90 transition-transform duration-300">
                <FaPlus className="text-lg" />
              </div>

              <div className="flex flex-col items-start leading-none">
                <span className="text-xs text-white/80">Create New</span>
                <span className="text-sm font-bold">Add Product</span>
              </div>
            </button>
          </Link>
        </div>

        {/* Products */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 items-stretch">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl overflow-hidden border border-[#E8DCCB]
             shadow hover:shadow-xl hover:-translate-y-1
             transition-all duration-300
             flex flex-col h-full"
            >
              {/* Product Image */}
              <div className="relative h-56 bg-[#FAF4ED] flex items-center justify-center p-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
                />

                <span className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                  {product.category}
                </span>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col flex-1">
                {/* Product Name */}
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-gray-800 line-clamp-1">
                    {product.name}
                  </h2>

                  <p className="text-sm text-gray-400 mt-1">
                    #{product._id.slice(-6)}
                  </p>
                </div>

                {/* Overview */}
                <p className="text-sm text-gray-500 leading-6 line-clamp-2 min-h-[52px]">
                  {product.description.overview}
                </p>

                {/* Price & Stock */}
                <div className="grid grid-cols-2 gap-3 my-5">
                  <div className="bg-[#FAF4ED] rounded-xl p-4">
                    <p className="text-xs text-gray-500">Price</p>

                    <h3 className="text-xl font-bold text-amber-600">
                      ₹{product.price}
                    </h3>
                  </div>

                  <div className="bg-[#FAF4ED] rounded-xl p-4">
                    <p className="text-xs text-gray-500">Stock</p>

                    <h3
                      className={`text-xl font-bold ${
                        product.stock > 10 ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {product.stock}
                    </h3>
                  </div>
                </div>

                {/* Specifications */}
                <div className="space-y-3 text-sm text-gray-600 border-t border-gray-100 pt-4">
                  <div className="flex justify-between">
                    <span>Brand</span>
                    <span className="font-semibold">
                      {product.description.specifications.brand}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Capacity</span>
                    <span className="font-semibold">
                      {product.description.specifications.capacity}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Weight</span>
                    <span className="font-semibold">
                      {product.description.specifications.weight}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Warranty</span>
                    <span className="font-semibold">
                      {product.description.specifications.warranty}
                    </span>
                  </div>
                </div>
                {/* Push Buttons to Bottom */}
                <div className="mt-auto pt-6">
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setEditProduct(product);
                        setOpenEdit(true);
                      }}
                      className="flex-1 flex items-center justify-center gap-2
                     py-3 rounded-xl
                     bg-blue-500 hover:bg-blue-600
                     text-white font-semibold
                     transition-all"
                    >
                      <FaEdit />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="flex-1 flex items-center justify-center gap-2
                     py-3 rounded-xl
                     bg-red-500 hover:bg-red-600
                     text-white font-semibold
                     transition-all"
                    >
                      <FaTrash />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {openEdit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-gray-900/40 backdrop-blur-md transition-opacity">
            <div className="bg-white rounded-[2rem] shadow-2xl shadow-black/20 w-full max-w-5xl max-h-[95vh] flex flex-col overflow-hidden relative animate-in fade-in zoom-in-95 duration-300">
              {/* Sticky Header with Glassmorphism */}
              <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-8 py-6 flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                    Edit Product
                  </h2>
                  <p className="text-sm font-medium text-gray-500 mt-1">
                    Update your product information and specifications.
                  </p>
                </div>

                <button
                  onClick={() => setOpenEdit(false)}
                  className="group relative w-11 h-11 flex items-center justify-center rounded-full bg-gray-50 hover:bg-rose-50 border border-transparent hover:border-rose-100 transition-colors duration-300"
                >
                  <span className="text-2xl text-gray-400 group-hover:text-rose-500 group-hover:rotate-90 transition-all duration-300">
                    ×
                  </span>
                </button>
              </div>

              {/* Scrollable Form Body */}
              <div className="overflow-y-auto px-8 py-8 custom-scrollbar">
                <form className="space-y-10">
                  {/* Image Preview Area */}
                  <div className="flex flex-col items-center">
                    <div className="relative group rounded-3xl overflow-hidden bg-[#FAF4ED] border-2 border-dashed border-orange-200 w-48 h-48 flex items-center justify-center transition-all duration-300 hover:border-orange-400 hover:bg-orange-50/50 hover:shadow-lg">
                      {form.image ? (
                        <>
                          <img
                            src={form.image}
                            alt="Product preview"
                            className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-110"
                          />
                          {/* Subtle overlay on hover */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="text-white font-medium text-sm">
                              Current Image
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center text-orange-300 group-hover:text-orange-500 transition-colors">
                          <svg
                            className="w-10 h-10 mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="text-sm font-semibold">
                            No Image
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Basic Details Section */}
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-5 border-b border-gray-100 pb-2">
                      Basic Details
                    </h3>
                    <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                      {/* Product Name */}
                      <div>
                        <label className="text-sm font-bold text-gray-700 mb-1.5 block">
                          Product Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3.5 outline-none transition-all duration-300 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-400/10 hover:border-orange-300"
                        />
                        {errors.name?._errors && (
                          <p className="mt-2 text-sm font-medium text-rose-500">
                            {errors.name._errors[0]}
                          </p>
                        )}
                      </div>

                      {/* Category */}
                      <div>
                        <label className="text-sm font-bold text-gray-700 mb-1.5 block">
                          Category
                        </label>
                        <input
                          type="text"
                          name="category"
                          value={form.category}
                          onChange={handleChange}
                          className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3.5 outline-none transition-all duration-300 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-400/10 hover:border-orange-300"
                        />
                        {errors.category?._errors && (
                          <p className="mt-2 text-sm font-medium text-rose-500">
                            {errors.category._errors[0]}
                          </p>
                        )}
                      </div>

                      {/* Price */}
                      <div>
                        <label className="text-sm font-bold text-gray-700 mb-1.5 block">
                          Price (₹)
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                            ₹
                          </span>
                          <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl pl-9 pr-4 py-3.5 outline-none transition-all duration-300 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-400/10 hover:border-orange-300"
                          />
                        </div>
                        {errors.price?._errors && (
                          <p className="mt-2 text-sm font-medium text-rose-500">
                            {errors.price._errors[0]}
                          </p>
                        )}
                      </div>

                      {/* Stock */}
                      <div>
                        <label className="text-sm font-bold text-gray-700 mb-1.5 block">
                          Stock Quantity
                        </label>
                        <input
                          type="number"
                          name="stock"
                          value={form.stock}
                          onChange={handleChange}
                          className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3.5 outline-none transition-all duration-300 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-400/10 hover:border-orange-300"
                        />
                        {errors.stock?._errors && (
                          <p className="mt-2 text-sm font-medium text-rose-500">
                            {errors.stock._errors[0]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Overview Section */}
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-5 border-b border-gray-100 pb-2">
                      Overview
                    </h3>
                    <textarea
                      rows={4}
                      value={form.description.overview}
                      onChange={handleOverviewChange}
                      placeholder="Detailed product description..."
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3.5 outline-none transition-all duration-300 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-400/10 hover:border-orange-300 resize-none"
                    />
                    {errors.description?.overview?._errors && (
                      <p className="mt-2 text-sm font-medium text-rose-500">
                        {errors.description.overview._errors[0]}
                      </p>
                    )}
                  </div>

                  {/* Specifications Section */}
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-5 border-b border-gray-100 pb-2">
                      Technical Specifications
                    </h3>
                    <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                      {/* Brand */}
                      <div>
                        <label className="text-sm font-bold text-gray-700 mb-1.5 block">
                          Brand
                        </label>
                        <input
                          name="brand"
                          value={form.description.specifications.brand}
                          onChange={handleSpecificationChange}
                          className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3.5 outline-none transition-all duration-300 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-400/10 hover:border-orange-300"
                        />
                        {errors.description?.specifications?.brand?._errors && (
                          <p className="mt-2 text-sm font-medium text-rose-500">
                            {errors.description.specifications.brand._errors[0]}
                          </p>
                        )}
                      </div>

                      {/* Capacity */}
                      <div>
                        <label className="text-sm font-bold text-gray-700 mb-1.5 block">
                          Capacity
                        </label>
                        <input
                          name="capacity"
                          value={form.description.specifications.capacity}
                          onChange={handleSpecificationChange}
                          className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3.5 outline-none transition-all duration-300 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-400/10 hover:border-orange-300"
                        />
                        {errors.description?.specifications?.capacity
                          ?._errors && (
                          <p className="mt-2 text-sm font-medium text-rose-500">
                            {
                              errors.description.specifications.capacity
                                ._errors[0]
                            }
                          </p>
                        )}
                      </div>

                      {/* Weight */}
                      <div>
                        <label className="text-sm font-bold text-gray-700 mb-1.5 block">
                          Weight
                        </label>
                        <input
                          name="weight"
                          value={form.description.specifications.weight}
                          onChange={handleSpecificationChange}
                          className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3.5 outline-none transition-all duration-300 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-400/10 hover:border-orange-300"
                        />
                        {errors.description?.specifications?.weight
                          ?._errors && (
                          <p className="mt-2 text-sm font-medium text-rose-500">
                            {
                              errors.description.specifications.weight
                                ._errors[0]
                            }
                          </p>
                        )}
                      </div>

                      {/* Dimensions */}
                      <div>
                        <label className="text-sm font-bold text-gray-700 mb-1.5 block">
                          Dimensions
                        </label>
                        <input
                          name="dimensions"
                          value={form.description.specifications.dimensions}
                          onChange={handleSpecificationChange}
                          className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3.5 outline-none transition-all duration-300 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-400/10 hover:border-orange-300"
                        />
                        {errors.description?.specifications?.dimensions
                          ?._errors && (
                          <p className="mt-2 text-sm font-medium text-rose-500">
                            {
                              errors.description.specifications.dimensions
                                ._errors[0]
                            }
                          </p>
                        )}
                      </div>

                      {/* Warranty */}
                      <div className="md:col-span-2">
                        <label className="text-sm font-bold text-gray-700 mb-1.5 block">
                          Warranty Details
                        </label>
                        <input
                          name="warranty"
                          value={form.description.specifications.warranty}
                          onChange={handleSpecificationChange}
                          className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3.5 outline-none transition-all duration-300 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-400/10 hover:border-orange-300"
                        />
                        {errors.description?.specifications?.warranty
                          ?._errors && (
                          <p className="mt-2 text-sm font-medium text-rose-500">
                            {
                              errors.description.specifications.warranty
                                ._errors[0]
                            }
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              {/* Sticky Footer for Actions */}
              <div className="sticky bottom-0 z-20 bg-gray-50 border-t border-gray-100 px-8 py-5 flex justify-end gap-4 rounded-b-[2rem]">
                <button
                  type="button"
                  onClick={() => setOpenEdit(false)}
                  className="px-8 py-3.5 rounded-xl font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200"
                >
                  Cancel
                </button>

                <button
                  type="button" // Changed from submit so it doesn't accidentally trigger parent forms, triggers onClick directly
                  onClick={handleUpdate}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        <section className="bg-[#FAF4ED] pb-12 py-10">
          <div className="flex justify-center">
            <div className="bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
              <button
                disabled={filters.page === 1}
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    page: prev.page - 1,
                  }))
                }
                className="px-6 py-3 rounded-xl border hover:bg-black hover:text-white transition disabled:opacity-40"
              >
                ← Previous
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      page: index + 1,
                    }))
                  }
                  className={`w-12 h-12 rounded-xl font-bold transition ${
                    filters.page === index + 1
                      ? "bg-black text-white scale-110 shadow-lg"
                      : "border hover:bg-[#FAF4ED]"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={filters.page === totalPages}
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    page: prev.page + 1,
                  }))
                }
                className="px-6 py-3 rounded-xl border hover:bg-black hover:text-white transition disabled:opacity-40"
              >
                Next →
              </button>
            </div>
          </div>
        </section>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="bg-white rounded-3xl shadow mt-10 p-16 text-center">
            <FaBoxOpen className="text-6xl text-orange-400 mx-auto mb-5" />

            <h2 className="text-2xl font-bold text-gray-700">
              No Products Found
            </h2>

            <p className="text-gray-500 mt-2">
              Add your first product to get started.
            </p>

            <button className="mt-6 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-8 py-3 rounded-xl">
              Add Product
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
