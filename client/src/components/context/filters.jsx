import { createContext, useState, useContext, useEffect } from "react";


// Crear un contexto
const CartContext = createContext();

// Proveedor del contexto
export const CartProvider = ({ children }) => {
    const [category, setCategory] = useState("");
    return (
        <CartContext.Provider value={{ category, setCategory }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook personalizado para utilizar el contexto
export const useCart = () => useContext(CartContext);