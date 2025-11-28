/*
  Componente: Cart
  Propósito: Mostrar los items del carrito, resumen y acciones (vaciar, ir a pagar)
  Conexiones:
    - `useCart` (CartContext): obtiene `cart`, `removeFromCart`, `clearCart` y controla cantidades
    - Usa `Link` para navegar a `Checkout` y otras rutas
    - Estilos en `Cart.css`
  Notas: Maneja nombres y precios flexibles (`name`/`nombre`, `price`/`precio`).
*/
import { Link } from "react-router-dom";
import "./Cart.css";
import { useCart } from "../../Context/CartContext/CartContext";

export const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  // Manejo flexible de precios (precio o price)
  const totalPrice = cart.reduce((sum, item) => {
    const precio = item.precio || item.price || 0;
    return sum + precio * item.quantity;
  }, 0);

  if (cart.length === 0) {
    return (
      <section className="cart-container">
        <div className="cart-empty">
          <h2>🛒 Carrito de Compras</h2>
          <p>Tu carrito está vacío</p>
          <Link to="/categories" className="btn-volver">
            Ir a Categorías
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-container">
      <h2>🛒 Carrito de Compras</h2>
      
      <div className="cart-items-wrapper">
        <div className="cart-items-list">
          {cart.map((item) => {
            // Manejo flexible de propiedades
            const nombre = item.nombre || item.name || "Producto sin nombre";
            const imagen = item.imageUrl || item.image || item.imagen || "/placeholder.jpg";
            const precio = item.precio || item.price || 0;
            
            return (
            <div key={item.id} className="cart-item">
              <img 
                src={imagen} 
                alt={nombre} 
                className="cart-item-image"
              />
              <div className="cart-item-info">
                <h4>{nombre}</h4>
                <p className="cart-item-price">
                  ${precio.toFixed(2)} x {item.quantity} = ${(precio * item.quantity).toFixed(2)}
                </p>
                <p className="cart-item-quantity">Cantidad: {item.quantity}</p>
              </div>
              <button 
                className="btn-remove"
                onClick={() => removeFromCart(item.id)}
              >
                Eliminar
              </button>
            </div>
            );
          })}
        </div>

        <div className="cart-summary">
          <h3>Resumen</h3>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Envío:</span>
            <span>Gratis</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

            <div className="cart-actions">
              <button className="btn-clear" onClick={clearCart}>
                Vaciar Carrito
              </button>
              <Link to="/checkout" className="btn-checkout">
                Ir a Pagar
              </Link>
            </div>
          <Link to="/categories" className="btn-continue-shopping">
            Continuar Comprando
          </Link>
        </div>
      </div>
    </section>
  );
};
