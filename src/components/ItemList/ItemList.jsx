import { useProducts } from "../../Context/ProductContext";
import ItemCard from "../ItemCard/ItemCard";
import "./ItemList.css";

const ItemList = ({ lista }) => {
  const { products } = useProducts();
  const source = Array.isArray(lista) ? lista : products;
  return <div className="item-list">{source.map(p => <ItemCard key={p.id} producto={p} />)}</div>;
};

export default ItemList;

