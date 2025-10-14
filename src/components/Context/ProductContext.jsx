import { createContext, useState, useContext, useEffect } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  // Productos iniciales
  const [productos, setProductos] = useState(() => {
    const saved = localStorage.getItem("productos");
    if (saved) return JSON.parse(saved);

    // Productos iniciales
    return [
      {
        id: 1,
        nombre: "Laptop ASUS",
        descripcion: "Potente laptop para trabajo y estudio.",
        precio: 1200,
        imagen: "/src/assets/products/laptop-asus.jpg",
      },
      {
        id: 2,
        nombre: "Mouse Gamer",
        descripcion: "Sensor óptico de alta precisión.",
        precio: 40,
        imagen: "/src/assets/products/mouse-gamer.jpg",
      },
      {
        id: 3,
        nombre: "Teclado Mecánico RGB",
        descripcion: "Teclado gamer retroiluminado con switches azules.",
        precio: 50,
        imagen: "/src/assets/products/teclado.jpg",
      },
    ];
  });

  // Guardar productos en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(productos));
  }, [productos]);

  // Función para agregar un producto nuevo
  const agregarProducto = ({ nombre, descripcion, precio, imagen }) => {
    const nuevoProducto = {
      id: Date.now(), // ID único
      nombre,
      descripcion,
      precio: parseFloat(precio),
      imagen, // Ruta relativa al archivo de imagen
    };
    setProductos([...productos, nuevoProducto]);
  };

  return (
    <ProductContext.Provider value={{ productos, agregarProducto }}>
      {children}
    </ProductContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useProductos = () => useContext(ProductContext);
