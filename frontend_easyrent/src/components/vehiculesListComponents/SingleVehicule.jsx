
import {  useState } from "react";

function SingleVehicule() {

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { data } = useState({
        product_id: product.id,
        user_id: auth.user.id,
        quantity: 1,
    });

    const [selectedImage, setSelectedImage] = useState(
        product?.images[0]?.images[0] || '/placeholder-product.jpg'
    );

    const availableImages = product?.images[0]?.images || [];

    const handleAddToCart = (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!auth.user) {
            setError("Please login to add items to your cart");
            return;
        }

        setIsLoading(true);

        
    };

    // Handle quantity change
    const handleQuantityChange = (e) => {
        const value = Math.max(1, parseInt(e.target.value) || 1);
        setData('quantity', value);
    };

    const handleIncrement = () => {
        setData('quantity', data.quantity + 1);
    };

    const handleDecrement = () => {
        setData('quantity', Math.max(1, data.quantity - 1));
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 container max-w-7xl mx-auto px-4 mt-8">
            <div className="space-y-4">
                <div className="h-[500px] lg:h-[600px] w-full overflow-hidden rounded-lg shadow-lg relative group">
                    <img
                        src={`/${selectedImage}` || '/storage/data/placeholder.jpg'}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                            e.target.src = '/storage/data/placeholder.jpg';
                            e.target.className = 'w-full h-full object-contain bg-gray-100 p-4';
                        }}
                    />
                    {product.isNew && (
                        <span className="absolute top-4 right-4 bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                            New Arrival
                        </span>
                    )}
                </div>

                {/* Thumbnail Gallery */}
                <div className="flex items-center gap-4 overflow-x-auto py-4 sm:w-fit sm:mx-auto">
                    {availableImages.length > 0 ? (
                        availableImages.map((img, index) => (
                            <div
                                key={`${product.id}-${index}`}
                                className={`
            flex-shrink-0 w-44 h-32 rounded-lg cursor-pointer border-2 relative
            ${selectedImage === img ? "border-black" : "border-transparent"}
            hover:border-gray-300 transition-all duration-300
          `}
                                onClick={() => setSelectedImage(img)}
                            >
                                <img
                                    src={`/${img}`}
                                    alt={`${product.title} - ${index + 1}`}
                                    className="w-full h-full object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                                    loading="lazy"
                                    onError={(e) => {
                                        e.target.src = '/storage/data/placeholder.jpg';
                                        e.target.className = 'w-full h-full object-contain bg-gray-100 p-2';
                                    }}
                                />
                                {selectedImage === img && (
                                    <div className="absolute bottom-2 left-2 right-2 h-1 bg-black bg-opacity-50 rounded-full"></div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="w-44 h-32 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                            No images available
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-6">
             
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold text-gray-900">{product.title}</h1>
                    <p className="text-gray-700 text-lg">{product.description}</p>
                </div>

                {/* Rating */}
                <div className="my-4 flex items-center gap-2">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <svg
                                key={i}
                                className="h-5 w-5 text-yellow-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                            </svg>
                        ))}
                    </div>
                    <p className="text-base font-medium text-gray-900">5.0</p>
                    <p className="text-base font-medium text-gray-500">({product.rating})</p>
                </div>

                {/* Quantity Selector */}
                <div className="my-4 flex items-center gap-4">
                    <label htmlFor="quantity" className="text-lg font-medium text-gray-900">
                        Quantity:
                    </label>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleDecrement}
                            className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                            disabled={data.quantity <= 1}
                        >
                            -
                        </button>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={data.quantity}
                            onChange={handleQuantityChange}
                            min="1"
                            className="w-20 h-10 text-center border border-gray-300 rounded-lg"
                        />
                        <button
                            onClick={handleIncrement}
                            className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Features */}
                <ul className="my-4 flex items-center gap-4">
                    <li className="flex items-center gap-2">
                        <svg
                            className="h-5 w-5 text-gray-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                            />
                        </svg>
                        <p className="text-base font-medium text-gray-500">Fast Delivery</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg
                            className="h-5 w-5 text-gray-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeWidth="2"
                                d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                            />
                        </svg>
                        <p className="text-base font-medium text-gray-500">Best Price</p>
                    </li>
                </ul>

                {/* Quality Assurance Section */}
                <div className="my-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Quality Assurance</h2>
                    <ul className="space-y-4 sm:space-y-3 text-center sm:text-left">
                        {/* ... quality assurance items ... */}
                    </ul>
                </div>

                {/* Add to Cart Button and Messages */}
                <div className="space-y-4">
                    {/* {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                            {error}
                            {!auth.user && (
                                <Link
                                    href='/login'
                                    className="ml-2 text-blue-600 hover:underline"
                                    data={{ return_url: window.location.pathname }}
                                >
                                    Login Now
                                </Link>
                            )}
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                            {success}
                            <Link
                                href='/checkout'
                                className="ml-2 text-blue-600 hover:underline"
                            >
                                View Cart
                            </Link>
                        </div>
                    )} */}

                    <button
                        onClick={handleAddToCart}
                        disabled={processing}
                        className="w-full bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center"
                    >
                        {processing ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Adding...
                            </>
                        ) : (
                            'Réserver'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
export default SingleVehicule;