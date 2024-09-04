import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useFetch } from '../components/context/fetch';
import './response.css';

export const Response = ({ userEmail }) => {
    const { dataCuenta } = useFetch();
    const [cartStore, setCartStore] = useState([]);
    const [error, setError] = useState(null);
    const [enviado, setEnviado] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const refPayco = queryParams.get('ref_payco');

    useEffect(() => {
        const cartFromStorage = localStorage.getItem('cart');
        if (cartFromStorage) {
            setCartStore(JSON.parse(cartFromStorage));
        }
        setIsLoading(false);
    }, []);

    const clearCart = () => {
        localStorage.removeItem('cart');
        setCartStore([]);
    };

    const sendData = async (event) => {
        event.preventDefault();

        if (enviado) {
            return;
        }

        if (!dataCuenta || dataCuenta.length === 0) {
            setError('No se encontraron datos de cuenta.');
            return;
        }

        const cuentaFind = dataCuenta.find(cuenta => cuenta.correo === userEmail);

        if (!cuentaFind) {
            setError('No se encontró la cuenta asociada con este correo.');
            return;
        }

        if (cartStore.length === 0) {
            setError('El carrito está vacío.');
            return;
        }

        try {
            const dataPedido = {
                correo: cuentaFind.correo,
                nombre: cuentaFind.name,
                celular: cuentaFind.celular,
                direccion: cuentaFind.direccion,
                ciudad: cuentaFind.ciudad,
                pais: cuentaFind.pais,
                ref_payco: refPayco,
                talla: [],
                color: [],
                imagen_estilo: [],
                cantidadprodu: [],
                precio: []
            };

            cartStore.forEach(item => {
                dataPedido.talla.push(item.talla);
                dataPedido.color.push(item.color);
                dataPedido.imagen_estilo.push(item.imagen);
                dataPedido.cantidadprodu.push(item.cantidad);
                dataPedido.precio.push(item.precio);
            });

            const response = await fetch('https://tienda-online-9695.onrender.com/api/dashboard/pagos/pedidos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataPedido)
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Error al enviar los pedidos: ${response.statusText} - ${errorMessage}`);
            }

            clearCart();
            setEnviado(true);
        } catch (error) {
            setError(`Error al enviar los pedidos: ${error.message}`);
        }
    };

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="response">
            {refPayco === "undefined" || refPayco === null ? (
                <div className="response__message">
                    <h1>No se encontró ref_payco</h1>
                    <h3>Vuelve a intentar el pago</h3>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            ) : (

                <div>
                    <form onSubmit={sendData}>
                        <button type="submit">Enviar los datos de tus compras</button>
                    </form>
                    {enviado && <p style={{ color: 'green' }}>Datos enviados correctamente.</p>}
                    <h1>¡Gracias por tu compra!</h1>
                    <h1>Referencia de pago: {refPayco}</h1>
                    <h3>Todos los datos de tu compra están en tu correo</h3>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            )}
        </div>
    );
};
