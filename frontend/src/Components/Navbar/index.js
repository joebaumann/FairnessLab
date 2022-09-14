import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';
import logo from "./logo.ico";

const Navbar = () => {
  return (
    <nav className="Navbar">
      <Link to="/">
        <img alt="Logo" className="Navbar-logo" src={logo}/>
      </Link>
      <NavLink key="audit" className="Navbar-link" exact to="/audit" activeClassName="active">Audit</NavLink>
      <NavLink key="compas" className="Navbar-link" exact to="/compas" activeClassName="active">COMPAS Case Study</NavLink>
      <NavLink key="contact" className="Navbar-link" exact to="/contact" activeClassName="active">Contact</NavLink>
    </nav>
  );
}

export default Navbar;