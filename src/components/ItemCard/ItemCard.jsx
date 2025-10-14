import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import "./ItemCard.css";

const ItemCard = ({ producto }) => {
  const { addToCart } = useCart();

  return (
    <div className="item-card">
      {producto.imagen && <img src={producto.imagen} alt={producto.nombre} className="item-image" />}
      <h3>{producto.nombre}</h3>
      <p>{producto.descripcion}</p>
      <span className="price">💲{producto.precio}</span>

      <div className="item-buttons">
        <button onClick={() => addToCart(producto)}>Agregar al carrito 🛒</button>
        <Link to={`/detalle/${producto.id}`} className="btn-detail">Ver Detalle</Link>
      </div>
    </div>
  );
};

export default ItemCard;
