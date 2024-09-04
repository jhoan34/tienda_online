import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router";
import appFirebase from "../components/firebase";
import { useUserInfo } from "../components/context/user";
import "./ProductForm.css";
import { useFetch } from "./context/fetch";

const auth = getAuth(appFirebase);

const Cuenta = () => {
  const { userInfo } = useUserInfo();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Estado para mostrar carga
  const [form, setForm] = useState({
      name: '',
      correo: userInfo.email,
      celular: '',
      direccion: '',
      ciudad: '',
      pais: '',
  });

  // Manejar cambios en los inputs del formulario
  const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === "correo" && value !== userInfo.email) {
          setError("No puedes cambiar el correo");
      } else {
          setError(null); // Limpiar el error si el correo es correcto
          setForm({
              ...form,
              [name]: value
          });
      }
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
      e.preventDefault();
      if (form.correo !== userInfo.email) {
          setError("No se puede editar porque el correo no coincide con el correo de la cuenta");
          return; // Detener el envío si hay un error de correo
      }

      // Validar campos obligatorios
      if (!form.name || !form.celular || !form.direccion || !form.ciudad || !form.pais) {
          setError("Todos los campos son obligatorios");
          return;
      }

      // Mostrar mensaje de carga
      setLoading(true);

      // Enviar datos al servidor
      fetch('https://tienda-online-9695.onrender.com/api/dashboard/cuenta', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(form)
      })
      .then(response => response.json())
      .then(data => {
          // Limpiar formulario y errores después del envío exitoso
          setForm({
              name: '',
              correo: userInfo.email,
              celular: '',
              direccion: '',
              ciudad: '',
              pais: '',
          });
          setError("Información actualizada correctamente");
          setTimeout(() => {
              setError(null);
          }, 3000);
          window.location.reload();
      })
      .catch(error => {
          console.error('Error al enviar la solicitud:', error);
          setError("Error al enviar la solicitud, inténtalo de nuevo más tarde");
      })
      .finally(() => {
          // Ocultar mensaje de carga
          setLoading(false);
      });
  };

  return (
      <div className="form-info-cuenta">
          <h2>Información de la Cuenta</h2>
          <form onSubmit={handleSubmit}>
              <label className="form-label">Correo: favor de no cambiar el correo en el formulario</label>
              <input className="form-input" type="email" value={form.correo} name="correo" onChange={handleChange} disabled />
              <br />
              <label className="form-label">Nombre: </label>
              <input className="form-input" type="text" value={form.name} name="name" onChange={handleChange} />
              <br />
              <label className="form-label">Celular: </label>
              <input className="form-input" type="tel" value={form.celular} name="celular" onChange={handleChange} />
              <br />
              <label className="form-label">Dirección: </label>
              <input className="form-input" type="text" value={form.direccion} name="direccion" onChange={handleChange} />
              <br />
              <label className="form-label">Ciudad: </label>
              <input className="form-input" type="text" value={form.ciudad} name="ciudad" onChange={handleChange} />
              <br />
              <label className="form-label">País: </label>
              <input className="form-input" type="text" value={form.pais} name="pais" onChange={handleChange} />
              <br />
              <button className="form-button" type="submit" disabled={loading}>
                  {loading ? 'Enviando...' : 'Enviar'}
              </button>
              {error && <p style={{ color: 'green' }}>{error}</p>}
          </form>
      </div>
  );
};


const Infocuenta = ({ dataCuenta }) => {
  const [edit, setEdit] = useState(false);
  const handleEditar = () => {
    setEdit(!edit);
  };
  return (
    <>
      {
        edit ? <Cuenta /> :
          <div className="info-cuenta-container">
            <h2>Información de la Cuenta guardada</h2>
            <div className="info-cuenta-content">
              <div className="info-cuenta-info">
                <div>
                  <h3>Nombre:</h3>
                  <p>{dataCuenta.name}</p>
                </div>
                <div>
                  <h3>Correo:</h3>
                  <p>{dataCuenta.correo}</p>
                </div>
                <div>
                  <h3>Celular:</h3>
                  <p>{dataCuenta.celular}</p>
                </div>
                <div>
                  <h3>Dirección:</h3>
                  <p>{dataCuenta.direccion}</p>
                </div>
                <div>
                  <h3>Ciudad:</h3>
                  <p>{dataCuenta.ciudad}</p>
                </div>
                <div>
                  <h3>País:</h3>
                  <p>{dataCuenta.pais}</p>
                </div>
              </div>
              <button onClick={handleEditar}>Editar</button>
            </div>
          </div>
      }
    </>
  );
};


const Posts = () => {
  const [formData, setFormData] = useState({
    id: 0,
    nombre: '',
    precio: 0,
    descripcion: '',
    stock: 0,
    tallas: '',
    categoria: '',
    colores: '',
    images: []
  });
  const [messages, setMessages] = useState(null);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (name === 'images') {
      setFormData({
        ...formData,
        [name]: [...files]
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'number' ? parseInt(value) || '' : value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validations
    if (isNaN(formData.id) || formData.id <= 0) {
      setMessages("ID debe ser un número positivo");
      return;
    }
    if (formData.nombre.trim() === '') {
      setMessages("Nombre es requerido");
      return;
    }
    if (isNaN(formData.precio) || formData.precio <= 0) {
      setMessages("Precio debe ser un número positivo");
      return;
    }
    if (formData.descripcion.trim() === '') {
      setMessages("Descripción es requerida");
      return;
    }
    if (isNaN(formData.stock) || formData.stock < 0) {
      setMessages("Stock debe ser un número no negativo");
      return;
    }
    if (formData.tallas.trim() === '') {
      setMessages("Tallas es requerido");
      return;
    }
    if (formData.categoria.trim() === '') {
      setMessages("Categoría es requerida");
      return;
    }
    if (formData.colores.trim() === '') {
      setMessages("Colores es requerido");
      return;
    }
    if (formData.images.length === 0) {
      setMessages("Al menos una imagen es requerida");
      return;
    }

    const data = new FormData();
    data.append('id', formData.id);
    data.append('nombre', formData.nombre);
    data.append('precio', formData.precio);
    data.append('descripcion', formData.descripcion);
    data.append('stock', formData.stock);
    data.append('tallas', formData.tallas);
    data.append('categoria', formData.categoria);
    data.append('colores', formData.colores);

    formData.images.forEach((image) => {
      data.append('images', image);
    });

    fetch('https://tienda-online-9695.onrender.com/api/post/products', {
      method: 'POST',
      body: data
    })
      .then(response => response.json())
      .then(data => {
        setMessages("Enviado correctamente");
        setTimeout(() => {
          setMessages(null);
        }, 1000);
      })
      .catch(error => {
        setMessages("Error al enviar el correo");
        setTimeout(() => {
          setMessages(null);
        }, 1000);
      });

    setFormData({
      id: 0,
      nombre: '',
      precio: 0,
      descripcion: '',
      stock: 0,
      tallas: '',
      categoria: '',
      colores: '',
      images: []
    });
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <div className="form-group">
        <label htmlFor="id">ID:</label>
        <input type="number" id="id" name="id" value={formData.id} onChange={handleChange} className="form-control" placeholder="Ingresa un ID único al producto" />
      </div>
      <div className="form-group">
        <label htmlFor="nombre">Nombre:</label>
        <input placeholder="Ingresa el nombre del producto" type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} className="form-control" />
      </div>
      <div className="form-group">
        <label htmlFor="precio">Precio:</label>
        <input placeholder="Precio del producto" type="number" id="precio" name="precio" value={formData.precio} onChange={handleChange} className="form-control" />
      </div>
      <div className="form-group">
        <label htmlFor="descripcion">Descripción:</label>
        <textarea id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleChange} className="form-control" style={{backgroundColor:"black"}}/>
      </div>
      <div className="form-group">
        <label htmlFor="cantidad">Stock:</label>
        <input type="number" id="stock" name="stock" value={formData.stock} onChange={handleChange} className="form-control" />
      </div>
      <div className="form-group">
        <label htmlFor="tallas">Tallas:</label>
        <input type="text" id="tallas" name="tallas" value={formData.tallas} onChange={handleChange} className="form-control" placeholder="ingrese las tallas con guion, ejemplo: S-M-L o 35-40-43" />
      </div>
      <div className="form-group">
        <label htmlFor="categoria">Categoría: calzado, camisas, franelas, pantalones, shorts, chaquetas, faldas, GENEROS: HOMBRES, DAMAS, NIÑOS</label>
        <input type="text" id="categoria" name="categoria" value={formData.categoria} onChange={handleChange} className="form-control" placeholder="escribe la categoría-genero ejem: calzado-DAMAS, ESCRIBIR COMO ESTA EN LA CATEGORIAS Y GENERO"/>
      </div>
      <div className="form-group">
        <label htmlFor="colores">Colores:</label>
        <input type="text" id="colores" name="colores" value={formData.colores} onChange={handleChange} className="form-control" placeholder="ingrese los colores con guion, ejemplo: rojo-verde" style={{width : "110%"}} />
      </div>
      <div className="form-group">
        <label htmlFor="images">Imágenes:</label>
        <input type="file" id="images" name="images" multiple onChange={handleChange} className="form-control-file" />
      </div>
      <button type="submit" className="submit-button">Enviar</button>
      <p>{messages}</p>
    </form>
  );
};

export const ProductForm = () => {
  const [innerText, setInnerText] = useState('');
  const { userInfo } = useUserInfo();
  const navigate = useNavigate();
  const { dataCuenta } = useFetch();

  const cuentaFind = dataCuenta.find(cuenta => cuenta.correo === userInfo.email);

  const cerrar = async () => {
    await signOut(auth); // Esperar a que se complete el signOut
    navigate('/login'); // Navegar después de cerrar sesión
    // Puedes ajustar el tiempo de espera o quitar el setTimeout dependiendo de tus necesidades
  };
  
  const render = (e) => {
    setInnerText(e.target.innerText);
  };

  const renderComponent = () => {
    switch (innerText) {
      case 'Cuenta':
        return cuentaFind ? <Infocuenta dataCuenta={cuentaFind} /> : <Cuenta />;
      case "CrearPosts":
        return <Posts />;
      default:
        return <div>Seleccione una opción para ver el contenido</div>;
    }
  };

  return (
    <>
      {userInfo.email === "johanmonsalve125@gmail.com" ? (
        <div className="dashboard">
          <div className="funcionalidades">
            <button onClick={render}>Cuenta</button>
            <button onClick={render}>CrearPosts</button>
            <button onClick={cerrar}>Cerrar sesión</button>
          </div>
          <div className="info-cuenta">
            {renderComponent()}
          </div>
        </div>
      ) : (
        <h1 style={{ textAlign: "center" , marginTop: "30%", color: "white"}}>Usuario no autorizado</h1>
      )}
    </>
  );
};
