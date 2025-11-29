import { Link } from "react-router-dom";
import { useCart } from "../../Context/CartContext/CartContext";
import "./Navbar.css";

export const MiniCart = ({ onClose }) => {
  const { cart, removeFromCart, clearCart } = useCart();

  const totalPrice = cart.reduce((sum, item) => {
    const precio = item.precio || item.price || 0;
    return sum + precio * item.quantity;
  }, 0);

  return (
    <div className="mini-cart" role="dialog" aria-label="Mini carrito">
      <div className="mini-cart-header">
        <strong>Carrito</strong>
        <button className="mini-cart-close" onClick={onClose} aria-label="Cerrar mini carrito">×</button>
      </div>

      {cart.length === 0 ? (
        <div className="mini-cart-empty">Tu carrito está vacío</div>
      ) : (
        <div className="mini-cart-body">
          <ul className="mini-cart-list">
            {cart.map((item) => {
              const nombre = item.nombre || item.name || "Producto";
              const precio = item.precio || item.price || 0;
              return (
                <li key={item.id} className="mini-cart-item">
                  <div className="mini-cart-item-info">
                    <span className="mini-cart-item-name">{nombre}</span>
                    <span className="mini-cart-item-meta">{item.quantity} x ${precio.toFixed(2)}</span>
                  </div>
                  <button className="mini-cart-remove" onClick={() => removeFromCart(item.id)} aria-label={`Eliminar ${nombre}`}>
                    ✕
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mini-cart-summary">
            <div>
              <span>Subtotal</span>
              <strong>${totalPrice.toFixed(2)}</strong>
            </div>
            <div className="mini-cart-actions">
              <button className="btn-clear" onClick={clearCart}>Vaciar</button>
              <Link to="/cart" onClick={onClose} className="btn-view-cart">Ver carrito</Link>
              <Link to="/checkout" onClick={onClose} className="btn-checkout">Pagar</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MiniCart;
