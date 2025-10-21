import ".//styles/Global.css";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ProductDetail from "./components/ProductDetail/ProductDetail";
//import ProductForm from "./components/ProductForm/ProductForm";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ItemListContainer />} />
        <Route path="/detalle/:id" element={<ProductDetail />} />
        
      </Routes>
      <Footer />
    </>
  );
}
export default App;
