export const validateProduct = (product, fileRequired = true) => {
  const errors = { name: "", price: "", description:"", category: "", image: "" };

  if (!product.name || product.name.trim() === "") {
    errors.name = "El nombre del producto es obligatorio.";
  }

  if (!product.price || isNaN(product.price) || Number(product.price) <= 0) {
    errors.price = "El precio debe ser mayor a cero.";
  }
 if (!product.description || product.description.trim() === "") {
    errors.description = "La categoría del producto es obligatoria.";
  }
  if (!product.category || product.category.trim() === "") {
    errors.category = "La categoría del producto es obligatoria.";
  }
  // Puede venir como product.file (desde el formulario) o como product.image (URL existente)
  if (
    fileRequired &&
    (!product.file && (!product.image || String(product.image).trim() === ""))
  ) {
    errors.image = "La imagen del producto es obligatoria.";
  }


  return errors;
};