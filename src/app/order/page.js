"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";

const OrderPage = () => {
    const orders = useCartStore((state) => state.orders);
    const hydrateStore = useCartStore((state) => state.hydrateStore);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (typeof hydrateStore === "function") {
            hydrateStore(); // Load persisted orders from localStorage
        }
        setMounted(true);
    }, [hydrateStore]);

    if (!mounted) return <p className="text-center text-lg py-10">Loading orders...</p>;

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-gray-800">
                Your Orders ({orders.length})
            </h1>
            {orders.length > 0 ? (
                <div className="space-y-6 max-w-4xl mx-auto">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                                    Order #{order.id}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    {new Date(order.date).toLocaleString()}
                                </p>
                            </div>

                            <div className="bg-gray-100 p-4 rounded-lg">
                                <table className="w-full text-left">
                                    <thead>
                                    <tr className="text-gray-600 text-sm">
                                        <th className="pb-2">Image</th>
                                        <th className="pb-2">Item</th>
                                        <th className="pb-2 text-center">Price</th>
                                        <th className="pb-2 text-center">Quantity</th>
                                        <th className="pb-2 text-right">Total</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {order.items.map((item, i) => (
                                        <tr key={i} className="text-gray-700 text-sm border-t">
                                            <td className="py-2">
                                                {item.image ? (
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-12 h-12 object-cover rounded-lg"
                                                    />
                                                ) : (
                                                    <span>No Image</span>
                                                )}
                                            </td>
                                            <td className="py-2">{item.name}</td>
                                            <td className="py-2 text-center">₹{item.price}</td>
                                            <td className="py-2 text-center">{item.quantity}</td>
                                            <td className="py-2 text-right font-semibold">
                                                ₹{item.price * item.quantity}
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="text-right mt-4">
                                <p className="text-lg font-bold text-gray-800">
                                    Total: ₹{order.totalPrice}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600 text-center text-lg">
                    No orders placed yet.
                </p>
            )}
        </div>
    );
};

export default OrderPage;
