import React, { useState, useEffect } from "react";
import Producto from "../Producto/Producto";
import "./Catalogo.css";
import axios from "axios"
import { useContext } from 'react';
import { CestaContext } from '../../App';

function Catalogo() {
  const [products, setProducts] = useState([]);

  const {cesta1} = useContext(CestaContext);
  const setCesta1 = useContext(CestaContext).setCesta1;

  function borraloboludo(id){
    const nuevaCesta = cesta1.filter(producto => producto.nombre !== id);
    console.log(cesta1)
    setCesta1(nuevaCesta);
  };

  useEffect(() => {
    axios.get("https://react-2023-recarte-y-yo-default-rtdb.europe-west1.firebasedatabase.app/.json")
    .then((response) => {
      let arrayProductos = [];
        for (let key in response.data) {
            arrayProductos.push({
                id: key,
                color: response.data[key].Color,
                precio: response.data[key].Precio,
                imagen: response.data[key].imagen
            })
        }
        //console.log(arrayProductos);
        setProducts(arrayProductos);
    })
    .catch((error)=>{
      alert('Se ha producido un error');
    })
  }, []);

  return (
    <div className="catalog">
      <h1>Productos</h1>
      <div className="product-list">
        {products.map((product) => (
          <>
          <Producto nombre={product.id} precio={product.precio} imagen={product.imagen} color={product.color} />
          <button onClick={() => setCesta1([...cesta1,{ nombre:product.id  , precio:product.precio}])}>Agregar al carrito</button>
          <button onClick={() => borraloboludo(product.id)}>Borrar del carrito</button>
          </>
          
          //Producto es un componente que va a dar forma a cada producto con su estilo, imagen,...
        ))}
      </div>
    </div>
  );
}

export default Catalogo;
