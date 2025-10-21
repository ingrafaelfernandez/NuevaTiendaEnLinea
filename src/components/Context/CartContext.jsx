import { createContext, useContext, useState } from "react";

// desde aca creo el contexto del carrito
const CartContext = createContext();
export const useCart = () => useContext(CartContext);

// Con esto envio los articulos al carrito del carrito
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
        // de no existir, lo agregamos con cantidad 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    alert(`✅ "${product.nombre}" fue agregado al carrito`);
  };

  // Esto me permite Eliminar productos del carrito
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    alert("❌ Producto eliminado del carrito");
  };

  // Vaciar carrito
  const clearCart = () => {
    setCart([]);
    alert("🛒 Carrito vaciado");
  };
//Y aca retorna el proveedor del carrito
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalItems }}>
  {children}
    </CartContext.Provider>
    
  );
};
