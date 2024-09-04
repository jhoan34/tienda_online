import { useCart } from '../components/context/filters';
import { useFetch } from '../components/context/fetch';

export const usefilters = () => {
    const { category, setCategory } = useCart();
    const { data } = useFetch();
    const productos = data;
    
    // Normaliza las cadenas para comparación
    const normalizedCategory = category.trim().toLowerCase();
    const filters = normalizedCategory === '' 
        ? productos 
        : productos.filter(producto => producto.categoria.trim().toLowerCase() === normalizedCategory);
    

    return { filters };
};