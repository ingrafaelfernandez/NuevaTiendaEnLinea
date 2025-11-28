
import { useState, useEffect } from "react";
import { ProductFormUI } from "../ProductFormUI/ProductFormUI";
import { useAdminProducts } from "../../../Context/AdminProductContext/AdminProductContext";
import { validateProduct } from "../../../utils/validateProducts";
import { uploadImage } from "../../../utils/uploadImage";
import { createProduct } from "../../../services/productService";
import "./ProductFormContainer.css";

export const ProductFormContainer = () => {
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
  const [success, setSuccess] = useState("");
    const [errors, setErrors] = useState({});
    const { addSessionProduct } = useAdminProducts();
    const [product, setProduct] = useState({
      name: "",
      price: "",
      category: "",
      description: "",
      
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setProduct({...product, [name]:value });
        
    };

    const handleFileChange = (newFile) => {
      setFile(newFile);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("=== INICIANDO SUBMISIÓN DEL FORMULARIO ===");
      console.log("Producto actual:", product);
      console.log("Archivo:", file);
      
      setErrors({});
      setLoading(true);

      const newErrors = validateProduct({ ...product, file });
      console.log("Errores de validación:", newErrors);
      
      if (Object.keys(newErrors).length > 0) {
        const filteredErrors = Object.fromEntries(
          Object.entries(newErrors).filter(([_, v]) => v !== "")
        );
        console.log("Errores encontrados (filtrados):", filteredErrors);
        
        if (Object.keys(filteredErrors).length > 0) {
          setErrors(filteredErrors);
          setLoading(false);
          return;
        }
      }

      try {
        console.log('Iniciando subida de imagen...', { file });
        const imageUrl = await uploadImage(file);
        console.log('Imagen subida exitosamente:', imageUrl);

        const productData = {
            ...product,
            price: Number(product.price),
            imageUrl
        };
        console.log('Datos del producto a crear:', productData);

        const created = await createProduct(productData);
        console.log('Producto creado en MockAPI:', created);
        
        const productUrl = created && created.id ? `https://6900bbf2ff8d792314bb353b.mockapi.io/Products/${created.id}` : "";
        setSuccess(
          `✅ Producto creado exitosamente. Ver: ${productUrl}`
        );
        
        // Agregar a la lista de sesión
        addSessionProduct({
          name: product.name,
          category: product.category,
          price: Number(product.price),
          description: product.description,
          imageUrl: imageUrl,
        });
        
        // limpiar formulario
        setProduct({ name: "", price: "", category: "", description: "" });
        setFile(null);
        
    } catch (error) {
        console.error("❌ Error en handleSubmit:", error);
        setErrors({ general: error.message });
    } finally {
      setLoading(false);
    }
};

  // auto-dismiss success message after 3s
  useEffect(() => {
    if (!success) return;
    const id = setTimeout(() => setSuccess(""), 3000);
    return () => clearTimeout(id);
  }, [success]);

    return (
    <ProductFormUI
    product={product} 
    errors={errors} 
    onChange={handleChange} 
    onFileChange={handleFileChange} 
    loading={loading} 
  onSubmit={handleSubmit}
  successMessage={success} />
);
    
};

/*
Nota de documentación:
  Componente: ProductFormContainer
  Cual es el proposito: Manejar la lógica del formulario de creación de productos (validación, subida de imagen a MockAPI)
  Conexiones:
    1 `ProductFormUI`: componente presentacional que renderiza el formulario
    2 `useAdminProducts` (AdminProductContext): agrega el producto a la lista de sesión administrativa
    3 `uploadImage` (utils): sube la imagen a imgbb y devuelve `imageUrl`
    4 `createProduct` (services/productService): crea el producto en MockAPI
*/