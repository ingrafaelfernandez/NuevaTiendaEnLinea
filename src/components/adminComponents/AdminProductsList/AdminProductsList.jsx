/*
  Componente: AdminProductsList
  Propósito: Mostrar la lista de productos agregados durante la sesión administrativa.
  Conexiones:
    - `useAdminProducts` (AdminProductContext): obtiene `sessionProducts` y `clearSessionProducts`.
    - Se muestra debajo del formulario de administración dentro de `AdminLayaouts`.
*/
import './AdminProductsList.css';
import { useAdminProducts } from '../../../Context/AdminProductContext/AdminProductContext';

export const AdminProductsList = () => {
  const { sessionProducts, clearSessionProducts } = useAdminProducts();

  if (sessionProducts.length === 0) {
    return (
      <section className="admin-products-list">
        <h3>Productos Cargados en la Sesión</h3>
        <p className="empty-message">No hay productos cargados aún</p>
      </section>
    );
  }

  return (
    <section className="admin-products-list">
      <div className="list-header">
        <h3>Productos Cargados en la Sesión ({sessionProducts.length})</h3>
        <button className="btn-clear-list" onClick={clearSessionProducts}>
          Limpiar Lista
        </button>
      </div>

      <div className="products-table-wrapper">
        <table className="products-table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Fecha de Carga</th>
            </tr>
          </thead>
          <tbody>
            {sessionProducts.map((product) => (
              <tr key={product.sessionId} className="product-row">
                <td className="image-cell">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="product-thumbnail" />
                  ) : (
                    <span className="no-image">Sin imagen</span>
                  )}
                </td>
                <td>
                  <strong>{product.name}</strong>
                  <p className="description">{product.description}</p>
                </td>
                <td>
                  <span className="badge">{product.category}</span>
                </td>
                <td>
                  <strong className="price">${product.price.toFixed(2)}</strong>
                </td>
                <td>
                  <small>{product.createdAt}</small>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminProductsList;
