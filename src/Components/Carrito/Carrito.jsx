import React, { useState } from 'react';
import { useEffect } from 'react';
import "./Carrito.css"
import { useContext } from 'react';
import { CestaContext } from '../../App';
import Confirmacion from '../Confirmacion/Confirmacion';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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
    return cesta1.reduce((total, producto) => total + producto.precio, 0);
  };

  return (
    <div className="carrito-container">
      <button className="mostrar-carrito" onClick={() => setMostrarCarrito(!mostrarCarrito)}>
      Mostrar carrito ({cesta1.length})
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
              <Confirmacion/>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Carrito;
