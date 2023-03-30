import React, { useState } from 'react';
import "./Carrito.css"
import { useContext } from 'react';
import CestaContext from "../../Store/CestaContext"
import loginContext from "../../Store/loginContext"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Modal1(props) {

  const {cesta1} = useContext(CestaContext);
  const setCesta1 = useContext(CestaContext).setCesta1;

  const totalCarrito = () => {
    return cesta1.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
  };
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
                    <p> Nombre: {producto.nombre}</p> 
                    <p> , Precio: ${producto.precio}</p>
                    <p> , Cantidad: {producto.cantidad}</p>
                  </div>
                ))}
                <div className="total">
                  <h4>Total: ${totalCarrito()}</h4>
                </div>
                <div className="aviso">
                  <p>¿Estás seguro? YA NO HABRÁ VUELTA ATRÁS</p>
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
                  <p>Nombre: {producto.nombre}</p>
                  <p>Precio: ${producto.precio}</p>
                  <p>Cantidad: {producto.cantidad}</p>
                  <Button variant="primary" onClick={() => borraloboludo(producto.nombre)}>Eliminar</Button>
                </div>
              ))}
              <div className="total">
                <p>Total: ${totalCarrito()}</p>
              </div>
              <Button variant="secondary" onClick={vaciarCarrito}>
                Vaciar carrito
              </Button>
               {'   '}
              <Button variant="primary" onClick={() => {checkear(login);setModalShow(login);}}>
                Realizar Pedido
              </Button>

              <Modal1
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
