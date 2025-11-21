import { useState } from "react";

// Base ID para productos fijos (10000+) para evitar conflicto con IDs de API
const FIXED_PRODUCT_BASE_ID = 10000;

export const initialProducts = [
  {
    id: FIXED_PRODUCT_BASE_ID + 1,
    nombre: "Laptop ASUS",
    name: "Laptop ASUS",
    descripcion: "Potente laptop para trabajo y estudio.",
    description: "Potente laptop para trabajo y estudio.",
    precio: 1200,
    price: 1200,
    image: "/src/assets/Products/laptop-asus.jpg",
    imageUrl: "/src/assets/Products/laptop-asus.jpg",
  },
  {
    id: FIXED_PRODUCT_BASE_ID + 2,
    nombre: "Mouse Gamer",
    name: "Mouse Gamer",
    descripcion: "Sensor óptico de alta precisión.",
    description: "Sensor óptico de alta precisión.",
    precio: 40,
    price: 40,
    image: "/src/assets/Products/mouse-gamer.jpg",
    imageUrl: "/src/assets/Products/mouse-gamer.jpg",
  },
  {
    id: FIXED_PRODUCT_BASE_ID + 3,
    nombre: "Teclado Mecánico RGB",
    name: "Teclado Mecánico RGB",
    descripcion: "Teclado gamer retroiluminado con switches azules.",
    description: "Teclado gamer retroiluminado con switches azules.",
    precio: 50,
    price: 50,
    image: "/src/assets/Products/teclado.jpg",
    imageUrl: "/src/assets/Products/teclado.jpg",
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

export { FIXED_PRODUCT_BASE_ID };
