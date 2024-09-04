import { createContext, useReducer, useContext } from 'react';

export const CartContextDos = createContext();

const initialState = [];
const reducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'ADD_TO_CART': {
            const { id } = payload;
            const existingItemIndex = state.findIndex(item => item.id === id);

            if (existingItemIndex !== -1) {
                const updatedCart = [...state];
                updatedCart[existingItemIndex] = payload;
                return updatedCart;
            } else {
                return [...state, payload];
            }
        }
        case 'REMOVE_FROM_CART': {
            const { id } = payload;
            return state.filter(item => item.id !== id);
        }
        case 'CLEAR_CART': {
            return initialState;
        }
        default: {
            return state;
        }
    }
};


export function CartProviderDos({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const addToCart = product => dispatch({
        type: 'ADD_TO_CART',
        payload: product
    });

    const removeFromCart = id => dispatch({
        type: 'REMOVE_FROM_CART',
        payload: { id }
    });

    const clearCart = () => dispatch({ type: 'CLEAR_CART' });

    return (
        <CartContextDos.Provider value={{
            cart: state,
            removeFromCart,
            addToCart,
            clearCart
        }}>
            {children}
        </CartContextDos.Provider>
    );
}

export function useCartSdos() {
    const context = useContext(CartContextDos);
    if (context === undefined) {
        throw new Error('useCartSdos must be used within a CartProviderDos');
    }

    return context;
}
