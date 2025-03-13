"use client";
import { useCartStore } from "@/store/cartStore";

const products = [
    { id: 1, name: "Product A", price: 20 },
    { id: 2, name: "Product B", price: 30 },
];

const ProductList = () => {
    const addToCart = useCartStore((state) => state.addToCart);

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Products</h1>
            <div className="grid grid-cols-2 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="p-4 border rounded shadow">
                        <h2 className="text-xl font-semibold">{product.name}</h2>
                        <p className="text-gray-700">${product.price}</p>
                        <button
                            onClick={() => addToCart(product)}
                            className="mt-2 px-4 py-2 bg-blue-500 text-white"
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
