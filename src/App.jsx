import ".//styles/Global.css";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/Context/AuthContext";

import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Categories from "./components/Categories/Categories";
import { ProductFormContainer } from "./components/adminComponents/ProductFormContainer/ProductFormContainer";
import { Cart } from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import { AdminLayaouts } from "./layaouts/AdminLayaouts";
import { Login } from "./components/Login/Login";


function App() {
  return (
    <AuthProvider>
    <div className="app">
      <Header />
      
      <Navbar />
       
      <main className="content">
        
        <Routes>
          {/* 🛍️ Rutas públicas */}
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/category/:category" element={<ItemListContainer titulo="Productos por Categoría" />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/detalle/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* 🔐 Rutas de Admin (solo accesible por URL directa, sin menú público) */}
          <Route path="/admin" element={<AdminLayaouts />}>
            <Route index element={<Login />} /> {/* /admin */}
            <Route path="product-form" element={<ProductFormContainer />} /> {/* /admin/product-form */}
          </Route>
          
        </Routes>
      </main>

      <Footer />
    </div>
    </AuthProvider>
  );
}
export default App;
