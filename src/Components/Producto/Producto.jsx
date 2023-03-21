import React from 'react';
import "./Producto.css"

function Producto({ nombre, precio, imagen, color }) {
  return (
    <div className="producto">
      <div className="imagen">
        <img src={imagen} alt={nombre} />
      </div>
      <div className="detalles">
        <h3>{nombre}</h3>
        <p>${precio}</p>
        <p>{color}</p>
      </div>
    </div>
  );
}

export default Producto;
