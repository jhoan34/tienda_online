// FetchContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from "firebase/firestore";

export const FetchContext = createContext();

export function FetchProvider({ children }) {
    const [data, setData] = useState([]);
    const [dataCuenta, setDataCuenta] = useState([]);
    const [dataPedidos, setDataPedidos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "productos"));
                const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setData(products);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();


        const fetchDataCuenta = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "datosCuenta"));
                const products = querySnapshot.docs.map((doc, index) => ({ id: index, ...doc.data() }));
                setDataCuenta(products);
            } catch (error) {
               setError(error);
            }
        };
    
        fetchDataCuenta();

        const fetchDataPedidos = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "pedidosCompras"));
                const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setDataPedidos(products);
            } catch (error) {
                setError(error);
            }
        }

        fetchDataPedidos();
    }, []);

    return (
        <FetchContext.Provider value={{ data, dataCuenta, dataPedidos }}>
            {children}
        </FetchContext.Provider>
    );
}

export function useFetch() {
    const context = useContext(FetchContext);
    if (context === undefined) {
        throw new Error('useFetch debe ser usado dentro de un FetchProvider');
    }

    return context;
}
