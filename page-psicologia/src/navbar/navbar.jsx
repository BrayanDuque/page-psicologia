import React from 'react';
import '../navbar/navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h2>Psicóloga</h2>
        </div>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <a href="#inicio" className="navbar-link">Inicio</a>
          </li>
          <li className="navbar-item">
            <a href="#servicios" className="navbar-link">Servicios</a>
          </li>
          <li className="navbar-item">
            <a href="#sobre-mi" className="navbar-link">Sobre Mí</a>
          </li>
          <li className="navbar-item">
            <a href="#contacto" className="navbar-link">Contacto</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;