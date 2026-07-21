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
import { Link } from "react-router-dom";
import { deleteProduct, homedata } from "../Api/api";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [page, setpage] = useState(1);
  const [limit, setlimit] = useState(9);
  const [totalPages, setTotalPages] = useState(2);
  const [openEdit, setOpenEdit] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    overview: "",
    brand: "",
    capacity: "",
    weight: "",
    dimensions: "",
    warranty: "",
    image: "",
  });

  const handleDelete = async (id) => {
    try {
      let res = await deleteProduct(id);
      setProducts(products.filter((product) => product._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (editProduct) {
      setForm({
        name: editProduct.name,
        price: editProduct.price,
        stock: editProduct.stock,
        category: editProduct.category,
        overview: editProduct.description.overview,
        brand: editProduct.description.specifications.brand,
        capacity: editProduct.description.specifications.capacity,
        weight: editProduct.description.specifications.weight,
        dimensions: editProduct.description.specifications.dimensions,
        warranty: editProduct.description.specifications.warranty,
        image: editProduct.image,
      });
    }
  }, [editProduct]);

  useEffect(() => {
    async function fetchData() {
      const res = await homedata(page, limit);
      console.log(res);

      if (res.success) {
        setProducts(res.data);
      }
    }

    fetchData();
  }, [page]);
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
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex justify-between items-center px-8 py-6 border-b">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">
                    Edit Product
                  </h2>
                  <p className="text-gray-500 mt-1">
                    Update product information.
                  </p>
                </div>

                <button
                  onClick={() => setOpenEdit(false)}
                  className="w-10 h-10 rounded-full hover:bg-gray-100 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Form */}
              <form className="p-8 space-y-8">
                {/* Image Preview */}
                <div className="flex flex-col items-center">
                  {form.image ? (
                    <img
                      src={form.image}
                      alt="Product"
                      className="w-48 h-48 object-contain rounded-2xl"
                    />
                  ) : (
                    <div className="w-48 h-48 rounded-2xl border bg-[#FAF4ED] flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}

                  <input
                    type="text"
                    value={form.image}
                    disabled
                    onChange={(e) =>
                      setForm({ ...form, image: e.target.value })
                    }
                    className="mt-4 w-full border rounded-xl px-4 py-3 border-gray-300
                      disabled:bg-gray-100
                      disabled:text-gray-500
                      disabled:border-gray-200
                      disabled:cursor-not-allowed"
                    placeholder="Image URL"
                  />
                </div>

                {/* Basic Details */}

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-semibold text-gray-700">
                      Product Name
                    </label>

                    <input
                      type="text"
                      value={form.name}
                      disabled
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="w-full mt-2 border rounded-xl px-4 py-3 border-gray-300
                        disabled:bg-gray-100
                        disabled:text-gray-500
                        disabled:border-gray-200
                        disabled:cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-gray-700">
                      Category
                    </label>

                    <input
                      type="text"
                      value={form.category}
                      disabled
                      onChange={(e) =>
                        setForm({ ...form, category: e.target.value })
                      }
                      className="w-full mt-2 border rounded-xl px-4 py-3 border-gray-300
                        disabled:bg-gray-100
                        disabled:text-gray-500
                        disabled:border-gray-200
                        disabled:cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-gray-700">Price</label>

                    <input
                      type="number"
                      value={form.price}
                      onChange={(e) =>
                        setForm({ ...form, price: e.target.value })
                      }
                      className="w-full mt-2 border rounded-xl px-4 py-3"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-gray-700">Stock</label>

                    <input
                      type="number"
                      value={form.stock}
                      disabled
                      onChange={(e) =>
                        setForm({ ...form, stock: e.target.value })
                      }
                      className="w-full mt-2 border rounded-xl px-4 py-3 border-gray-300
                        disabled:bg-gray-100
                        disabled:text-gray-500
                        disabled:border-gray-200
                        disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Overview */}

                <div>
                  <label className="font-semibold text-gray-700">
                    Overview
                  </label>

                  <textarea
                    rows={4}
                    value={form.overview}
                    disabled
                    onChange={(e) =>
                      setForm({ ...form, overview: e.target.value })
                    }
                    className="w-full mt-2 border rounded-xl px-4 py-3 resize-none border-gray-300
                        disabled:bg-gray-100
                        disabled:text-gray-500
                        disabled:border-gray-200
                        disabled:cursor-not-allowed"
                  />
                </div>

                {/* Specifications */}

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-5">
                    Specifications
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="font-semibold text-gray-700">
                        Brand
                      </label>

                      <input
                        value={form.brand}
                        disabled
                        onChange={(e) =>
                          setForm({ ...form, brand: e.target.value })
                        }
                        className="w-full mt-2 border rounded-xl px-4 py-3 border-gray-300
                        disabled:bg-gray-100
                        disabled:text-gray-500
                        disabled:border-gray-200
                        disabled:cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-gray-700">
                        Capacity
                      </label>

                      <input
                        value={form.capacity}
                        disabled
                        onChange={(e) =>
                          setForm({ ...form, capacity: e.target.value })
                        }
                        className="w-full mt-2 border rounded-xl px-4 py-3 border-gray-300
                        disabled:bg-gray-100
                        disabled:text-gray-500
                        disabled:border-gray-200
                        disabled:cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-gray-700">
                        Weight
                      </label>

                      <input
                        value={form.weight}
                        disabled
                        onChange={(e) =>
                          setForm({ ...form, weight: e.target.value })
                        }
                        className="w-full mt-2 border rounded-xl px-4 py-3 border-gray-300
                        disabled:bg-gray-100
                        disabled:text-gray-500
                        disabled:border-gray-200
                        disabled:cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-gray-700">
                        Dimensions
                      </label>

                      <input
                        value={form.dimensions}
                        disabled
                        onChange={(e) =>
                          setForm({
                            ...form,
                            dimensions: e.target.value,
                          })
                        }
                        className="w-full mt-2 border rounded-xl px-4 py-3 border-gray-300
                        disabled:bg-gray-100
                        disabled:text-gray-500
                        disabled:border-gray-200
                        disabled:cursor-not-allowed"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="font-semibold text-gray-700">
                        Warranty
                      </label>

                      <input
                        value={form.warranty}
                        disabled
                        onChange={(e) =>
                          setForm({
                            ...form,
                            warranty: e.target.value,
                          })
                        }
                        className="w-full mt-2 border rounded-xl px-4 py-3 border-gray-300
                        disabled:bg-gray-100
                        disabled:text-gray-500
                        disabled:border-gray-200
                        disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                {/* Buttons */}

                <div className="flex justify-end gap-4 border-t pt-6">
                  <button
                    type="button"
                    onClick={() => setOpenEdit(false)}
                    className="px-8 py-3 rounded-xl border border-gray-300 hover:bg-gray-100"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold hover:opacity-90"
                  >
                    Update Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <section className="bg-[#FAF4ED] pb-12 py-10">
          <div className="flex justify-center">
            <div className="bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
              <button
                disabled={page === 1}
                onClick={() => setpage(page - 1)}
                className="px-6 py-3 rounded-xl border hover:bg-black hover:text-white transition disabled:opacity-40"
              >
                ← Previous
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setpage(index + 1)}
                  className={`w-12 h-12 rounded-xl font-bold transition
          ${
            page === index + 1
              ? "bg-black text-white scale-110 shadow-lg"
              : "border hover:bg-[#FAF4ED]"
          }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={page === totalPages}
                onClick={() => setpage(page + 1)}
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
