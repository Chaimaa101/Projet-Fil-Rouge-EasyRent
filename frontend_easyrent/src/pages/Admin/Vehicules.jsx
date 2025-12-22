import { useEffect } from "react";
import Header from "../common/Header";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { MdSearch, MdStar } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import { TbEdit } from "react-icons/tb";
import { CiImageOn } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { useForm, usePage, router } from "@inertiajs/react";
import AdminLayout from "../AdminLayout";

const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-black"></div>
        </div>
    );
};

function ProductsDetails() {
    const { props } = usePage();
    const {
        products: initialProducts = [],
        brands = [],
        categories = [],
    } = props;

    const products = initialProducts.map((product) => ({
        ...product,
        brandName: product.brand?.name || "No brand",
        categoryName: product.category?.name || "No category",
        mainImage: product.images?.[0]?.image_url || "/placeholder-image.jpg",
    }));

    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [showFormAdd, setShowFormAdd] = useState(false);
    const [showFormEdit, setShowFormEdit] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [hoveredStar, setHoveredStar] = useState(0);
    const [rating, setRating] = useState(0);
    const [images, setImages] = useState(Array(3).fill(null));

    const { data, setData, post, put, errors, processing, reset } = useForm({
        title: "",
        slug: "",
        quantity: "",
        description: "",
        published: false,
        inStock: false,
        isNew: false,
        sold: false,
        price: "",
        color: "",
        brand_id: "",
        category_id: "",
        images: [],
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setData(name, type === "checkbox" ? checked : value);
    };

    const handleImageChange = (index, e) => {
        const file = e.target.files[0];
        if (file) {
            const newImages = [...images];
            newImages[index] = file;
            setImages(newImages);
            setData(
                "images",
                newImages.filter((img) => img !== null)
            );
        }
    };

    const removeImage = (index) => {
        const newImages = [...images];
        newImages[index] = null;
        setImages(newImages);
        setData(
            "images",
            newImages.filter((img) => img !== null)
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/products", {
            onSuccess: () => {
                setShowFormAdd(false);
                reset();
                setImages(Array(3).fill(null));
            },
            preserveScroll: true,
        });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        put(`/products/${currentProduct.id}`, {
            onSuccess: () => {
                setShowFormEdit(false);
                reset();
                setImages(Array(3).fill(null));
            },
            preserveScroll: true,
        });
    };

    const handleEditClick = (product) => {
        setCurrentProduct(product);
        setData({
            title: product.title,
            slug: product.slug,
            quantity: product.quantity,
            description: product.description,
            published: product.published,
            inStock: product.inStock,
            isNew: product.isNew,
            sold: product.sold,
            price: product.price,
            color: product.color,
            brand_id: product.brand_id,
            category_id: product.category_id,
            images: [],
        });

        // Set existing images for editing
        const existingImages = Array(3).fill(null);
        product.images?.forEach((img, index) => {
            if (index < 3) existingImages[index] = img.image_url;
        });
        setImages(existingImages);

        setShowFormEdit(true);
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this product?")) {
            router.delete(`/products/${id}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <>
            <div className="flex-1 relative overflow-auto z-10">
                <Header title="Products" />
                <main className="container max-w-7xl mx-auto px-4 mt-8">
                    <div className="bg-white p-6">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-wrap sm:flex-nowrap justify-between gap-4 mb-4"
                        >
                            <div className="w-full flex items-center gap-2 px-4 py-2 bg-opacity-70 backdrop-blur-md rounded-xl overflow-hidden border border-gray-300 bg-gray-100">
                                <input
                                    type="text"
                                    className="bg-transparent text-gray-700 placeholder-gray-400 outline-none w-full"
                                    placeholder="PRODUCT NAME"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                                <MdSearch size={25} className="text-gray-700" />
                            </div>
                            <motion.button
                                onClick={() => setShowFormAdd(true)}
                                whileTap={{ scale: 0.95 }}
                                className="w-full md:w-fit bg-blue-500 py-2 px-4 rounded-lg text-nowrap"
                            >
                                NEW PRODUCT
                            </motion.button>
                        </motion.div>

                        {/* Loading State */}
                        {loading ? (
                            <LoadingSpinner />
                        ) : Object.keys(errors).length > 0 ? (
                            <div className="my-4 space-y-2">
                                {Object.values(errors).map((error, i) => (
                                    <p key={i} className="text-red-500 text-sm">
                                        {error}
                                    </p>
                                ))}
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="relative overflow-x-auto my-4"
                            >
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-nowrap"
                                            >
                                                Image
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-nowrap"
                                            >
                                                Title
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-nowrap"
                                            >
                                                Brand
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-nowrap"
                                            >
                                                Quantity
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-nowrap"
                                            >
                                                Color
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-nowrap"
                                            >
                                                Price
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-nowrap"
                                            >
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((product, index) => (
                                            <motion.tr
                                                key={product.id}
                                                initial={{ opacity: 0, x: -50 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{
                                                    duration: 0.5,
                                                    delay: index * 0.1,
                                                }}
                                                className="bg-white border-b hover:bg-gray-50 transition-colors duration-200"
                                            >
                                                <td className="p-2 w-20 h-20">
                                                    {product.images?.length >
                                                    0 ? (
                                                        <motion.img
                                                            src={
                                                                product
                                                                    ?.images[0]
                                                                    ?.images[0]
                                                            }
                                                            alt={`Product: ${product.name}`}
                                                            className="w-full h-full object-cover rounded-lg"
                                                            whileHover={{
                                                                scale: 1.1,
                                                            }}
                                                            transition={{
                                                                duration: 0.2,
                                                            }}
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                                                            <span className="text-gray-500 text-xs">
                                                                No Image
                                                            </span>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="p-2">
                                                    {product.title}
                                                </td>
                                                <td className="p-2">
                                                    {product.brandName}
                                                </td>
                                                <td className="p-2">
                                                    {product.quantity}
                                                </td>
                                                <td className="p-2">
                                                    {product.color}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {product.price}DH
                                                </td>
                                                <td className="px-6 py-4">
                                                    <motion.button
                                                        className="pr-1 text-center text-blue-500 hover:text-blue-700 transition-colors duration-200"
                                                        onClick={() =>
                                                            handleEditClick(
                                                                product
                                                            )
                                                        }
                                                        whileHover={{
                                                            scale: 1.1,
                                                        }}
                                                        whileTap={{
                                                            scale: 0.9,
                                                        }}
                                                    >
                                                        <TbEdit
                                                            size={20}
                                                            aria-label="Edit"
                                                        />
                                                    </motion.button>
                                                    <motion.button
                                                        className="text-center text-red-500 hover:text-red-700 transition-colors duration-200"
                                                        whileHover={{
                                                            scale: 1.1,
                                                        }}
                                                        whileTap={{
                                                            scale: 0.9,
                                                        }}
                                                        onClick={() =>
                                                            handleDelete(
                                                                product.id
                                                            )
                                                        }
                                                    >
                                                        <BiTrash
                                                            size={20}
                                                            aria-label="Delete"
                                                        />
                                                    </motion.button>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </motion.div>
                        )}
                    </div>
                </main>
            </div>

            {/* ADD FORM */}
            {showFormAdd && (
                <>
                    <div
                        onClick={() => setShowFormAdd(false)}
                        className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-70 z-[100] cursor-pointer flex items-center justify-center"
                    ></div>
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-16 w-full max-w-2xl transition-all duration-500 z-[10000] text-black">
                        <div className="mx-auto bg-white rounded-lg shadow-xl p-4 h-[87vh] overflow-y-scroll scrollbar-style">
                            <h1 className="text-3xl font-bold text-gray-800 mt-8 mb-4 text-center">
                                Add Product
                            </h1>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Image Upload Section */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Product Images
                                    </label>
                                    <div className="grid grid-cols-3 gap-4">
                                        {[0, 1, 2].map((index) => (
                                            <div
                                                key={index}
                                                className="relative aspect-square rounded-xl overflow-hidden group"
                                            >
                                                {images[index] ? (
                                                    <div className="relative w-full">
                                                        <img
                                                            src={
                                                                typeof images[
                                                                    index
                                                                ] === "string"
                                                                    ? images[
                                                                          index
                                                                      ]
                                                                    : URL.createObjectURL(
                                                                          images[
                                                                              index
                                                                          ]
                                                                      )
                                                            }
                                                            alt={`Product ${
                                                                index + 1
                                                            }`}
                                                            className="w-full h-full object-cover"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                removeImage(
                                                                    index
                                                                )
                                                            }
                                                            className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            <IoClose className="w-4 h-4" />
                                                        </button>
                                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                            <label
                                                                htmlFor={`image${index}`}
                                                                className="cursor-pointer"
                                                            >
                                                                <span className="text-white text-sm font-medium">
                                                                    Change Image
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <label
                                                        htmlFor={`image${index}`}
                                                        className="h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-blue-500 transition-colors cursor-pointer group"
                                                    >
                                                        <CiImageOn className="w-8 h-8 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                                        <span className="text-center mt-2 text-sm text-gray-500 group-hover:text-blue-500 transition-colors">
                                                            Upload Image
                                                        </span>
                                                    </label>
                                                )}
                                                <input
                                                    type="file"
                                                    id={`image${index}`}
                                                    accept="image/*"
                                                    onChange={(e) =>
                                                        handleImageChange(
                                                            index,
                                                            e
                                                        )
                                                    }
                                                    className="hidden"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Basic Information */}
                                <div className="space-y-2">
                                    <div>
                                        <label
                                            htmlFor="title"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Product Title
                                        </label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                                            placeholder="Enter product title"
                                            required
                                            value={data.title}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label
                                                htmlFor="price"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Price
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    id="price"
                                                    name="price"
                                                    className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                                                    placeholder="0.00"
                                                    min="0"
                                                    step="0.01"
                                                    required
                                                    value={data.price}
                                                    onChange={handleChange}
                                                />
                                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                                                    DH
                                                </span>
                                            </div>
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="category_id"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Category
                                            </label>
                                            <select
                                                id="category_id"
                                                name="category_id"
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                                                required
                                                value={data.category_id}
                                                onChange={handleChange}
                                            >
                                                <option value="">
                                                    Select a Category
                                                </option>
                                                {categories.map((category) => (
                                                    <option
                                                        key={category.id}
                                                        value={category.id}
                                                    >
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                        <div>
                                            <label
                                                htmlFor="brand_id"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Brand
                                            </label>
                                            <select
                                                id="brand_id"
                                                name="brand_id"
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                                                required
                                                value={data.brand_id}
                                                onChange={handleChange}
                                            >
                                                <option value="">
                                                    Select a Brand
                                                </option>
                                                {brands.map((brand) => (
                                                    <option
                                                        key={brand.id}
                                                        value={brand.id}
                                                    >
                                                        {brand.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="color"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Color
                                            </label>
                                            <input
                                                type="text"
                                                id="color"
                                                name="color"
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                                                placeholder="e.g., Blue"
                                                required
                                                value={data.color}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="quantity"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Quantity
                                            </label>
                                            <input
                                                type="number"
                                                id="quantity"
                                                name="quantity"
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                                                placeholder="Quantity"
                                                required
                                                value={data.quantity}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="description"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Description
                                        </label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            rows="4"
                                            className="w-full resize-none px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                                            placeholder="Enter product description..."
                                            required
                                            value={data.description}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Product Status
                                        </label>
                                        <div className="flex justify-center md:justify-between flex-wrap gap-6">
                                            <label className="relative flex items-center group cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name="inStock"
                                                    checked={data.inStock}
                                                    onChange={handleChange}
                                                    className="peer sr-only"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
                                                <span className="ml-3 text-sm font-medium text-gray-700">
                                                    Available
                                                </span>
                                            </label>
                                            <label className="relative flex items-center group cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name="isNew"
                                                    checked={data.isNew}
                                                    onChange={handleChange}
                                                    className="peer sr-only"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
                                                <span className="ml-3 text-sm font-medium text-gray-700">
                                                    New Product
                                                </span>
                                            </label>
                                            <label className="relative flex items-center group cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name="sold"
                                                    checked={data.sold}
                                                    onChange={handleChange}
                                                    className="peer sr-only"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
                                                <span className="ml-3 text-sm font-medium text-gray-700">
                                                    Sold Out
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-blue-600 text-white font-semibold py-4 px-6 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
                                >
                                    {processing ? "Adding..." : "Add Product"}
                                </button>
                            </form>
                        </div>
                    </div>
                </>
            )}

            {/* EDIT FORM */}
            {showFormEdit && currentProduct && (
                <>
                    <div
                        onClick={() => setShowFormEdit(false)}
                        className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-70 z-[100] cursor-pointer flex items-center justify-center"
                    ></div>
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-16 w-full max-w-2xl transition-all duration-500 z-[10000] text-black">
                        <div className="mx-auto bg-white rounded-lg shadow-xl p-4 h-[87vh] overflow-y-scroll scrollbar-style">
                            <h1 className="text-3xl font-bold text-gray-800 mt-8 mb-4 text-center">
                                Edit Product
                            </h1>

                            <form
                                onSubmit={handleEditSubmit}
                                className="space-y-4"
                            >
                                {/* Image Upload Section */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Product Images
                                    </label>
                                    <div className="grid grid-cols-3 gap-4">
                                        {[0, 1, 2].map((index) => (
                                            <div
                                                key={index}
                                                className="relative aspect-square rounded-xl overflow-hidden group"
                                            >
                                                {images[index] ? (
                                                    <div className="relative w-full">
                                                        <img
                                                            src={
                                                                typeof images[
                                                                    index
                                                                ] === "string"
                                                                    ? images[
                                                                          index
                                                                      ]
                                                                    : URL.createObjectURL(
                                                                          images[
                                                                              index
                                                                          ]
                                                                      )
                                                            }
                                                            alt={`Product ${
                                                                index + 1
                                                            }`}
                                                            className="w-full h-full object-cover"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                removeImage(
                                                                    index
                                                                )
                                                            }
                                                            className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            <IoClose className="w-4 h-4" />
                                                        </button>
                                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                            <label
                                                                htmlFor={`editImage${index}`}
                                                                className="cursor-pointer"
                                                            >
                                                                <span className="text-white text-sm font-medium">
                                                                    Change Image
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <label
                                                        htmlFor={`editImage${index}`}
                                                        className="h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-blue-500 transition-colors cursor-pointer group"
                                                    >
                                                        <CiImageOn className="w-8 h-8 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                                        <span className="text-center mt-2 text-sm text-gray-500 group-hover:text-blue-500 transition-colors">
                                                            Upload Image
                                                        </span>
                                                    </label>
                                                )}
                                                <input
                                                    type="file"
                                                    id={`editImage${index}`}
                                                    accept="image/*"
                                                    onChange={(e) =>
                                                        handleImageChange(
                                                            index,
                                                            e
                                                        )
                                                    }
                                                    className="hidden"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Basic Information */}
                                <div className="space-y-2">
                                    <div>
                                        <label
                                            htmlFor="editTitle"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Product Title
                                        </label>
                                        <input
                                            type="text"
                                            id="editTitle"
                                            name="title"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                                            placeholder="Enter product title"
                                            required
                                            value={data.title}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label
                                                htmlFor="editPrice"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Price
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    id="editPrice"
                                                    name="price"
                                                    className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                                                    placeholder="0.00"
                                                    min="0"
                                                    step="0.01"
                                                    required
                                                    value={data.price}
                                                    onChange={handleChange}
                                                />
                                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                                                    DH
                                                </span>
                                            </div>
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="editCategory"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Category
                                            </label>
                                            <select
                                                id="editCategory"
                                                name="category_id"
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                                                required
                                                value={data.category_id}
                                                onChange={handleChange}
                                            >
                                                <option value="">
                                                    Select a Category
                                                </option>
                                                {categories.map((category) => (
                                                    <option
                                                        key={category.id}
                                                        value={category.id}
                                                    >
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                        <div>
                                            <label
                                                htmlFor="editBrand"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Brand
                                            </label>
                                            <select
                                                id="editBrand"
                                                name="brand_id"
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                                                required
                                                value={data.brand_id}
                                                onChange={handleChange}
                                            >
                                                <option value="">
                                                    Select a Brand
                                                </option>
                                                {brands.map((brand) => (
                                                    <option
                                                        key={brand.id}
                                                        value={brand.id}
                                                    >
                                                        {brand.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="editColor"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Color
                                            </label>
                                            <input
                                                type="text"
                                                id="editColor"
                                                name="color"
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                                                placeholder="e.g., Blue"
                                                required
                                                value={data.color}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="editQuantity"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Quantity
                                            </label>
                                            <input
                                                type="number"
                                                id="editQuantity"
                                                name="quantity"
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                                                placeholder="Quantity"
                                                required
                                                value={data.quantity}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="editDescription"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Description
                                        </label>
                                        <textarea
                                            id="editDescription"
                                            name="description"
                                            rows="4"
                                            className="w-full resize-none px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                                            placeholder="Enter product description..."
                                            required
                                            value={data.description}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Product Status
                                        </label>
                                        <div className="flex justify-center md:justify-between flex-wrap gap-6">
                                            <label className="relative flex items-center group cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name="inStock"
                                                    checked={data.inStock}
                                                    onChange={handleChange}
                                                    className="peer sr-only"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
                                                <span className="ml-3 text-sm font-medium text-gray-700">
                                                    Available
                                                </span>
                                            </label>
                                            <label className="relative flex items-center group cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name="isNew"
                                                    checked={data.isNew}
                                                    onChange={handleChange}
                                                    className="peer sr-only"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
                                                <span className="ml-3 text-sm font-medium text-gray-700">
                                                    New Product
                                                </span>
                                            </label>
                                            <label className="relative flex items-center group cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name="sold"
                                                    checked={data.sold}
                                                    onChange={handleChange}
                                                    className="peer sr-only"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
                                                <span className="ml-3 text-sm font-medium text-gray-700">
                                                    Sold Out
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-blue-600 text-white font-semibold py-4 px-6 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
                                >
                                    {processing
                                        ? "Updating..."
                                        : "Update Product"}
                                </button>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

ProductsDetails.layout = (page) => <AdminLayout>{page}</AdminLayout>;

export default ProductsDetails;
