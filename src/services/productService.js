// Servicio para interactuar con la API (MockAPI)
const API_BASE = "https://6900bbf2ff8d792314bb353b.mockapi.io/Products";

export const getProducts = async () => {
  const response = await fetch(API_BASE);
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Error obteniendo productos: ${response.status} ${text}`);
  }
  const json = await response.json();
  return json;
};

export const createProduct = async (productData) => {
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
