import { Link } from "react-router-dom";
import "./ItemCard.css";

const ItemCard = ({ producto }) => {
  return (
    <div className="item-card">
      <img src={producto.imagen} alt={producto.nombre} />
      <h3>{producto.nombre}</h3>
      <p>${producto.precio}</p>
      <Link to={`/detalle/${producto.id}`} className="btn-detalle">
        Ver Detalle
      </Link>
    </div>
  );
};

export default ItemCard;
