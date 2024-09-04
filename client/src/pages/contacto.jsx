import { Contact } from "../components/contacto";
import {useUserInfo } from "../components/context/user";
import "./contacto.css"
export const ContacPage = () => {

    const { userInfo } = useUserInfo();
    return (
        <div className="contacto">
            <h2>Formulario de contacto </h2>
            {
                userInfo ? <Contact /> : <p>Inicia sesión para enviar un correo</p>
            }
        </div>
    )
}