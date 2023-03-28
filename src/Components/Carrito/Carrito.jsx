import React, { useState } from 'react';
import { useEffect } from 'react';
import "./Carrito.css"
import { useContext } from 'react';
import CestaContext from "../../Store/CestaContext"
import loginContext from "../../Store/loginContext"
import Confirmacion from '../Confirmacion/Confirmacion';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function MyVerticallyCenteredModal(props) {

  const {cesta1} = useContext(CestaContext);
  const setCesta1 = useContext(CestaContext).setCesta1;

  const totalCarrito = () => {
    console.log(cesta1)
    console.log(cesta1.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0))
    return cesta1.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
  };
  console.log("esta es la cesta antes de",cesta1)
  const navigate = useNavigate();
    
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            RESUMEN DEL PEDIDO
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>PRODUCTOS</h4>
          <p>
          <div>
                {cesta1.map((producto) => (
                  <div className="producto">
                    <p>{producto.nombre}</p>
                    <p>${producto.precio}</p>
                    <p>{producto.cantidad}</p>
                  </div>
                ))}
                <div className="total">
                  <p>Total:</p>
                  <p>${totalCarrito()}</p>
                </div>
                <div className="aviso">
                  <p>¿ Estás seguro ? YA NO HABRÁ VUELTA ATRÁS</p>
                </div>
          </div>
          </p>
        </Modal.Body>
        <Modal.Footer>
        <Nav>
          <Nav.Item as="li">
            <Nav.Link onClick={() => navigate("/Formulario")}>Grabar Pedido</Nav.Link>
          </Nav.Item>
        </Nav>
        </Modal.Footer>
      </Modal>
    );
  
                
}

function Carrito() {

  const {login} = useContext(loginContext);

  const [modalShow, setModalShow] = React.useState(false);
  const [cesta, setCesta] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  const {cesta1} = useContext(CestaContext);
  const setCesta1 = useContext(CestaContext).setCesta1;

  function checkear(){

  }

  function borraloboludo(id){
    const nuevaCesta = cesta1.filter(producto => producto.nombre !== id);
    console.log(cesta1)
    setCesta1(nuevaCesta);
  };

  const vaciarCarrito = () => {
    setCesta1([]);
  };

  function checkear(login){
    if (login==false){
      alert("Necesitas logearte")
    }
  }

  const totalCarrito = () => {
    return cesta1.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
  };

  function totalcantidad(){
    return cesta1.reduce((total, producto) => total + (producto.cantidad), 0);
  }

  const navigate = useNavigate();
  
  return (
    <div className="carrito-container">
      <button className="mostrar-carrito" onClick={() => setMostrarCarrito(!mostrarCarrito)}>
      Mostrar carrito ({totalcantidad()})
      </button>
      {mostrarCarrito && (
        <div className="carrito">
          <h2>Tu carrito de compras</h2>
          {cesta1.length === 0 ? (
            <p>No hay productos en el carrito</p>
          ) : (
            <div>
              {cesta1.map((producto) => (
                <div className="producto">
                  <p>{producto.nombre}</p>
                  <p>${producto.precio}</p>
                  <p>{producto.cantidad}</p>
                  <button onClick={() => borraloboludo(producto.nombre)}>Eliminar</button>
                </div>
              ))}
              <div className="total">
                <p>Total:</p>
                <p>${totalCarrito()}</p>
              </div>
              <button className="vaciar-carrito" onClick={vaciarCarrito}>
                Vaciar carrito
              </button>
              <Button variant="primary" onClick={() => {checkear(login);setModalShow(login);}}>
                Realizar Pedido
              </Button>

              <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Carrito;
