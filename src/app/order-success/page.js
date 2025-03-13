"use client";
import { useRouter } from "next/navigation";

const Success = () => {
    const router = useRouter();

    return (
        <div className="container mx-auto py-10 text-center">
            <h1 className="text-3xl font-bold text-green-600">Order Placed Successfully!</h1>
            <p className="text-gray-700 mt-4">Thank you for your purchase. Your order has been placed.</p>
            <button onClick={() => router.push("/")} className="mt-6 px-4 py-2 bg-blue-500 text-white">
               Home
            </button>
        </div>
    );
};

export default Success;
