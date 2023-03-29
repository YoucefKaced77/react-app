import React from 'react';
import "./Producto2.css"

function Producto2({ nombre, precio, cantidad }) {
  return (
    <div className="producto">
      <div className="detalles">
        <h6> Producto: {nombre}, Precio: ${precio}, Cantidad:{cantidad}</h6>
      </div>
    </div>
  );
}

export default Producto2;
