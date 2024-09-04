import { useState } from "react";
import { useUserInfo } from "./context/user";
export const Contact = () => {
    const { userInfo } = useUserInfo();
    const [formContact, setFormContact] = useState({
        name: "",
        correo : userInfo.email,
        telefono : "",
        asunto : ""
    })
    const [ errmessage, setErrmessage] = useState(null)
    const [ successmessage, setSuccessmessage] = useState(null)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormContact({
            ...formContact,
            [name] : value
        })
    }
    const handleSumit = (e) => {
        e.preventDefault();
        if(userInfo){
              if(formContact.name === "" || formContact.correo === "" || formContact.telefono === "" || formContact.asunto === "") {
            setErrmessage("Todos los campos son obligatorios")
        }else {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formContact.name,
                    correo: formContact.correo,
                    telefono: formContact.telefono,
                    asunto: formContact.asunto
                })
            }
            fetch('https://tienda-online-9695.onrender.com/api/contacto', options)
            .then(res => res.json())
            .then(data =>  {
                setSuccessmessage("Enviado correctamente")
                setTimeout(() => {
                    setSuccessmessage(null)
                }, 1000);
                setFormContact({
                    name: "",
                    correo : "",
                    telefono : "",
                    asunto : ""
                })
            } )
            .catch(err => {
                setErrmessage("Error al enviar el correo")
                setTimeout(() => {
                    setErrmessage(null)
                }, 1000);
            })
          
        }
        }else {
            setErrmessage("No puedes enviar correos sin iniciar sesion")
            setTimeout(() => {
                setErrmessage(null)
            }, 1000);
        }
        setFormContact (
            {
                name: "",
                correo : userInfo.email,
                telefono : "",
                asunto : ""
            }
        )
    }

    return (
        <>
            <form className="form" onSubmit={handleSumit}>
                <div>
                    <label>Name: </label>
                    <input name="name" value={formContact.name} onChange={handleChange} type="text"/>
                </div>
                <div>
                    <label>Correo: </label>
                    <input name="correo" value={formContact.correo} onChange={handleChange} type="text" />
                </div>
                <div>
                    <label>Telefono: </label>
                    <input name="telefono" value={formContact.telefono} onChange={handleChange} type="number"/>
                </div>
                <div>
                    <label>Asunto: </label>
                    <input name="asunto" value={formContact.asunto}  onChange={handleChange} type="text"/>
                </div>
                <div>
                    <button type="submit" >Enviar</button>
                </div>
            </form>
            <p>{errmessage}</p>
            <p>{successmessage}</p>
        </>
    )
}