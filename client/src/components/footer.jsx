import "./footer.css"
import wassap from "/wa.png"

export const Footer = () => {
    return (
        <div className="footer">
            <div>
                <h3 style={{textAlign: "center"}}>UNETE A NUESTRO NEWSLETTER</h3>
                <div className="redes">
                    <a href="https://www.instagram.com/mailtonkanazooficial/" target="_blank"> INSTAGRAM</a>
                    <a href="https://www.facebook.com/profile.php?id=100095125245984" target="_blank"> FACEBOOK</a>
                </div>
            </div>
            <div className="footer-detalles"> 
                <h3>TRABAJA CON NOSOTROS</h3>
                <h5>PROGRAMA DE VENTAS PARA MAYORISTAS</h5>
                <p>NUESTRAS LINEAS DE ATENCION AL CLIENTE: </p>
                <a href="https://wa573223489800" target="_blank" style={{hover: "red"}}>
                    <img src={wassap} alt="wassap" style={{width: "50px", height: "50px"}} />
                </a>
            </div>
        </div>
    )
}