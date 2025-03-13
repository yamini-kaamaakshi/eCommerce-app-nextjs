"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { products } from "@/data/products"; // Adjust the path accordingly
import { useCartStore } from "@/store/cartStore";

export default function ProductPage() {
    const params = useParams();
    const router = useRouter();
    const { category, id } = params as { category: keyof typeof products; id: string };
    const productId = parseInt(id, 10);

    const categoryProducts = products[category] || [];
    const product = categoryProducts.find((p) => p.id === productId);

    const addToCart = useCartStore((state) => state.addToCart);

    if (!product) {
        return (
            <div className="container mx-auto py-10">
                <h1 className="text-3xl font-bold mb-6 text-center">Product Not Found</h1>
                <Link href={`/category/${category}`}>
                    <p className="text-blue-600 text-center underline">
                        Back to {category} products
                    </p>
                </Link>
            </div>
        );
    }
    const remainingProducts = categoryProducts.filter((p) => p.id !== productId);

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <img src={product.image} alt={product.name} className="w-full h-auto object-contain rounded-md mb-4" />
                <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                <p className="text-xl text-gray-700 mb-4">Price: ₹{product.price}</p>
                <div className="mt-4 flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={() => addToCart(product)}
                        className="flex-1 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                    >
                        Add to Cart
                    </button>
                    <button
                        onClick={() => router.push("/payment")} // Redirect to payment page
                        className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        Place Order
                    </button>
                </div>
            </div>
            {/* Remaining Products Section */}
            {remainingProducts.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">
                        Other {category} Products
                    </h2>
                    <div className="flex overflow-x-auto space-x-4 pb-4">
                        {remainingProducts.map((p) => (
                            <Link key={p.id} href={`/category/${category}/${p.id}`}>
                                <div className="min-w-[300px] border rounded-lg shadow-md p-4 cursor-pointer hover:shadow-xl transition">
                                    <img
                                        src={p.image}
                                        alt={p.name}
                                        className="w-full h-48 object-cover rounded-md"
                                    />
                                    <h3 className="text-lg font-semibold mt-2">{p.name}</h3>
                                    <p className="text-gray-700">₹{p.price}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
