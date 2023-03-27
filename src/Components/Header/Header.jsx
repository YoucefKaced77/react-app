import React from "react";
import Nav from 'react-bootstrap/Nav';
import "./Header.css";
import logo from './header_logo.png';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { loginContext } from "../../App";

function Header() {

  const {login} = useContext(loginContext);
  const setLogin = useContext(loginContext).setLogin;

  return (
    <header>
      <div className="left">
        <img src={logo} alt="Logo" />
        <h1>Super Shop</h1>
      </div>

      <Nav className="justify-content-end">  
        <Nav.Item>
          <Nav.Link href='/'>Inicio</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link href="/MisPedidos">Mis pedidos</Nav.Link>
        </Nav.Item>
        {login ? (
          <Nav.Item>
            <Nav.Link href='/Logout' >Logout</Nav.Link>
          </Nav.Item>
        ) : (
          <Nav.Item>
            <Nav.Link href='/Login'>Login</Nav.Link>
          </Nav.Item>
        )}
        <Nav.Item>
          <Nav.Link href='/Registro'>Registro</Nav.Link>
        </Nav.Item>
      </Nav>
    </header>
  );
}

export default Header;
