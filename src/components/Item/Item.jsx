import { useState } from "react";

// Base ID para productos fijos (10000+) para evitar conflicto con IDs de API
const FIXED_PRODUCT_BASE_ID = 10000;

export const initialProducts = [
  
];

// Hook opcional (solo si quieres manejar productos localmente)
export const useItems = () => {
  const [productos, setProductos] = useState(initialProducts);

  const agregarProducto = (nuevoProducto) => {
    setProductos([...productos, { id: Date.now(), ...nuevoProducto }]);
  };

  return { productos, agregarProducto };
};

export { FIXED_PRODUCT_BASE_ID };
