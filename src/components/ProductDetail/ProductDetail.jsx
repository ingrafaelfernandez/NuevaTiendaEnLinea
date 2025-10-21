import { useParams, Link } from "react-router-dom";
import { useProductos } from "../Context/ProductContext";
import { useCart } from "../Context/CartContext"; // 🛒 importamos el carrito
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const { productos } = useProductos();
  const { addToCart } = useCart(); // 🛒 obtenemos la función para agregar al carrito

  const producto = productos.find((p) => p.id === Number(id));

  if (!producto) {
    return (
      <div className="product-detail">
        <p>Producto no encontrado</p>
        <Link to="/" className="btn-volver">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="detalle-imagen"
      />
      <div className="detalle-info">
        <h2>{producto.nombre}</h2>
        <p>{producto.descripcion}</p>
        <p className="precio">Precio: ${producto.precio}</p>

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
