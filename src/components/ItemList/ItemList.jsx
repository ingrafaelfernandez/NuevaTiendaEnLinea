import { useProductos } from "../Context/ProductContext";
import ItemCard from "../ItemCard/ItemCard";
import "./ItemList.css";

// Ahora ItemList acepta una prop opcional `lista`. Si se provee, la usa;
// si no, toma los productos desde el contexto.
const ItemList = ({ lista }) => {
  const { productos } = useProductos();
  const source = Array.isArray(lista) ? lista : productos;

  return (
    <div className="item-list">
      {source.map((producto) => (
        <ItemCard key={producto.id} producto={producto} />
      ))}
    </div>
  );
};

export default ItemList;

