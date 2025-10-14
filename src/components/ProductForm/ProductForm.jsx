import { useState } from "react";
import { useItems } from "../Item/Item";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./ProductForm.css";

const ProductForm = () => {
  const { agregarProducto } = useItems();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    imagen: null
  });
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imagen" && files[0]) {
      setForm({ ...form, imagen: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nombre || !form.precio) {
      toast.error("Nombre y precio son obligatorios");
      return;
    }

    toast.info("Producto será cargado...", { autoClose: 2000 });

    setTimeout(() => {
      const newProducto = {
        ...form,
        imagen: form.imagen ? URL.createObjectURL(form.imagen) : null
      };

      agregarProducto(newProducto);

      setForm({ nombre: "", descripcion: "", precio: "", imagen: null });
      setPreview(null);

      toast.success("Producto cargado exitosamente");

      navigate("/");
    }, 2100);
  };

  return (
    <div className="product-form-wrapper">
      <form className="product-form" onSubmit={handleSubmit}>
        <h2>Agregar Nuevo Producto</h2>

        <label>
          Nombre:
          <input name="nombre" value={form.nombre} onChange={handleChange} />
        </label>

        <label>
          Descripción:
          <textarea name="descripcion" value={form.descripcion} onChange={handleChange} />
        </label>

        <label>
          Precio:
          <input
            name="precio"
            type="number"
            value={form.precio}
            onChange={handleChange}
          />
        </label>

        <label className="file-input-label">
          Imagen:
          <input
            name="imagen"
            type="file"
            accept="image/*"
            onChange={handleChange}
          />
        </label>

        {preview && (
          <div className="preview-container">
            <p>Vista previa:</p>
            <img src={preview} alt="preview" className="preview-image" />
          </div>
        )}

        <button type="submit">Agregar Producto</button>
      </form>
    </div>
  );
};

export default ProductForm;
