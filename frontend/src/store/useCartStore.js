import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCartStore = create(
    persist(
        (set) => ({
            cart: [],
            addToCart: (product) => set((state) => {
                const existing = state.cart.find((item) => item.id === product.id);
                if (existing) {
                    return {
                        cart: state.cart.map((item) =>
                            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                        ),
                    };
                }
                return { cart: [...state.cart, { ...product, quantity: 1 }] };
            }),
            removeFromCart: (productId) => set((state) => ({
                cart: state.cart.filter((item) => item.id !== productId),
            })),
            clearCart: () => set({ cart: [] }),
            totalItems: () => set((state) => ({
                total: state.cart.reduce((acc, item) => acc + item.quantity, 0)
            })), // Helper to just trigger re-render if needed, but actually selector is better
        }),
        {
            name: 'cart-storage',
        }
    )
)

export default useCartStore
