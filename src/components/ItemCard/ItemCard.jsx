import { Link } from "react-router-dom";
import { useCart } from "../../Context/CartContext/CartContext";
import "./ItemCard.css";

const ItemCard = ({ producto }) => {
  const { addToCart } = useCart();
  const imageSrc = producto.imageUrl || producto.image || "/src/assets/Products/placeholder.jpg";
  const nombre = producto.nombre || producto.name || "Producto sin nombre";
  const precio = producto.precio || producto.price || 0;

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart({ id: producto.id, nombre, price: precio });
  };

  return (
    <div className="item-card">
      <img src={imageSrc} alt={nombre} />
      <div className="item-info">
        <h3>{nombre}</h3>
        <p className="item-price">${precio}</p>
        <div className="item-actions">
          <Link to={`/detalle/${producto.id}`} className="btn-detalle">Ver Detalle</Link>
          <button className="btn-add" onClick={handleAdd} aria-label={`Agregar ${nombre} al carrito`}>Agregar</button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
