import { createContext, useContext} from 'react';
import { useState } from "react"
import appFirebease from '../firebase';
import { getAuth , onAuthStateChanged} from "firebase/auth"
const auth = getAuth(appFirebease)

export const CartUser = createContext();

export function CartProviderUser({ children }) {
    const [userInfo,  setuserInfo] = useState(null);

    onAuthStateChanged(auth, (user) => {
        if(user){
            setuserInfo(user)
        }else{
            setuserInfo(null)
        }
    })

    return (
        <CartUser.Provider value={{
            userInfo
        }}>
            {children}
        </CartUser.Provider>
    );
}

export function useUserInfo() {
    const context = useContext(CartUser);
    if (context === undefined) {
        throw new Error('useCartSdos must be used within a CartProviderDos');
    }

    return context;
}
