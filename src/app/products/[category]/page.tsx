"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useParams } from "next/navigation";
import { useState } from "react";
import { products } from "@/data/products"; // Make sure this path is correct

export default function CategoryPage() {
    // Assert that category is one of the keys of products
    const params = useParams();
    const category = params?.category as keyof typeof products;

    if (!category || !products[category]) {
        return (
            <div className="container mx-auto py-10">
                <h1 className="text-3xl font-bold mb-6 text-red-500">Category Not Found</h1>
                <p>Please select a valid category.</p>
            </div>
        );
    }

    const [maxPrice, setMaxPrice] = useState<number>(1000);
    const addToCart = useCartStore((state) => state.addToCart);
    const placeOrder = useCartStore((state) => state.placeOrder);

    const categoryProducts = products[category];
    const filteredProducts = categoryProducts.filter(
        (product) => product.price <= maxPrice
    );

    return (
        <div className="container mx-auto py-10 flex">
            {/* Sidebar */}
            <div className="mr-6">
                <h2 className="text-xl font-semibold mb-4">Filter by Price</h2>
                <label htmlFor="priceRange" className="block text-gray-700 mb-2">
                    Max Price: ${maxPrice}
                </label>
                <input
                    type="range"
                    id="priceRange"
                    min="0"
                    max="1000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full"
                />
            </div>

            {/* Product Display */}
            <div className="w-3/4 px-6">
                <h1 className="text-3xl font-bold mb-6 capitalize">
                    {category} Products
                </h1>
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((product) => (
                            <Link
                                key={product.id}
                                href={`/category/${category}/${product.id}`}
                                className="group"
                            >
                                <div className="p-4 border border-gray-50 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-74 object-cover rounded-md mb-4"
                                    />
                                    <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
                                    <p className="text-gray-700">${product.price}</p>
                                    <div className="mt-4 flex flex-col sm:flex-row gap-4">
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault(); // Prevent navigation when clicking the button
                                                addToCart(product);
                                            }}
                                            className="flex-1 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600  transition"
                                        >
                                            Add to Cart
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                placeOrder();
                                            }}
                                            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                        >
                                            Place Order
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400">No products available within this price range.</p>
                )}
            </div>
        </div>
    );
}
