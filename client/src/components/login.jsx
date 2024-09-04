import { useState } from "react";
import appFirebase from "./firebase";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
const auth = getAuth(appFirebase);

const Login = () => {
    const [registrando, setRegistrando] = useState(false);
    const [error, setErrorMessage] = useState(null);
    
    const functAuntenticacion = async (e) => {
        e.preventDefault();
        const correo = e.target.email.value;
        const password = e.target.password.value;
        try {
            if (registrando) {
                await createUserWithEmailAndPassword(auth, correo, password);
                e.target.email.value = "";
                e.target.password.value = "";
                setErrorMessage(null);
               
            } else {
                await signInWithEmailAndPassword(auth, correo, password);
                e.target.email.value = "";
                e.target.password.value = "";
                setErrorMessage(null);
    
            }
        } catch (error) {
            switch (error.code) {
                case 'auth/invalid-credential':
                    setErrorMessage('La contraseña no es válida.');
                    break;
                case 'auth/email-already-in-use':
                    setErrorMessage('El correo ya está en uso.');
                    break;
                case 'auth/invalid-email':
                    setErrorMessage('El correo no es válido.');
                    break;
                case 'auth/operation-not-allowed':
                    setErrorMessage('La operación no está permitida.');
                    break;
                case 'auth/weak-password':
                    setErrorMessage('La contraseña es muy débil.');
                    break;
                case 'auth/user-disabled':
                    setErrorMessage('El usuario está deshabilitado.');
                    break;
                case 'auth/user-not-found':
                    setErrorMessage('El correo no está registrado.');
                    break;
                case 'auth/wrong-password':
                    setErrorMessage('La contraseña no es correcta.');
                    break;
                default:
                    setErrorMessage('Ocurrió un error. Inténtalo de nuevo.');
                    break;
            }
        }
    };

    return (
        <>
            <div className="column-padre">
                <div className="column1-sub1">
                    <div className="card">
                        <form onSubmit={functAuntenticacion}>
                            <input type="text" placeholder="Email" id="email" />
                            <input type="password" placeholder="Password" id="password" />
                            <button type="submit">{registrando ? "Registrarse" : "Iniciar Sesión"}</button>
                        </form>
                        {error && <p style={{ color: "red" }}>{error}</p>}     
                    </div>
                </div>                
                <div className="column2-sub2">
                    <h4 style={{ color: "blue" }}>
                        {registrando ? "Si ya tienes una cuenta" : "No tienes una cuenta"}{" "}
                        <button type="button" onClick={() => setRegistrando(!registrando)}>
                            {registrando ? "Iniciar Sesión" : "Registrarse"}
                        </button>
                    </h4>
                </div>
            </div>
        </>

    );
};

export default Login;
