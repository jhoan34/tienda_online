// FetchContext.js
import { createContext, useContext, useEffect, useState } from 'react';

export const modificationCardItem = createContext();

export function FetchCardItemProvider({ children }) {
    const [ precio , setPrecio] = useState(0);
    const [talla, setTalla] = useState(0);
    const [color, setColor] = useState("");
    const [imagen_estilo, setImagen] = useState("");
    const [cantidadprodu  , setcantidad] = useState(1);

    return (
        <modificationCardItem.Provider value={{setPrecio , setTalla , setColor , setImagen , setcantidad, precio, talla, color, imagen_estilo, cantidadprodu }}>
            {children}
        </modificationCardItem.Provider>
    );
}

export function useCardItem() {
    const context = useContext(modificationCardItem);
    if (context === undefined) {
        throw new Error('useFetch debe ser usado dentro de un FetchProvider');
    }

    return context;
}
