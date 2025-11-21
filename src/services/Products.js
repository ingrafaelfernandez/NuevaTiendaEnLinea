const BASE_URL = 'https:// 6900bbf2ff8d792314bb353b.mockapi.io/products';

export const createProduct = async (productData) => {
  const response = await fetch(BASE_URL, {
    method: 'POST', 
    headers: {"content-type": "application/json"},
    body: JSON.stringify(product),
  });
    if (!res.ok) {
        throw new Error('Error al crear el producto');
    }
    const result = await res.json();
    return result;
};