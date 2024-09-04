import './carrito.css';
import { useEffect, useId } from 'react';
import { CartIcon, ClearCartIcon } from './icons.jsx';
import { useCartSdos } from './context/cart';
import { Link } from 'react-router-dom';

// Initialize ePayco
const handler = ePayco.checkout.configure({
  key: "7d2d0aa282c543b0b9d8f4e4c62a08b6",
  test: true, // Cambiar a false en producción
});

function CartItem({ id, nombre, precio, talla, color, cantidad, imagen, categoria, removeFromCart }) {
  const handleRemoveFromCart = () => {
    removeFromCart(id);
  };

  return (
    <li className='cart-item'>
      <div>
        <img src={imagen} alt={nombre} style={{ width: '100px', height: '100px' }} />
      </div>
      <div className='cart-item-details'>
        <strong>{nombre}</strong>
        <hr style={{ width: '100%' }} />
        <small>{categoria}</small>
        <small>${precio}</small>
        <small>Talla: {talla}</small>
        <small>Color: {color}</small>
      </div>
      <footer className='cart-item-footer'>
        <small>Qty: {cantidad}</small>
        <Link to={`/productos/${categoria}/${id}`}>Volver al producto</Link>
        <button onClick={handleRemoveFromCart}>Eliminar</button>
      </footer>
    </li>
  );
}

export function Cart() {
  const cartCheckboxId = useId();
  const { cart, clearCart, removeFromCart } = useCartSdos();

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const handleClearCart = () => {
    clearCart();
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  const data = {
    name: "Compra de varios productos",
    description: "Compra de varios productos en el carrito",
    currency: "COP",
    amount: totalAmount.toString(),
    country: "CO",
    lang: "es",
    confirmation: "https://tienda-online-9695.onrender.com/pagos/confirmation",
    response: "https://tienda-online-9695.onrender.com/pagos/response",
    external: "false",
    methodsDisable: ["PSE", "SP", "CASH"],
  };

  const handleCheckout = () => {
    handler.open(data);
  };
  
  return (
    <>
      <label className='cart-button' htmlFor={cartCheckboxId}>
        <CartIcon />
      </label>
      <input id={cartCheckboxId} type='checkbox' hidden />

      <aside className='cart'>
        <ul>
          {cart.map(product => (
            <CartItem
              key={product.id}
              removeFromCart={removeFromCart}
              {...product}
            />
          ))}
        </ul>

        <div className="cart-total" style={{marginLeft: '35%'}}>
          <strong>Total: ${totalAmount}</strong>
        </div>

        <button className="clear-cart-button" style={{marginLeft: '35%'}} onClick={handleClearCart}>
          <ClearCartIcon />
        </button>

        <button className="checkout-button" style={{marginLeft: '35%' , position: 'absolute', top: '1rem', right: '1rem'}} onClick={handleCheckout}>
          Pagar ahora
        </button>

        <label htmlFor={cartCheckboxId}>
          <span className="material-symbols-outlined" style={{ cursor: "pointer", color: "white", position: "absolute", top: "2rem", left: "2rem" }}>
            close
          </span>
        </label>
      </aside>
    </>
  );
}
