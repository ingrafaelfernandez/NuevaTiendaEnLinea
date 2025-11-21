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
 <section>
   {successMessage && (
     <div className="success-message" role="status" aria-live="polite">
       {successMessage}
     </div>
   )}
   {errors.general && (
     <div className="error-message" role="alert">
       {errors.general}
     </div>
   )}
    <form 
      className="product-form" 
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
    >
        <h2>Agregar Producto {loading && <span className="loading-indicator">⌛</span>}</h2>
        <div>
        <label>Nombre:</label>
        <input 
          type="text"
          name="name"
          value={product.name}
          onChange={onChange}
          required
        />
        {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div>
        <label>Precio:</label>
        <input 
          type="number"
          name="price"   
          value={product.price}
          onChange={onChange}
          min={1}
          required
        />
        {errors.price && <span className="error">{errors.price}</span>}
        </div>
        <div>
        <label>Categoria:</label>
        <input 
          type="text"
          name="category"
          value={product.category}
          onChange={onChange}
          required
        />
        {errors.category && <span className="error">{errors.category}</span>}
        </div>
        <div>
        <label htmlFor="">Descripcion:</label>
        <textarea
        name="description"
        value={product.description}
        onChange={onChange} 
        required
        />
        {errors.description && <span className="error">{errors.description}</span>}
        </div>
        <div>
        <label>Imagen:</label>
        <input 
          type="file"
          name="image"
          onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
          accept="image/*"
          required
        />
        {errors.image && <span className="error">{errors.image}</span>}
        </div>
        <div>
        <button 
          className="btn" 
          type="submit" 
          disabled={loading}
        >
          {loading ? (
            <span>
              <span className="loading-indicator">⌛</span>
              Subiendo imagen...
            </span>
          ) : (
            "Agregar Producto"
          )}
        </button>
        </div>
    </form>
 </section>

   );

};