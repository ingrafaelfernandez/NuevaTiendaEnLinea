import { createContext, useState, useContext } from "react";
import productosIniciales from "../Item/Item";

const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
  const [productos, setProductos] = useState(productosIniciales);

  const agregarProducto = (producto) => {
    setProductos(prev => [
      ...prev,
      { id: prev.length + 1, ...producto }
    ]);
  };

  return (
    <ItemsContext.Provider value={{ productos, agregarProducto }}>
      {children}
    </ItemsContext.Provider>
  );
};

export const useItems = () => useContext(ItemsContext);
