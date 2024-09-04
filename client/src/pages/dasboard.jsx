import { getAuth, reload, signOut } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router";
import appFirebase from "../components/firebase";
import { useUserInfo } from "../components/context/user";
import { useFetch } from "../components/context/fetch";

import "./dasboard.css";

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

const Infocuenta = ({dataCuenta}) => {
    const [edit , setEdit] = useState(false);
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
                                <h3>Pais:</h3>
                                <p>{dataCuenta.pais}</p>
                           </div>
                        </div>
                        <button onClick={handleEditar}>editar</button>
                    </div>
                </div> 
           }
        </>
    );
};

const HistorialDeCompras = () => {
    const { userInfo } = useUserInfo();
    const { dataPedidos } = useFetch();
    const pedidos = dataPedidos.filter(pedido => pedido.correo === userInfo.email);

    return (
        <div className="historial-compras-container">
            <h2>Historial de Compras</h2>
            <div className="historial-compras">
                {pedidos.map((pedido, index) => (
                    <div key={index} className="historial-compras-info">
                        <h3>{pedido.nombre} {pedido.apellido}</h3>
                        <p>Correo: {pedido.correo}</p>
                        <p>Celular: {pedido.celular}</p>
                        <p>Dirección: {pedido.direccion}</p>
                        <p>Ciudad: {pedido.ciudad}</p>
                        <p>País: {pedido.pais}</p>
                        <p>Precio: {pedido.precio}</p>
                        <p>Talla: {pedido.talla}</p>
                        <p>Color: {pedido.color}</p>
                        <p>Cantidad: {pedido.cantidad}</p>
                        <div>
                             <img src={pedido.imagen_estilo} alt="Imagen del estilo" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};



const Homess = () => {
    const [innerText, setInnerText] = useState('');
    const { userInfo } = useUserInfo();
    const navigate = useNavigate();
    const {dataCuenta} = useFetch();

    const cuentaFind = dataCuenta.find(cuenta => cuenta.correo === userInfo.email);
    const cerrar = async () => {
        await signOut(auth); // Esperar a que se complete el signOut
        navigate('/login'); // Navegar después de cerrar sesión
        // Puedes ajustar el tiempo de espera o quitar el setTimeout dependiendo de tus necesidades
    };

    const render = (e) => {
        setInnerText(e.target.innerText);
    }

    const renderComponent = () => {
        switch (innerText) {
            case 'Cuenta':
                return cuentaFind ? <Infocuenta dataCuenta={cuentaFind} /> : <Cuenta />;
            case 'historial de compras':
                return <HistorialDeCompras />;
            default:
                return <div>Seleccione una opción para ver el contenido</div>;
        }
    }

    return (
        <>
            {userInfo ? (
                <div className="dashboard">
                    <div className="funcionalidades">
                        <button onClick={render}>Cuenta</button>
                        <button onClick={render}>historial de compras</button>
                        <button onClick={cerrar}>cerrar sesion</button>
                    </div>
                    <div className="info-cuenta">
                        {renderComponent()}
                    </div>
                </div>
            ) : (
                <h1>Usuario no autenticado</h1>
            )}
        </>
    );
}

export default Homess;
