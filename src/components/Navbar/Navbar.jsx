import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext"; // 🛒 importamos el carrito
import "./Navbar.css";

const Navbar = () => {
  const { totalItems } = useCart(); // 🔢 obtenemos el total de productos

  return (
    <nav className="navbar">
      <h1 className="logo">Mi Tienda</h1>
      <ul className="nav-links">
        <li><Link to="/">Productos</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>

        {/* 🛒 Sección del carrito */}
        <li className="nav-cart">
          <Link to="/cart">
            🛒 <span className="cart-count">{totalItems.toLocaleString("en-US")}
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
