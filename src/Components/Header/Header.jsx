import React from "react";
import Nav from 'react-bootstrap/Nav';
import "./Header.css";

function Header() {
  return (
    <Nav defaultActiveKey="/" as="ul">  
      <Nav.Item as="li">
        <Nav.Link href="/MisPedidos">Mis pedidos</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link href="/">Logout</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Header;
