/*
  Context: AdminProductContext
  Propósito: Mantener una lista temporal de productos creados durante la sesión del administrador
  Conexiones:
    - `ProductFormContainer` utiliza `addSessionProduct` para añadir productos creados en esta sesión
    - `AdminProductsList` consume `sessionProducts` para mostrar la tabla de productos cargados
*/
import { createContext, useContext, useState } from 'react';

const AdminProductContext = createContext();

export const AdminProductProvider = ({ children }) => {
  const [sessionProducts, setSessionProducts] = useState([]);

  const addSessionProduct = (product) => {
    // Agregar producto con timestamp de sesión
    const productWithSession = {
      ...product,
      sessionId: Date.now(),
      createdAt: new Date().toLocaleString('es-ES'),
    };
    setSessionProducts([productWithSession, ...sessionProducts]);
  };

  const clearSessionProducts = () => {
    setSessionProducts([]);
  };

  return (
    <AdminProductContext.Provider value={{ sessionProducts, addSessionProduct, clearSessionProducts }}>
      {children}
    </AdminProductContext.Provider>
  );
};

export const useAdminProducts = () => {
  const context = useContext(AdminProductContext);
  if (!context) {
    throw new Error('useAdminProducts debe usarse dentro de AdminProductProvider');
  }
  return context;
};
