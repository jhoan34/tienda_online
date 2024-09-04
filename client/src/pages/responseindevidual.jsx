import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useFetch } from '../components/context/fetch';

import './response.css';

export const ResponseiNdevidual = ({ userEmail }) => {
    const { dataCuenta } = useFetch();
    const [error, setError] = useState(null);
    const [enviado, setEnviado] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [datosCompraIndividual, setDatosCompraIndividual] = useState({});
    const { tallaProducto, colorProducto, imagenProducto, cantidadLocal, precioProducto } = datosCompraIndividual;
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const refPayco = queryParams.get('ref_payco');

    useEffect(() => {
        const cartFromStorage = localStorage.getItem('compraindividual');
        if (cartFromStorage) {
            setDatosCompraIndividual(JSON.parse(cartFromStorage));
        }
        setIsLoading(false);
    }, []);

    const sendData = async (event) => {
        event.preventDefault();

        if (enviado) {
            return;
        }

        try {
            if (!dataCuenta || dataCuenta.length === 0) {
                setError('No se encontraron datos de cuenta.');
                return;
            }

            const cuentaFind = dataCuenta.find(cuenta => cuenta.correo === userEmail);

            if (!cuentaFind) {
                setError('No se encontró la cuenta asociada con este correo.');
                return;
            }

            // Validación de todos los campos necesarios para el pedido
            if (!cuentaFind.name || !cuentaFind.celular || !cuentaFind.direccion || !cuentaFind.ciudad || !cuentaFind.pais || !refPayco || !tallaProducto || !colorProducto || !imagenProducto || !cantidadLocal || !precioProducto) {
                setError('Todos los campos son obligatorios.');
                return;
            }

            const dataPedido = {
                correo: cuentaFind.correo,
                nombre: cuentaFind.name,
                celular: cuentaFind.celular,
                direccion: cuentaFind.direccion,
                ciudad: cuentaFind.ciudad,
                pais: cuentaFind.pais,
                ref_payco: refPayco,
                talla: tallaProducto,
                color: colorProducto,
                imagen_estilo: imagenProducto,
                cantidadprodu: cantidadLocal,
                precio: precioProducto
            };

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
                        <button type="submit">Enviar los datos de tu compra</button>
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
