/*
  Componente: ProductFormUI (Presentacional)
  Propósito: Renderiza el formulario de creación de producto y muestra alertas de éxito/error
  Conexiones:
    - Recibe props desde `ProductFormContainer` (product, errors, onChange, onFileChange, onSubmit, loading)
    - Usa estilos en `ProductFormUI.css`
*/
import './ProductFormUI.css';

export const ProductFormUI = ({
     product,
     errors,
     loading,
     onChange,
     onFileChange, 
     onSubmit,
     successMessage
     }) => {
   return (
 <section className="form-section">
   {successMessage && (
     <div className="alert alert-success" role="status" aria-live="polite">
       <span className="alert-icon">✅</span>
       <div className="alert-content">
         <strong>¡Éxito!</strong>
         <p>{successMessage}</p>
       </div>
     </div>
   )}
   {errors.general && (
     <div className="alert alert-error" role="alert">
       <span className="alert-icon">❌</span>
       <div className="alert-content">
         <strong>Error</strong>
         <p>{errors.general}</p>
       </div>
     </div>
   )}
    <form 
      className="product-form" 
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
    >
        <h2>Agregar Nuevo Producto {loading && <span className="loading-indicator">⌛</span>}</h2>
        
        <div className="form-group">
        <label>Nombre del Producto:</label>
        <input 
          type="text"
          name="name"
          value={product.name}
          onChange={onChange}
          placeholder="Ej: Zapatillas Nike"
          required
        />
        {errors.name && <span className="error-inline">{errors.name}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
          <label>Precio:</label>
          <input 
            type="number"
            name="price"   
            value={product.price}
            onChange={onChange}
            min={1}
            placeholder="Ej: 99.99"
            required
          />
          {errors.price && <span className="error-inline">{errors.price}</span>}
          </div>

          <div className="form-group">
          <label>Categoría:</label>
          <input 
            type="text"
            name="category"
            value={product.category}
            onChange={onChange}
            placeholder="Ej: Calzado"
            required
          />
          {errors.category && <span className="error-inline">{errors.category}</span>}
          </div>
        </div>

        <div className="form-group">
        <label>Descripción:</label>
        <textarea
          name="description"
          value={product.description}
          onChange={onChange}
          placeholder="Describe las características del producto..."
          rows={4}
          required
        />
        {errors.description && <span className="error-inline">{errors.description}</span>}
        </div>

        <div className="form-group">
        <label>Imagen del Producto:</label>
        <input 
          type="file"
          name="image"
          onChange={(e) => {
            const file = e.target.files && e.target.files.length > 0 ? e.target.files[0] : null;
            onFileChange(file);
          }}
          accept="image/*"
          required
        />
        {errors.image && <span className="error-inline">{errors.image}</span>}
        </div>

        <div className="form-actions">
        <button 
          className="btn-submit" 
          type="submit" 
          disabled={loading}
        >
          {loading ? (
            <span>
              <span className="loading-indicator">⌛</span>
              Cargando producto...
            </span>
          ) : (
            "Cargar Producto"
          )}
        </button>
        </div>
    </form>
 </section>

   );

};
