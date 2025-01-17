import { Link } from 'react-router-dom';
import { useState } from "react";
import './navbar.css'

const NAVBAR_ITEMS = [
    {label:'Home', href:'/'},
    {label:'Instructions', href:'/instructions'},
    {label:'Results', href:'/results'}
];

const Navbar = () => {
    return (
        <div className="navbar-container">
          <nav className="navbar">
            {NAVBAR_ITEMS.map((item, index) => (
              <Link key={item.href || index} to={item.href} className="navbar-link">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      );
    };
export default Navbar;
