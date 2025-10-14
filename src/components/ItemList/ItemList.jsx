import ItemCard from "../ItemCard/ItemCard"; // componente que solo renderiza un Item
import "./ItemList.css";

const ItemList = ({ productos }) => {
  return (
    <div className="item-list">
      {productos.map((producto) => (
        <ItemCard key={producto.id} producto={producto} />
      ))}
    </div>
  );
};

export default ItemList;

