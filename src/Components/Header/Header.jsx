import React from "react";
import Nav from 'react-bootstrap/Nav';
import "./Header.css";
import logo from './header_logo.png';
import { useContext } from "react";
import loginContext from "../../Store/loginContext";
import {useNavigate} from "react-router-dom"

function Header() {

  const {login} = useContext(loginContext);
  const setLogin = useContext(loginContext).setLogin;
  const navigate = useNavigate();

  return (
    <header>
      <div className="left">
        <img src={logo} alt="Logo" />
        <h1>Super Shop</h1>
      </div>

      <Nav className="justify-content-end">  
        <Nav.Item>
          <Nav.Link onClick={() => navigate('/')}>Inicio</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link onClick={() => navigate('/MisPedidos')}>Mis pedidos</Nav.Link>
        </Nav.Item>
        {login ? (
          <Nav.Item>
            <Nav.Link onClick={() => navigate('/Logout')}>Logout</Nav.Link>
          </Nav.Item>
        ) : (
          <Nav.Item>
            <Nav.Link onClick={() => navigate('/Login')}>Login</Nav.Link>
          </Nav.Item>
        )}
        <Nav.Item>
          <Nav.Link onClick={() => navigate('/Registro')}>Registro</Nav.Link>
        </Nav.Item>
      </Nav>
    </header>
  );
}

export default Header;
