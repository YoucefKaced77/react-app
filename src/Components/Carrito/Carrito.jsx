import React, { useState } from 'react';
import { useEffect } from 'react';
import "./Carrito.css"
import { useContext } from 'react';
import { CestaContext } from '../../App';
import Confirmacion from '../Confirmacion/Confirmacion';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Nav } from 'react-bootstrap';

function MyVerticallyCenteredModal(props) {

  const {cesta1} = useContext(CestaContext);
  const setCesta1 = useContext(CestaContext).setCesta1;

  const totalCarrito = () => {
    return cesta1.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
  };

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
          <Nav.Link href="/Formulario">Grabar Pedido</Nav.Link>
        </Nav.Item>
      </Nav>
      </Modal.Footer>
    </Modal>
  );
}

function Carrito() {

  const [modalShow, setModalShow] = React.useState(false);
  const [cesta, setCesta] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  const {cesta1} = useContext(CestaContext);
  const setCesta1 = useContext(CestaContext).setCesta1;

  function borraloboludo(id){
    const nuevaCesta = cesta1.filter(producto => producto.nombre !== id);
    console.log(cesta1)
    setCesta1(nuevaCesta);
  };

  const vaciarCarrito = () => {
    setCesta1([]);
  };

  const totalCarrito = () => {
    return cesta1.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
  };

  function totalcantidad(){
    return cesta1.reduce((total, producto) => total + (producto.cantidad), 0);
  }

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
              <Button variant="primary" onClick={() => setModalShow(true)}>
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
