// Servicio para crear un producto en la API (mockapi)
const API_BASE = "https://6900bbf2ff8d792314bb353b.mockapi.io/Products";

export const createProduct = async (productData) => {
  // productData debe contener los campos esperados por la API
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `Error creando producto en la API: ${response.status} ${text}`
    );
  }

  const json = await response.json();
  return json;
};
