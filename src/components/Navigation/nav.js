import React from 'react';
import "./nav.css";

function Nav() {

  return (
    <nav className="navbar">
      <a href="/" className="nav-brand">CreditCard</a>
      <ul className="nav-menu">
        <li><a href="/home">Apply</a></li>
        <li><a href="/status">Status</a></li>
      </ul>
    </nav>
  );
}

export default Nav;