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
      {/* <NavLink key="workflow" className="Navbar-link" exact to="/workflow" activeClassName="active">Workflow</NavLink>
      <NavLink key="data" className="Navbar-link" exact to="/data" activeClassName="active">Data</NavLink> */}
      <NavLink key="audit" className="Navbar-link" exact to="/audit" activeClassName="active">Audit</NavLink>
      <NavLink key="improve" className="Navbar-link" exact to="/improve" activeClassName="active">Improve</NavLink>
      <NavLink key="about" className="Navbar-link" exact to="/about" activeClassName="active">About</NavLink>
      <NavLink key="contact" className="Navbar-link" exact to="/contact" activeClassName="active">Contact</NavLink>
    </nav>
  );
}

export default Navbar;