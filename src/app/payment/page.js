"use client"; // Ensure this is at the top

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";

const PaymentPage = () => {
    const router = useRouter();
    const [paymentDetails, setPaymentDetails] = useState({
        name: "",
        cardNumber: "",
        expiry: "",
        cvv: ""
    });

    const { placeOrder } = useCartStore(); // Add placeOrder function

    const handleChange = (e) => {
        setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Payment Successful! 🎉");
        placeOrder(); // Move cart items to orders and clear cart
        router.push("/order-success"); // Redirect to Order Success page
    };

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Payment Details</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-lg">
                <div className="mb-4">
                    <label className="block font-medium">Name on Card</label>
                    <input
                        type="text"
                        name="name"
                        value={paymentDetails.name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-medium">Card Number</label>
                    <input
                        type="text"
                        name="cardNumber"
                        value={paymentDetails.cardNumber}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="flex gap-4">
                    <div className="w-1/2">
                        <label className="block font-medium">Expiry Date</label>
                        <input
                            type="text"
                            name="expiry"
                            placeholder="MM/YY"
                            value={paymentDetails.expiry}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="w-1/2">
                        <label className="block font-medium">CVV</label>
                        <input
                            type="password"
                            name="cvv"
                            value={paymentDetails.cvv}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="mt-4 px-4 py-2 bg-blue-500 text-white w-full"
                >
                    Pay Now
                </button>
            </form>
        </div>
    );
};

export default PaymentPage;
