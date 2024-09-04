import React, { useState, useEffect } from "react";
import { useUserInfo } from "../components/context/user";
import { useParams } from "react-router";
import { useFetch } from "../components/context/fetch";
import { useCardItem } from "../components/context/productitem";
import "./pagos.css";

const RenderPagos = ({prd}) => {
  const { userInfo } = useUserInfo();
  const { precio, talla, color, imagen_estilo, cantidadprodu} = useCardItem();
  const [truecompra, setTruecompra] = useState(false);
  const [message, setMessage] = useState("");


  var handler = ePayco.checkout.configure({
    key: "7d2d0aa282c543b0b9d8f4e4c62a08b6",
    test: true, // Cambiar a false en producción
  });

  // Verificar si el token está configurado correctamente

  const data = {
    // Parámetros de la compra (obligatorios)
    name: prd.nombre,
    description: prd.descripcion,
    currency: "COP", // Asegúrate de que la moneda esté en mayúsculas y sea correcta
    amount: precio * cantidadprodu,
    country: "CO",
    lang: "es",
    confirmation: "https://tienda-online-9695.onrender.com/pagosindividual/confirmation",
    response: "https://tienda-online-9695.onrender.com/pagosindividual/response",
    external: "false",
    methodsDisable: ["PSE", "SP", "CASH"],
  };
  
  const handleClickCompra = () => {
    handler.open(data);
    // Simular la finalización de la transacción
    setTimeout(() => {
      setTruecompra(true);
      setMessage("Transacción completada. Ahora puedes enviar el formulario.");
    },120000); // Simulación de 5 segundos
  };
  return (
    <div className="container">
      <div className="info-section">
        <div style={{ backgroundColor: "black", height: "22%", borderRadius: "8px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h2 className="precio-data" style={{ textAlign: "center" }}>PRECIO: {precio *cantidadprodu} COP</h2>
          <div className="talla-info" style={{ textAlign: "center" }}>
            <h4>TALLA ESCOGIDA: {talla}</h4>
            <h4>CANTIDAD: {cantidadprodu}</h4>
          </div>
          <div className="talla-info" style={{ textAlign: "center" }}>
            <h4>COLOR ESCOGIDO: {color}</h4>
          </div>
        </div>
        <div className="payment-info">
          <div className="img-container">
            <p>Producto Escogido</p>
            <img className="imgpago" src={imagen_estilo} alt="Método de pago" />
          </div>
          <h3 style={{ textAlign: "center" }}>MÉTODO DE TRANSACCIÓN DE PAGOS 100% SEGURA</h3>
          <p style={{ textAlign: "center" }}>Empresa reconocida en toda Latinoamérica y 100% segura y confiable</p>
        </div>

        <div className="pagosss">
          <button id="epayuu" onClick={handleClickCompra}>TERMINAR LA TRANSACCIÓN</button>
        </div>
      </div>
    </div>
  );
};

export const Pagos = () => {
  const { userInfo } = useUserInfo();
  const { id } = useParams();
  const [error, setError] = useState(null);
  const { data } = useFetch();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    if (data && data.length > 0) {
      const prod = data.find((pro) => pro.id.toString() === id);
      setProducto(prod);
    }
  }, [data, id]);

  useEffect(() => {
    if (!userInfo) {
      setError("Inicia sesión para poder realizar la compra");
    }
  }, [userInfo]);

  if (!producto) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      {userInfo ? <RenderPagos prd={producto} /> : <div>{error}</div>}
    </>
  );
};
