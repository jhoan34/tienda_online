import { usefilters } from "../hooks/usefilters";
import { useCartSdos } from './context/cart';
import { Link } from "react-router-dom";
import { useId } from "react";

export const Products = () => {
  const uid = useId();
  const { filters } = usefilters();
  return (
    <>
      {filters.map((producto) => (
        <div className="product" key={uid}>
          <div className="image">
            <img src={producto.imagenes[0]} alt={producto.nombre} />
          </div>
          <div className="infortrt">
            <div className="des-ms">
              <h4>{producto.nombre}</h4>
              <h4>CATEGORIA-{producto.categoria} </h4>
            </div>
            <div className="des-ds">
              <p>${producto.precio} COP</p>
              <Link to={`/productos/${producto.categoria}/${producto.id}`}>Ver el producto</Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

/*<button onClick={() => addToCart(producto)}>Agregar al carrito</button>*/ 
