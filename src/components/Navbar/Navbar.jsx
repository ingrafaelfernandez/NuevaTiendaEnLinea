import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar">
    <ul>
      <li><Link to="/">Inicio</Link></li>
      <li><a href="#">Contacto</a></li>
      <li><a href="#">Sobre Nosotros</a></li>
      <li><a href="#">Encuesta</a></li>
      <li><Link to="/agregar">Agregar Producto</Link></li>
      
    </ul>
  </nav>
);

export default Navbar;
