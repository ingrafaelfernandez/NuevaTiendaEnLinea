import { useParams, Link } from "react-router-dom";
import { useItems } from "../Item/Item";
import { useCart } from "../Context/CartContext";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const { productos } = useItems();
  const { addToCart } = useCart();

  const producto = productos.find((p) => p.id === Number(id));

  if (!producto) return <p>Producto no encontrado</p>;

  return (
    <div className="product-detail-container">
      {producto.imagen && <img src={producto.imagen} alt={producto.nombre} className="product-detail-image" />}
      <div className="product-detail-info">
        <h2>{producto.nombre}</h2>
        <p>{producto.descripcion}</p>
        <p className="precio">💲{producto.precio}</p>
        <button onClick={() => addToCart(producto)}>Agregar al carrito 🛒</button>
        <Link to="/">← Volver al inicio</Link>
      </div>
    </div>
  );
};

export default ProductDetail;

