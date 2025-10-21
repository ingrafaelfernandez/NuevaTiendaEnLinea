
import { createContext, useContext, useState } from "react";
import { initialProducts } from "../Item/Item";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productos, setProductos] = useState(initialProducts);

  const agregarProducto = (nuevoProducto) => {
    const productoFinal = {
      id: Date.now(),
      ...nuevoProducto,
      precio: parseFloat(nuevoProducto.precio),
    };
    setProductos([...productos, productoFinal]);
  };

  return (
    <ProductContext.Provider value={{ productos, agregarProducto }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductos = () => useContext(ProductContext);
