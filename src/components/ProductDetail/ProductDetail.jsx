/*
  Componente: ProductDetail
  Propósito: Mostrar la información detallada de un producto seleccionado
  Conexiones:
    - `useProductos` (ProductContext): obtiene la lista completa de productos para buscar por `id`
    - `useCart` (CartContext): permite agregar el producto al carrito
    - `Link` / react-router: navegar de regreso al catálogo
  Notas: Maneja propiedades flexibles de producto (soporta tanto productos fijos como los de la API).
*/
import { useParams, Link } from "react-router-dom";
import { useProductos } from "../Context/ProductContext";
import { useCart } from "../Context/CartContext"; // 🛒 importamos el carrito
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const { productos } = useProductos();
  const { addToCart } = useCart(); // 🛒 obtenemos la función para agregar al carrito

  // Buscar producto por ID (convertir ambos a número para comparación consistente)
  const idNum = Number(id);
  const producto = productos.find((p) => Number(p.id) === idNum);

  if (!producto) {
    console.error("Producto no encontrado. ID buscado:", id, "Productos disponibles:", productos.map(p => ({ id: p.id, tipo: typeof p.id })));
    return (
      <div className="product-detail">
        <p>Producto no encontrado</p>
        <Link to="/" className="btn-volver">
          Volver al inicio
        </Link>
      </div>
    );
  }

  // Manejo flexible de propiedades
  const nombre = producto.nombre || producto.name || "Producto sin nombre";
  const descripcion = producto.descripcion || producto.description || "Sin descripción";
  const precio = producto.precio || producto.price || 0;
  const imageSrc = producto.imageUrl || producto.image || producto.imagen;

  return (
    <div className="product-detail">
      <img
        src={imageSrc}
        alt={nombre}
        className="detalle-imagen"
      />
      <div className="detalle-info">
        <h2>{nombre}</h2>
        <p>{descripcion}</p>
        <p className="precio">Precio: ${precio}</p>

        {/* 🛒 Nuevo botón para agregar al carrito */}
        <button
          className="btn-agregar"
          onClick={() => addToCart(producto)}
        >
          Agregar al carrito 🛒
        </button>

        <Link to="/" className="btn-volver">
          Volver al catálogo
        </Link>
      </div>
    </div>
    
  );
};

export default ProductDetail;
