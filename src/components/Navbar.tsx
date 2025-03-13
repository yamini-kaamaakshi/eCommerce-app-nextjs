"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";

const Navbar = () => {
    const { cart, orders } = useCartStore();
    const [cartCount, setCartCount] = useState(0);
    const [orderCount, setOrderCount] = useState(0);

    // Ensure cart and orders are updated only on the client side
    useEffect(() => {
        setCartCount(cart.length);
        setOrderCount(orders.length);
    }, [cart, orders]);

    return (
        <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
            <h1>eCommerce</h1>

            <div className="flex items-center gap-6">
                <Link href="/">Home</Link>

                {/* Cart */}
                <Link href="/cart" className="relative">
                    🛒 Cart
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full px-2 text-sm">
                            {cartCount}
                        </span>
                    )}
                </Link>

                {/* Orders */}
                <Link href="/order" className="relative">
                    📦 Orders
                    {orderCount > 0 && (
                        <span className="absolute -top-2 -right-3 bg-green-500 text-white rounded-full px-2 text-sm">
                            {orderCount}
                        </span>
                    )}
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
