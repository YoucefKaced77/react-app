import React, { useState, useEffect } from "react";
import Producto from "../Producto/Producto";
import "./Catalogo.css";
import axios from "axios"
import { useContext } from 'react';
import { CestaContext } from '../../App';
import { Button } from "react-bootstrap";

function Catalogo() {
  const [products, setProducts] = useState([]);

  const {cesta1} = useContext(CestaContext);
  const setCesta1 = useContext(CestaContext).setCesta1;

  function buscador(name) {
    console.log(cesta1)
    return cesta1.findIndex(elemento => elemento.nombre === name);
  }  

  function añadilo(product) {

    const nuevaCesta = cesta1.filter(producto => producto.nombre !== product.id);

    if(nuevaCesta.length == cesta1.length){
      setCesta1([...cesta1,{ nombre:product.id  , precio:product.precio, cantidad:((product.cantidad)+1)}]);
    }
    else{
      const userIndex = buscador(product.id);
      console.log(userIndex)
      if (userIndex === -1) return; // Si el elemento no se encuentra, no hacemos nada
      const updatedCestas = [...cesta1]; // Copiar todo el array
      const updatedCesta = { ...updatedCestas[userIndex] }; // Copiar solo el elemento que queremos actualizar
      updatedCesta.cantidad = updatedCesta.cantidad + 1; // Actualizar la propiedad age
      updatedCestas[userIndex] = updatedCesta; // Volver a agregar el elemento actualizado al array
      setCesta1(updatedCestas); // Actualizar el estado
    }
  }  

  function borraloboludo(product){

    const userIndex = buscador(product.id);
    console.log(userIndex)
    if (userIndex === -1) return; // Si el elemento no se encuentra, no hacemos nada
    const updatedCestas = [...cesta1]; // Copiar todo el array
    const updatedCesta = { ...updatedCestas[userIndex] }; // Copiar solo el elemento que queremos actualizar
    updatedCesta.cantidad = updatedCesta.cantidad - 1; // Actualizar la propiedad age
    if (updatedCesta.cantidad < 1){
      const nuevaCesta = cesta1.filter(producto => producto.nombre !== product.id);
      setCesta1(nuevaCesta);
    }
    else{
      updatedCestas[userIndex] = updatedCesta; // Volver a agregar el elemento actualizado al array
      setCesta1(updatedCestas); // Actualizar el estado
    }
    
    
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
                imagen: response.data[key].imagen,
                cantidad: 0  
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
          <Button variant="outline-info" onClick={() => añadilo(product)}>+</Button>
          <Button variant="outline-warning" onClick={() => borraloboludo(product)}>-</Button>
          </>
          
          //Producto es un componente que va a dar forma a cada producto con su estilo, imagen,...
        ))}
      </div>
    </div>
  );
}

export default Catalogo;
