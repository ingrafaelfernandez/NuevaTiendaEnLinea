/*
  Componente: ItemListContainer
  Propósito: Carga y muestra la lista de productos. Usa el `ProductContext` como fuente única de productos
  Conexiones:
    - `useProductos` (Context/ProductContext): obtiene la lista completa de productos (fijos + API)
    - `ItemList`: renderiza la cuadrícula de tarjetas de producto
    - `useParams` / `useNavigate` (react-router): filtra por categoría y permite navegar a `/categories`
*/
import { useState, useEffect } from "react";
import ItemList from "../ItemList/ItemList";
import { useParams, useNavigate } from "react-router-dom";
import { useProductos } from "../Context/ProductContext";

import "./ItemListContainer.css";

export const ItemListContainer = ({ titulo = "Catálogo de Productos" }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { category } = useParams();
  const navigate = useNavigate();
  const { productos } = useProductos();

  useEffect(() => {
    // Si hay categoría, filtrar productos por categoría
    if (category) {
      const filtered = productos.filter(
        (p) => (p.category || p.categoria) === category
      );
      setFilteredProducts(filtered);
    } else {
      // Si no hay categoría, mostrar todos
      setFilteredProducts(productos);
    }
  }, [productos, category]);

  return (
    <section className="container">
      <div className="list-header">
        {category && (
          <button 
            className="btn-back" 
            onClick={() => navigate('/categories')}
            title="Volver a la lista de categorías"
          >
            ← Volver a Categorías
          </button>
        )}
        <h1>{titulo}</h1>
      </div>
      <ItemList lista={filteredProducts} />
    </section>
  );
};

export default ItemListContainer;
