import React from "react";
import Nav from 'react-bootstrap/Nav';
import "./Header.css";

function Header() {
  return (
    <Nav defaultActiveKey="/Home" as="ul">
      <Nav.Item as="li">
        <Nav.Link href="/Home">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link href="/Catalogo">Catálogo</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link href="/Carrito">Carrito</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link href="/MisPedidos">Mis pedidos</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link href="/Login">Login</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Header;
