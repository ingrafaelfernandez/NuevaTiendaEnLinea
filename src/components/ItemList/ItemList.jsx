import { useProductos } from "../Context/ProductContext";
import ItemCard from "../ItemCard/ItemCard";
import "./ItemList.css";

const ItemList = () => {
  const { productos } = useProductos();

  return (
    <div className="item-list">
      {productos.map((producto) => (
        <ItemCard key={producto.id} producto={producto} />
      ))}
    </div>
  );
};

export default ItemList;

