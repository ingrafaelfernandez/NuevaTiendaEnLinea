#!/bin/bash
set -e

echo "📁 Creando estructura base del proyecto..."

# Carpetas principales
mkdir -p src/components
mkdir -p src/data
mkdir -p src/styles

# Main.jsx
cat > src/main.jsx <<'EOF'
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/App.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
EOF

# App.jsx
cat > src/App.jsx <<'EOF'
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ProductDetail from './components/ProductDetail/ProductDetail';
import './styles/App.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<ItemListContainer titulo="Catálogo de productos" />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
EOF

# Productos de ejemplo (sin imágenes)
cat > src/data/productos.js <<'EOF'
const productos = [
  { id: 1, nombre: 'Producto 1', descripcion: 'Descripción breve del producto 1', precio: 25 },
  { id: 2, nombre: 'Producto 2', descripcion: 'Descripción breve del producto 2', precio: 40 },
  { id: 3, nombre: 'Producto 3', descripcion: 'Descripción breve del producto 3', precio: 60 },
];

export default productos;
EOF

# Estilos globales básicos
cat > src/styles/App.css <<'EOF'
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background-color: #fafafa;
  color: #222;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 20px;
}
EOF

# Componentes principales
components=(Header Navbar Footer Item ItemList ItemListContainer ProductDetail)

for comp in "${components[@]}"; do
  mkdir -p "src/components/$comp"
done

# Header.jsx
cat > src/components/Header/Header.jsx <<'EOF'
import './Header.css';

const Header = () => <header className="header">🛒 Tienda en Línea</header>;

export default Header;
EOF

# Header.css
cat > src/components/Header/Header.css <<'EOF'
.header {
  background-color: #0077cc;
  color: white;
  text-align: center;
  padding: 16px;
  font-size: 1.4rem;
  font-weight: 700;
}
EOF

# Navbar.jsx
cat > src/components/Navbar/Navbar.jsx <<'EOF'
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar">
    <ul>
      <li><Link to="/">Inicio</Link></li>
      <li><a href="#">Ofertas</a></li>
      <li><a href="#">Contacto</a></li>
    </ul>
  </nav>
);

export default Navbar;
EOF

# Navbar.css
cat > src/components/Navbar/Navbar.css <<'EOF'
.navbar {
  background-color: #f5f5f5;
  padding: 10px 0;
}
.navbar ul {
  display: flex;
  justify-content: center;
  gap: 24px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.navbar a {
  color: #333;
  font-weight: 600;
  text-decoration: none;
}
.navbar a:hover { color: #0077cc; }
EOF

# Footer.jsx
cat > src/components/Footer/Footer.jsx <<'EOF'
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    © {new Date().getFullYear()} Tienda en Línea. Todos los derechos reservados.
  </footer>
);

export default Footer;
EOF

# Footer.css
cat > src/components/Footer/Footer.css <<'EOF'
.footer {
  background-color: #003366;
  color: white;
  text-align: center;
  padding: 12px;
  font-size: 0.9rem;
}
EOF

# Item.jsx
cat > src/components/Item/Item.jsx <<'EOF'
import './Item.css';
import { Link } from 'react-router-dom';

const Item = ({ producto }) => (
  <div className="item-card">
    <h3>{producto.nombre}</h3>
    <p>{producto.descripcion}</p>
    <p className="precio">Precio: ${producto.precio}</p>
    <Link to={`/producto/${producto.id}`} className="btn">Ver detalle</Link>
  </div>
);

export default Item;
EOF

# Item.css
cat > src/components/Item/Item.css <<'EOF'
.item-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 16px;
  background: white;
  text-align: center;
  transition: transform 0.2s;
}
.item-card:hover {
  transform: scale(1.02);
}
.item-card .precio {
  font-weight: bold;
  color: #0077cc;
}
.btn {
  background: #0077cc;
  color: white;
  padding: 8px 12px;
  border-radius: 5px;
  text-decoration: none;
}
.btn:hover { background: #005fa3; }
EOF

# ItemList.jsx
cat > src/components/ItemList/ItemList.jsx <<'EOF'
import './ItemList.css';
import Item from '../Item/Item';

const ItemList = ({ productos }) => (
  <div className="item-list">
    {productos.map(p => <Item key={p.id} producto={p} />)}
  </div>
);

export default ItemList;
EOF

# ItemList.css
cat > src/components/ItemList/ItemList.css <<'EOF'
.item-list {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}
EOF

# ItemListContainer.jsx
cat > src/components/ItemListContainer/ItemListContainer.jsx <<'EOF'
import './ItemListContainer.css';
import ItemList from '../ItemList/ItemList';
import productos from '../../data/productos';

const ItemListContainer = ({ titulo }) => (
  <div className="item-list-container">
    <h2>{titulo}</h2>
    <ItemList productos={productos} />
  </div>
);

export default ItemListContainer;
EOF

# ItemListContainer.css
cat > src/components/ItemListContainer/ItemListContainer.css <<'EOF'
.item-list-container {
  max-width: 1000px;
  margin: 0 auto;
}
.item-list-container h2 {
  text-align: center;
  margin-bottom: 20px;
}
EOF

# ProductDetail.jsx
cat > src/components/ProductDetail/ProductDetail.jsx <<'EOF'
import './ProductDetail.css';
import { useParams, Link } from 'react-router-dom';
import productos from '../../data/productos';

const ProductDetail = () => {
  const { id } = useParams();
  const producto = productos.find(p => p.id === Number(id));

  if (!producto) return <p>Producto no encontrado</p>;

  return (
    <div className="product-detail">
      <h2>{producto.nombre}</h2>
      <p>{producto.descripcion}</p>
      <p className="precio">Precio: ${producto.precio}</p>
      <Link to="/" className="btn">Volver</Link>
    </div>
  );
};

export default ProductDetail;
EOF

# ProductDetail.css
cat > src/components/ProductDetail/ProductDetail.css <<'EOF'
.product-detail {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
}
.product-detail .precio {
  font-weight: bold;
  color: #0077cc;
}
EOF

echo "✅ Estructura base creada correctamente."
