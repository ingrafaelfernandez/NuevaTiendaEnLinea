
/*
  Context: ProductContext
  Propósito: Mantener la lista de productos visibles en la aplicación (mezcla productos fijos y API)
  Conexiones:
    - `initialProducts` (src/components/Item/Item.jsx): productos fijos incluidos por defecto
    - Al montarse, carga productos desde la API y los mezcla con los fijos
    - Consumido por `ItemListContainer`, `ProductDetail`, `ItemList` y otros componentes que necesiten productos
*/
import { createContext, useContext, useEffect, useState } from "react";
import initialProducts from "../Item/Item";
import productService from "../../services/productService";

/*
  Contexto: ProductContext
  Propósito: Proveer la lista global de productos para la aplicación.
  Comportamiento:
    - Inicializa con `initialProducts` (productos fijados localmente)
    - En mount, carga productos desde MockAPI y los normaliza
    - Expone `products` y `setProducts` para consumo en la app
*/
const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiProducts = await productService.getProducts();
        const normalized = apiProducts.map((p) => ({
          ...p,
          name: p.name || p.nombre,
          price: p.price || p.precio,
          imageUrl: p.imageUrl || p.imagen || p.image || p.imageUrl,
          category: p.category || p.categoria,
        }));
        setProducts((prev) => [...prev, ...normalized]);
      } catch (err) {
        console.error("Error fetching products", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);

export default ProductContext;
  return (
    <ProductContext.Provider value={{ productos, agregarProducto }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductos = () => useContext(ProductContext);
