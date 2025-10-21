import { createContext, useContext, useState } from "react";

// 1️⃣ Crear el contexto
const CartContext = createContext();

// 2️⃣ Hook personalizado para usar el contexto fácilmente
export const useCart = () => useContext(CartContext);

// 3️⃣ Proveedor del carrito
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Agregar producto
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        // Si ya existe, aumentamos cantidad
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Si no existe, lo agregamos
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    alert(`✅ "${product.nombre}" fue agregado al carrito`);
  };

  // Eliminar producto
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    alert("❌ Producto eliminado del carrito");
  };

  // Vaciar carrito
  const clearCart = () => {
    setCart([]);
    alert("🛒 Carrito vaciado");
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalItems }}>
  {children}
    </CartContext.Provider>
    
  );
};
