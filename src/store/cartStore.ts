import { create } from "zustand"; // ✅ Import Zustand

interface CartItem {
    image?: string;
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface Order {
    id: number;
    items: CartItem[];
    totalPrice: number;
    date: string;
}

interface CartState {
    cart: CartItem[];
    orders: Order[];
    addToCart: (item: { id: number; name: string; price: number }) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    placeOrder: () => void;
    clearOrders: () => void;
    hydrateStore: () => void; // Ensure this is declared
}

export const useCartStore = create<CartState>((set) => {
    // ✅ Load cart and orders from localStorage
    const storedCart = typeof window !== "undefined" ? localStorage.getItem("cart") : null;
    const storedOrders = typeof window !== "undefined" ? localStorage.getItem("orders") : null;

    return {
        cart: storedCart ? JSON.parse(storedCart) : [],
        orders: storedOrders ? JSON.parse(storedOrders) : [],

        addToCart: (item) =>
            set((state) => {
                const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
                let updatedCart;

                if (existingItem) {
                    updatedCart = state.cart.map((cartItem) =>
                        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                    );
                } else {
                    updatedCart = [...state.cart, { ...item, quantity: 1 }];
                }

                localStorage.setItem("cart", JSON.stringify(updatedCart));
                return { cart: updatedCart };
            }),

        removeFromCart: (id) =>
            set((state) => {
                const updatedCart = state.cart.filter((item) => item.id !== id);
                localStorage.setItem("cart", JSON.stringify(updatedCart));
                return { cart: updatedCart };
            }),

        updateQuantity: (id, quantity) =>
            set((state) => {
                const updatedCart = state.cart.map((item) =>
                    item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
                );
                localStorage.setItem("cart", JSON.stringify(updatedCart));
                return { cart: updatedCart };
            }),

        placeOrder: () =>
            set((state) => {
                if (state.cart.length === 0) return state;

                const newOrder: Order = {
                    id: Date.now(),
                    items: state.cart,
                    totalPrice: state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
                    date: new Date().toISOString(),
                };

                const updatedOrders = [...state.orders, newOrder];
                localStorage.setItem("orders", JSON.stringify(updatedOrders));
                localStorage.setItem("cart", JSON.stringify([]));

                return { orders: updatedOrders, cart: [] };
            }),

        clearOrders: () =>
            set(() => {
                localStorage.removeItem("orders");
                return { orders: [] };
            }),

        // 🛠 **Hydrate store from localStorage**
        hydrateStore: () => {
            if (typeof window !== "undefined") {
                const storedCart = localStorage.getItem("cart");
                const storedOrders = localStorage.getItem("orders");

                set({
                    cart: storedCart ? JSON.parse(storedCart) : [],
                    orders: storedOrders ? JSON.parse(storedOrders) : [],
                });
            }
        },
    };
});
