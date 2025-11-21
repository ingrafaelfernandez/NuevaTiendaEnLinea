/*
  Componente: ItemCard
  Propósito: Mostrar una tarjeta de producto en la lista (imagen, nombre, precio)
  Conexiones:
    - Recibe `producto` (puede venir de productos fijos o de la API)
    - Usa `Link` a `/detalle/:id` para ver el detalle de ese producto
    - Estilos en `ItemCard.css`
  Notas: Maneja propiedades flexibles (`imageUrl`/`image`/`imagen`, `name`/`nombre`, `price`/`precio`).
*/
import { Link } from "react-router-dom";
import "./ItemCard.css";

const ItemCard = ({ producto }) => {
  // Manejo flexible de rutas de imagen (imageUrl o image)
  const imageSrc = producto.imageUrl || producto.image || "/src/assets/Products/placeholder.jpg";
  
  // Manejo flexible de nombres (nombre o name)
  const nombre = producto.nombre || producto.name || "Producto sin nombre";
  
  // Manejo flexible de precios (precio o price)
  const precio = producto.precio || producto.price || 0;
  
  return (
    <div className="item-card">
      <img src={imageSrc} alt={nombre} />
      <h3>{nombre}</h3>
      <p>${precio}</p>
      <Link to={`/detalle/${producto.id}`} className="btn-detalle">
        Ver Detalle
      </Link>
    </div>
  );
};

export default ItemCard;
