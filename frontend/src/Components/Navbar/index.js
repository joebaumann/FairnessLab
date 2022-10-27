import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';
import logo from "./logo.ico";
import Hamburger from "../Hamburger";

const Navbar = () => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen)
  }
  const closeHamburger = () => {
    setHamburgerOpen(false)
  }
  return (
    <nav className="Navbar">
      <div className='Navbar-hamburger' onClick={toggleHamburger}>
        <Hamburger isOpen={hamburgerOpen}/>
      </div>
      <Link to="/">
        <img alt="Logo" className="Navbar-logo" src={logo}/>
      </Link>
      <ul className={hamburgerOpen ? 'open' : 'closed'}>
        <li>
          <NavLink key="audit" className="Navbar-link" exact to="/audit" activeClassName="active" onClick={closeHamburger}>Audit</NavLink>
        </li>
        <li>
          <NavLink key="compas" className="Navbar-link" exact to="/compas" activeClassName="active" onClick={closeHamburger}>COMPAS Case Study</NavLink>
        </li>
        <li>
          <NavLink key="faq" className="Navbar-link" exact to="/faq" activeClassName="active" onClick={closeHamburger}>FAQ</NavLink>
        </li>
        <li>
          <NavLink key="contact" className="Navbar-link" exact to="/contact" activeClassName="active" onClick={closeHamburger}>Contact</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;