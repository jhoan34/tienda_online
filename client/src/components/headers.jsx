// components/headers.js
import { Link} from "react-router-dom";
import { useState } from "react";
import { useUserInfo } from "./context/user";
import { useCart } from './context/filters'; // Asegúrate de que esta ruta sea correcta
import { useId } from "react";
import './headers.css';
import { Menu } from "./icons";


const Render_li = () => {
    const { userInfo } = useUserInfo();

    if (userInfo) {

        if(userInfo.email === "johanmonsalve125@gmail.com" ){
            return (
                <li>
                    <Link to="/user/admin/posts">Admin</Link>
                </li>
            )

        }

        return (
            <li>
                <Link to="/user/dashboard">dasboard</Link>
            </li>
        );

    }

    if (!userInfo){
        return (
            <li>
                <Link to="/Login">login</Link>
            </li>
        )
    }

    return null;
};

export const Headers = () => {
    const [menu, setMenu] = useState(false);
    const { setCategory } = useCart(); // Eliminar el paréntesis extra y asegurar la correcta importación
    const uid = useId();
    const handleCategoryClick = (category) => {
        setCategory(category);
        setMenu(false); // Cierra el menú después de seleccionar una categoría
    };
    const arr = ["DAMAS", "HOMBRES", "NINOS"];
    return (
        <div className="padreHeader">
            <ul className="navbar">
                <li className="menu-toggle" onClick={() => setMenu(!menu)}>
                    {menu ? (
                        <>
                            <div className="dropdown-menu">
                                <span className="material-symbols-outlined" style={{ cursor: "pointer", color: "white" }} onClick={() => setMenu(!menu)}>
                                    close
                                </span>
                               <div className="categories-menu">
                                    {
                                        arr.map((category) => (
                                            <div key={uid} className={category}>
                                                <h3 style={{ textAlign: "center" }}>{category}</h3>
                                                <li onClick={() => handleCategoryClick(`calzado-${category}`)}><Link to="/productos/calzado">Calzado</Link></li>
                                                <li onClick={() => handleCategoryClick( `camisas-${category} `)}><Link to="/productos/camisas">Camisas</Link></li>
                                                <li onClick={() => handleCategoryClick( `franelas-${category} `)}><Link to="/productos/franelas">Franelas</Link></li>
                                                <li onClick={() => handleCategoryClick( `pantalones-${category} `)}><Link to="/productos/pantalones">Pantalones</Link></li>
                                                <li onClick={() => handleCategoryClick( `shorts-${category} `)}><Link to="/productos/shorts">Shorts</Link></li>
                                                <li onClick={() => handleCategoryClick( `chaquetas-${category} `)}><Link to="/productos/chaquetas">Chaquetas</Link></li>
                                                <li onClick={() => handleCategoryClick( `faldas-${category} `)}><Link to="/productos/faldas">Faldas</Link></li>
                                            </div>
                                        ))
                                    }

                                    <li onClick={() => handleCategoryClick("")}><Link to="/productos">Ropa</Link></li>
                                    <li onClick={() => handleCategoryClick('accesorios')}><Link to="/productos/accesorios">Accesorios</Link></li>
                               </div>
                                
                            </div>
                            <Menu />

                        </>
                    ) : (
                        <Menu />
                    )}
                </li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/Contacto">Contacto</Link></li>
                <Render_li/>
            </ul>
        </div>
    );
};
