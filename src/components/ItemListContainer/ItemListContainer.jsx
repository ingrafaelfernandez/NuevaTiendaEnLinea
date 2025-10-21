import { useProductos } from "../Context/ProductContext";
import ItemCard from "../ItemCard/ItemCard";
import "./ItemListContainer.css";

const ItemListContainer = () => {
  const { productos } = useProductos();

  return (
    <div className="item-list-container">
      <h2>Catálogo de Productos</h2>
      <div className="item-grid">
        {productos.map((producto) => (
          <ItemCard key={producto.id} producto={producto} />
        ))}
      </div>
    </div>
  );
};

export default ItemListContainer;
