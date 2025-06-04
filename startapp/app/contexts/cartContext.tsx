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
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({children}: {children: ReactNode}) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setCart((prev) => [...prev, item]);
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, clearCart}}>
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


