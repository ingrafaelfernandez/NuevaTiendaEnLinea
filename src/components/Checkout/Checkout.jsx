/*
  Componente: Checkout
  Propósito: Simular la pantalla de pago donde el cliente selecciona un método
  Conexiones:
    - `useCart` (CartContext): obtiene los items del carrito y `clearCart` para completar la compra
    - Al confirmar, limpia el carrito y redirige al inicio
    - Estilos en `Checkout.css`
*/
import { useState } from "react";
import { useCart } from "../Context/CartContext";
import { Link } from "react-router-dom";
import "./Checkout.css";

export const Checkout = () => {
  const { cart, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Calcular total
  const total = cart.reduce((sum, item) => {
    const precio = item.precio || item.price || 0;
    return sum + precio * item.quantity;
  }, 0);

  // Si el carrito está vacío, redirigir
  if (cart.length === 0) {
    return (
      <section className="checkout-container">
        <div className="checkout-empty">
          <h2>🛒 Carrito Vacío</h2>
          <p>No hay productos para pagar</p>
          <Link to="/" className="btn-back">
            Volver al catálogo
          </Link>
        </div>
      </section>
    );
  }

  // Manejar confirmación de pago
  const handlePaymentConfirm = () => {
    if (!paymentMethod) {
      alert("❌ Por favor selecciona un método de pago");
      return;
    }
    setShowConfirmation(true);
  };

  // Manejar compra completada
  const handlePurchaseComplete = () => {
    alert(`✅ ¡Compra realizada exitosamente!\nMétodo de pago: ${paymentMethod}\nTotal: $${total.toFixed(2)}`);
    clearCart();
    setPaymentMethod(null);
    setShowConfirmation(false);
    window.location.href = "/";
  };

  if (showConfirmation) {
    return (
      <section className="checkout-container">
        <div className="checkout-confirmation">
          <h2>Confirmar Compra</h2>
          <div className="confirmation-details">
            <h3>Resumen de la Compra</h3>
            <div className="confirmation-items">
              {cart.map((item) => {
                const nombre = item.nombre || item.name || "Producto";
                const precio = item.precio || item.price || 0;
                return (
                  <div key={item.id} className="confirmation-item">
                    <span>{nombre}</span>
                    <span>x{item.quantity}</span>
                    <span>${(precio * item.quantity).toFixed(2)}</span>
                  </div>
                );
              })}
            </div>
            <div className="confirmation-total">
              <strong>Total: ${total.toFixed(2)}</strong>
            </div>
            <div className="confirmation-payment">
              <strong>Método de pago: {paymentMethod}</strong>
            </div>
          </div>

          <div className="confirmation-actions">
            <button
              className="btn-cancel"
              onClick={() => setShowConfirmation(false)}
            >
              Cancelar
            </button>
            <button
              className="btn-confirm"
              onClick={handlePurchaseComplete}
            >
              Confirmar Compra
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-container">
      <h2>💳 Método de Pago</h2>
      
      <div className="checkout-wrapper">
        <div className="checkout-summary">
          <h3>Resumen de Compra</h3>
          <div className="summary-items">
            {cart.map((item) => {
              const nombre = item.nombre || item.name || "Producto";
              const precio = item.precio || item.price || 0;
              return (
                <div key={item.id} className="summary-item">
                  <div className="item-info">
                    <span className="item-name">{nombre}</span>
                    <span className="item-quantity">Cantidad: {item.quantity}</span>
                  </div>
                  <span className="item-price">${(precio * item.quantity).toFixed(2)}</span>
                </div>
              );
            })}
          </div>
          <div className="summary-total">
            <strong>Total a Pagar: ${total.toFixed(2)}</strong>
          </div>
        </div>

        <div className="payment-methods">
          <h3>Selecciona un Método de Pago</h3>
          
          <div className="methods-grid">
            {/* Tarjeta de Débito */}
            <div
              className={`payment-card ${paymentMethod === "Tarjeta de Débito" ? "active" : ""}`}
              onClick={() => setPaymentMethod("Tarjeta de Débito")}
            >
              <div className="card-icon">💳</div>
              <h4>Tarjeta de Débito</h4>
              <p>Pago directo desde tu cuenta</p>
              <div className={`radio-button ${paymentMethod === "Tarjeta de Débito" ? "checked" : ""}`}></div>
            </div>

            {/* Tarjeta de Crédito */}
            <div
              className={`payment-card ${paymentMethod === "Tarjeta de Crédito" ? "active" : ""}`}
              onClick={() => setPaymentMethod("Tarjeta de Crédito")}
            >
              <div className="card-icon">💳</div>
              <h4>Tarjeta de Crédito</h4>
              <p>Pago con línea de crédito</p>
              <div className={`radio-button ${paymentMethod === "Tarjeta de Crédito" ? "checked" : ""}`}></div>
            </div>

            {/* Transferencia Bancaria */}
            <div
              className={`payment-card ${paymentMethod === "Transferencia Bancaria" ? "active" : ""}`}
              onClick={() => setPaymentMethod("Transferencia Bancaria")}
            >
              <div className="card-icon">🏦</div>
              <h4>Transferencia Bancaria</h4>
              <p>Transferencia de fondos entre cuentas</p>
              <div className={`radio-button ${paymentMethod === "Transferencia Bancaria" ? "checked" : ""}`}></div>
            </div>
          </div>

          <div className="checkout-actions">
            <Link to="/cart" className="btn-back-cart">
              ← Volver al Carrito
            </Link>
            <button
              className={`btn-pay ${paymentMethod ? "enabled" : "disabled"}`}
              onClick={handlePaymentConfirm}
              disabled={!paymentMethod}
            >
              Ir a Pagar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
