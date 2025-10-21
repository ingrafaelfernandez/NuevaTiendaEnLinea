import { useState } from "react";

export const initialProducts = [
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

// Hook opcional (solo si quieres manejar productos localmente)
export const useItems = () => {
  const [productos, setProductos] = useState(initialProducts);

  const agregarProducto = (nuevoProducto) => {
    setProductos([...productos, { id: Date.now(), ...nuevoProducto }]);
  };

  return { productos, agregarProducto };
};
