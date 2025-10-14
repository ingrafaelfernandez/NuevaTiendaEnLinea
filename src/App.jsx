import ".//styles/Global.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import ProductForm from "./components/ProductForm/ProductForm";

function App() {
  return (
    <>
      <Header />
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<ItemListContainer titulo="Catálogo de productos" />} />
          <Route path="/detalle/:id" element={<ProductDetail />} />
          <Route path="/agregar" element={<ProductForm />} />
        </Routes>
      </main>

      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}   // se cierra automáticamente en 3s
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
}

export default App;
