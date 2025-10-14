import { useItems } from "../Item/Item";
import ItemList from "../ItemList/ItemList";
import "./ItemListContainer.css";

const ItemListContainer = ({ titulo }) => {
  const { productos } = useItems();

  return (
    <div className="item-list-container">
      <h2>{titulo}</h2>
      <ItemList productos={productos} />
    </div>
  );
};

export default ItemListContainer;
