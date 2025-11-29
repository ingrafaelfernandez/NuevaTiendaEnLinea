import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../Context/CartContext/CartContext";
import "./Navbar.css";
import MiniCart from "./MiniCart";

const Navbar = () => {
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [fabHidden, setFabHidden] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);
  const [miniClosing, setMiniClosing] = useState(false);
  const hideTimeout = useRef();

  const displayCount = Number(totalItems) > 9 ? "9+" : String(totalItems || 0);

  useEffect(() => {
    if (mobileOpen) {
      clearTimeout(hideTimeout.current);
      setFabHidden(true);
    } else {
      clearTimeout(hideTimeout.current);
      hideTimeout.current = setTimeout(() => setFabHidden(false), 120);
    }
    return () => clearTimeout(hideTimeout.current);
  }, [mobileOpen]);

  const toggleMobile = () => setMobileOpen((s) => !s);
  const closeMobile = () => setMobileOpen(false);
  const toggleFab = () => setFabOpen((s) => !s);
  const closeMiniCart = () => {
    setMiniClosing(true);
    setTimeout(() => {
      setFabOpen(false);
      setMiniClosing(false);
    }, 200);
  };

  return (
    <>
      <nav className="navbar">
        <h1 className="logo"><Link to="/">Inicio</Link></h1>

        <button
          className={`hamburger ${mobileOpen ? "is-active" : ""}`}
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileOpen}
          onClick={toggleMobile}
        >
          <span className="hamburger-box"><span className="hamburger-inner" /></span>
        </button>

        <ul className={`nav-links ${mobileOpen ? "open" : ""}`}>
          <li onClick={closeMobile}><Link to="/">Productos</Link></li>
          <li onClick={closeMobile}><Link to="/categories">Categorías</Link></li>
          <li className="nav-cart" onClick={closeMobile}>
            <Link to="/cart" className="nav-cart-link">🛒 <span className="cart-count">{displayCount}</span></Link>
          </li>
        </ul>
      </nav>

      <button
        type="button"
        className={`cart-fab ${fabHidden ? "fab-hidden" : ""}`}
        aria-label={`Abrir mini carrito (${displayCount})`}
        title={`Carrito (${displayCount})`}
        aria-expanded={fabOpen}
        onClick={toggleFab}
      >
        <span className="cart-fab-icon">🛒</span>
        <span className="cart-fab-count">{displayCount}</span>
      </button>

      {(fabOpen || miniClosing) && (
        <>
          <div className={`mini-cart-backdrop ${miniClosing ? "closing" : ""}`} onClick={closeMiniCart} />
          <div className={`mini-cart-wrapper ${miniClosing ? "closing" : ""}`} aria-live="polite">
            <MiniCart onClose={closeMiniCart} />
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
