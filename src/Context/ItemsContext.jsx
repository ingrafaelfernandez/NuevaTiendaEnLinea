import { createContext, useState, useContext } from "react";

// ItemsContext: mantenía una lista local; para alinear con la política
// actual, inicializamos vacío y dejamos la gestión principal en ProductContext
const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);

  const agregarProducto = (producto) => {
    setProductos((prev) => [
      ...prev,
      { id: Date.now(), ...producto },
    ]);
  };

  return (
    <ItemsContext.Provider value={{ productos, agregarProducto }}>
      {children}
    </ItemsContext.Provider>
  );
};

export const useItems = () => useContext(ItemsContext);
