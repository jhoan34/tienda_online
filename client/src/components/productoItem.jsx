import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "./context/fetch";
import { useCartSdos } from "./context/cart";
import { useUserInfo } from "./context/user";
import { useCardItem } from "./context/productitem";
import epayco from "/6.png";
import "./productoitem.css";

export const ProductoItem = ({userEmail}) => {
  // Contextos y estados
  const {
    setPrecio,
    setTalla,
    setColor,
    setImagen,
    setcantidad,
    precio,
    talla,
    color,
    imagen_estilo,
    cantidadprodu,
  } = useCardItem();
  const { id } = useParams();
  const { data, dataCuenta } = useFetch();
  const navigate = useNavigate();
  const { userInfo } = useUserInfo();
  const { addToCart } = useCartSdos();

  // Estados locales
  const [error, setError] = useState(null);
  const [producto, setProducto] = useState(null);
  const [imagenes, setImagenes] = useState([]);
  const [contador, setContador] = useState(0);
  const [precioProducto, setPrecioProducto] = useState(0);
  const [tallaProducto, setTallaProducto] = useState("");
  const [colorProducto, setColorProducto] = useState("");
  const [imagenProducto, setImagenProducto] = useState("");
  const [cantidadLocal, setCantidadLocal] = useState(1);

  useEffect(() => {
    if (data && data.length > 0) {
      const foundProduct = data.find((pro) => pro.id.toString() === id);
      if (foundProduct) {
        setProducto(foundProduct);
        setImagenes(foundProduct.imagenes);
        setPrecioProducto(foundProduct.precio);
      }
    }
  }, [data, id]);

  const cuentaFind = dataCuenta.find((cuenta) => userEmail ? cuenta.correo === userEmail : false);

  // Funciones para navegación entre imágenes
  const adelante = () => {
    if (contador < imagenes.length - 1) {
      setContador(contador + 1);
    }
  };

  const atras = () => {
    if (contador > 0) {
      setContador(contador - 1);
    }
  };

  // Función para manejar el botón "Añadir al carrito"
  const handleAddToCart = () => {
    if(userInfo){
      if (cuentaFind) {
        if (
          tallaProducto !== "" &&
          colorProducto !== "" &&
          imagenProducto !== "" &&
          cantidadLocal > 0 &&
          precioProducto > 0
        ) {
          const cartItem = {
            id: producto.id,
            nombre: producto.nombre,
            precio: precioProducto,
            talla: tallaProducto,
            color: colorProducto,
            imagen: imagenProducto,
            cantidad: cantidadLocal,
            imagenEstilo: imagen_estilo,
            stock: producto.stock,
            categoria: producto.categoria,
          };
          addToCart(cartItem);
          setError("Añadido al carrito");
          setTimeout(() => {
            setError(null);
          }, 2000);
        } else {
          setError(
            "Por favor completa todos los campos requeridos del producto para agregar al carrito."
          );
          setTimeout(() => {
            setError(null);
          }, 2000);
        }
      } else {
        setError("Necesitas llenar tus datos en el dashboard para agregar al carrito");
        setTimeout(() => {
          setError(null);
        }, 2000);
      }
    }else{
      setError("Necesitas iniciar sesión para agregar al carrito");
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  };

  // Función para manejar el botón "Comprar"
  const handleBuyNow = () => {
    if(userInfo){
      if (cuentaFind) {
        if (
          tallaProducto !== "" &&
          colorProducto !== "" &&
          imagenProducto !== "" &&
          cantidadLocal > 0 &&
          precioProducto > 0
        ) {
          setTalla(tallaProducto);
          setColor(colorProducto);
          setImagen(imagenProducto);
          setPrecio(precioProducto);
          setcantidad(cantidadLocal);
  
          const cartItem = {
            tallaProducto,
            colorProducto,
            imagenProducto,
            cantidadLocal,
            precioProducto,
          };
          localStorage.setItem("compraindividual", JSON.stringify(cartItem));
  
          navigate(`/pagos/${producto.id}`);
        } else {
          setError("Por favor completa todos los campos requeridos del producto.");
          setTimeout(() => {
            setError(null);
          }, 2000);
        }
      } else {
        setError("Necesitas llenar tus datos en el dashboard para comprar");
        setTimeout(() => {
          setError(null);
        }, 2000);
      }
    }else{
      setError("Necesitas iniciar sesión para comprar");
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  };

  if (!producto) {
    return <div>Cargando...</div>;
  }

  // Generación de opciones para tallas y colores
  const tallasDisponibles = producto.tallas.split("-");
  const opcionesTallas = tallasDisponibles.map((talla) => (
    <option key={talla} value={talla}>
      {talla}
    </option>
  ));

  const coloresDisponibles = producto.colores.split("-");
  const opcionesColores = coloresDisponibles.map((color) => (
    <option key={color} value={color}>
      {color}
    </option>
  ));

  // Renderizado del componente
  return (
    <div className="caja-individual">
      <div id="image">
        {error && (
          <p style={{ color: "white", top: "0", left: "50%" }}>{error}</p>
        )}
        {imagenes.length > 0 && (
          <img
            className="productos"
            src={imagenes[contador]}
            alt="Product Image"
          />
        )}
        <button className="adelante" onClick={adelante}>
          <span className="material-symbols-outlined">arrow_forward_ios</span>
        </button>
        <button className="atras" onClick={atras}>
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
      </div>

      <div className="producto-detalles2">
        <div className="info">
          <div className="descripciones">
            <h2 className="title">{producto.nombre}</h2>
            <hr />
            <div className="precios12">
              <p className="uno" id="pr">
                ${producto.precio} COP
              </p>
            </div>
            <p className="dos">{producto.info}</p>
            <div className="botones">
              <button className="agregar2" onClick={handleAddToCart}>
                Añadir al carrito
              </button>
              <button className="agregar2" onClick={handleBuyNow}>
                Comprar
              </button>
            </div>
          </div>
        </div>

        <div className="carac">
          <div className="cantidades">
            <button
              className="mas"
              onClick={() =>
                setCantidadLocal(
                  Math.min(cantidadLocal + 1, parseInt(producto.stock, 10))
                )
              }
            >
              +
            </button>
            <p className="ca">{cantidadLocal}</p>
            <button
              className="menos"
              onClick={() => setCantidadLocal(Math.max(cantidadLocal - 1, 1))}
            >
              -
            </button>
            <div>
              <select
                id="lista"
                name="lista"
                onChange={(e) => setTallaProducto(e.target.value)}
                value={tallaProducto}
              >
                <option value="">---Seleccione Talla---</option>
                {opcionesTallas}
              </select>
            </div>
          </div>

          <div className="colores-tipos">
            {imagenes.map((imagen, index) => (
              <div key={index}>
                <img
                  src={imagen}
                  onClick={() => setImagenProducto(imagen)}
                  alt="Product Image"
                />
              </div>
            ))}
          </div>

          <div id="colores_gl">
            <select
              id="colores"
              name="colores"
              onChange={(e) => setColorProducto(e.target.value)}
              value={colorProducto}
            >
              <option value="">---Seleccione Color---</option>
              {opcionesColores}
            </select>
          </div>
        </div>
      </div>

      <div className="dds">
        <div className="dds-info">
          <h4 style={{ textAlign: "center" }}>{producto.nombre}</h4>
          <h5 style={{ marginLeft: "2rem" }}>Descripcion Del Producto/Caracteristicas</h5>
          <p style={{ textAlign: "center" }}>{producto.descripcion}</p>
        </div>

        <div className="dds-logo">
          <h5 style={{ textAlign: "center" }}>Metodos de Pago</h5>
          <p style={{ textAlign: "center" }}>
            Los pagos se realizan con ePayco, una plataforma de pagos conocida a nivel internacional y 100% segura. Página:{" "}
            <a
              href="https://epayco.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://epayco.com/
            </a>
          </p>
          <div>
            <img
              src={epayco}
              alt="ePayco Logo"
              style={{ width: "100%", height: "100%", borderRadius: "10px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};