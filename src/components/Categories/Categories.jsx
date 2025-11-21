import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Categories.css";

export const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const API = "https://6900bbf2ff8d792314bb353b.mockapi.io/Products";

    fetch(API)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al obtener productos");
        }
        return res.json();
      })
      .then((data) => {
        // Extraer categorías únicas
        const uniqueCategories = [
          ...new Set(data.map((prod) => prod.category).filter(Boolean))
        ];
        setCategories(uniqueCategories);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="categories-container">
        <h1>Categorías</h1>
        <p>Cargando categorías...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="categories-container">
        <h1>Categorías</h1>
        <p className="error">Error: {error}</p>
      </section>
    );
  }

  return (
    <section className="categories-container">
      <h1>Categorías</h1>
      <div className="categories-grid">
        {categories.length > 0 ? (
          categories.map((category) => (
            <Link
              key={category}
              to={`/category/${encodeURIComponent(category)}`}
              className="category-card"
            >
              <div className="category-content">
                <h2>{category}</h2>
              </div>
            </Link>
          ))
        ) : (
          <p>No hay categorías disponibles</p>
        )}
      </div>
    </section>
  );
};

export default Categories;
