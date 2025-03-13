"use client";
import Link from "next/link";

const ProductCard = ({ product }: { product: { id: number; name: string; price: string; image: string } }) => {
    return (
        <div className="border p-4 rounded-lg shadow-lg">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md"/>
            <h3 className="text-lg font-bold mt-2">{product.name}</h3>
            <p className="text-gray-700">{product.price}</p>
            <Link href={`/product/${product.id}`} className="mt-2 block text-blue-500">View Details</Link>
        </div>
    );
};

export default ProductCard;
