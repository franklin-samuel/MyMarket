import React, { createContext, useContext, useState, ReactNode, Children } from 'react';

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    observation: string;
    image: string;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    clearCart: () => void;
    updateQuantity: (id: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({children}: {children: ReactNode}) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setCart((prev) => {
            const index = prev.findIndex(i => i.id === item.id);
            if (index !== -1) {
                const updatedCart = [...prev];
                updatedCart[index].quantity += item.quantity;
                return updatedCart;
            }

            return [...prev, item]
        })
    };

    const updateQuantity = (id: string, quantity: number) => {
    setCart((prev) => {
        if (quantity < 1) {
            return prev.filter(item => item.id !== id);
        }

        return prev.map(item =>
            item.id === id ? { ...item, quantity } : item
        );
    });
};

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, clearCart}}>
            {children}
        </CartContext.Provider>
    )
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error ('useCart deve ser usado dentro de um CartProvider')
    }
    return context;
}   


