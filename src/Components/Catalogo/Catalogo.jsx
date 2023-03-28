import React, { useState, useEffect } from "react";
import Producto from "../Producto/Producto";
import "./Catalogo.css";
import axios from "axios"
import { useContext } from 'react';
import CestaContext from "../../Store/CestaContext";
import { Button } from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function Catalogo() {
  const [products, setProducts] = useState([]);
  const [secciones, setSecciones] = useState([]);
  const { cesta1 } = useContext(CestaContext);
  const setCesta1 = useContext(CestaContext).setCesta1;

  function buscador(name) {
    console.log(cesta1)
    return cesta1.findIndex(elemento => elemento.nombre === name);
  }

  function añadilo(product) {

    const nuevaCesta = cesta1.filter(producto => producto.nombre !== product.nombre);

    if (nuevaCesta.length == cesta1.length) {
      setCesta1([...cesta1, { nombre: product.nombre, precio: product.precio, cantidad: ((product.cantidad) + 1) }]);
    }
    else {
      const userIndex = buscador(product.nombre);
      console.log(userIndex)
      if (userIndex === -1) return; // Si el elemento no se encuentra, no hacemos nada
      const updatedCestas = [...cesta1]; // Copiar todo el array
      const updatedCesta = { ...updatedCestas[userIndex] }; // Copiar solo el elemento que queremos actualizar
      updatedCesta.cantidad = updatedCesta.cantidad + 1; // Actualizar la propiedad age
      updatedCestas[userIndex] = updatedCesta; // Volver a agregar el elemento actualizado al array
      setCesta1(updatedCestas); // Actualizar el estado
    }
  }

  function borraloboludo(product) {

    const userIndex = buscador(product.nombre);
    console.log(userIndex)
    if (userIndex === -1) return; // Si el elemento no se encuentra, no hacemos nada
    const updatedCestas = [...cesta1]; // Copiar todo el array
    const updatedCesta = { ...updatedCestas[userIndex] }; // Copiar solo el elemento que queremos actualizar
    updatedCesta.cantidad = updatedCesta.cantidad - 1; // Actualizar la propiedad age
    if (updatedCesta.cantidad < 1) {
      const nuevaCesta = cesta1.filter(producto => producto.nombre !== product.nombre);
      setCesta1(nuevaCesta);
    }
    else {
      updatedCestas[userIndex] = updatedCesta; // Volver a agregar el elemento actualizado al array
      setCesta1(updatedCestas); // Actualizar el estado
    }


  };

  useEffect(() => {
    axios.get("https://react-app-22010-default-rtdb.europe-west1.firebasedatabase.app/Producto.json")
      .then((response) => {
        let arraySecciones = [];
        let arrayProductos = [];
        for (let Pkey in response.data) {
          arraySecciones.push({
            titulo: Pkey,
          })
          for (let Skey in response.data[Pkey]) {
            arrayProductos.push({
              titulo: Pkey,
              id: Skey,
              nombre: response.data[Pkey][Skey].Nombre,
              precio: response.data[Pkey][Skey].Precio,
              imagen: response.data[Pkey][Skey].Imagen,
              cantidad:0
            })
          }
        }
        console.log(arraySecciones)
        setProducts(arrayProductos);
        setSecciones(arraySecciones);
      })
      .catch((error) => {
        alert('Se ha producido un error');
      })
  }, []);

  const Abrigos = products.filter(producto => producto.titulo == "Abrigos" );
  const Accesorios = products.filter(producto => producto.titulo == "Accesorios" );
  const Camisetas = products.filter(producto => producto.titulo == "Camisetas" );
  const Pantalones = products.filter(producto => producto.titulo == "Pantalones" );
  const RopaInterior = products.filter(producto => producto.titulo == "Ropa Interior" );
  const Zapatos = products.filter(producto => producto.titulo == "Zapatos" );

  return (
    <div className="catalog">
      <div className="product-list">
      <Tabs defaultActiveKey="array1" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="array1" title="Abrigos">
          {Abrigos.map((product) => (
            <>
              <Producto nombre={product.nombre} precio={product.precio} imagen={product.imagen} color={product.color} />
              <Button variant="outline-info" onClick={() => añadilo(product)}>+</Button>
              <Button variant="outline-warning" onClick={() => borraloboludo(product)}>-</Button>
            </>
          ))}
        </Tab>
        <Tab eventKey="array2" title="Accesorios">
          {Accesorios.map((product) => (
            <>
              <Producto nombre={product.nombre} precio={product.precio} imagen={product.imagen} color={product.color} />
              <Button variant="outline-info" onClick={() => añadilo(product)}>+</Button>
              <Button variant="outline-warning" onClick={() => borraloboludo(product)}>-</Button>
            </>
          ))}
        </Tab>
        <Tab eventKey="array3" title="Camisetas">
          {Camisetas.map((product) => (
            <>
              <Producto nombre={product.nombre} precio={product.precio} imagen={product.imagen} color={product.color} />
              <Button variant="outline-info" onClick={() => añadilo(product)}>+</Button>
              <Button variant="outline-warning" onClick={() => borraloboludo(product)}>-</Button>
            </>
          ))}
        </Tab>
        <Tab eventKey="array4" title="Pantalones">
          {Pantalones.map((product) => (
            <>
              <Producto nombre={product.nombre} precio={product.precio} imagen={product.imagen} color={product.color} />
              <Button variant="outline-info" onClick={() => añadilo(product)}>+</Button>
              <Button variant="outline-warning" onClick={() => borraloboludo(product)}>-</Button>
            </>
          ))}
        </Tab>
        <Tab eventKey="array5" title="Ropa Interior">
          {RopaInterior.map((product) => (
            <>
              <Producto nombre={product.nombre} precio={product.precio} imagen={product.imagen} color={product.color} />
              <Button variant="outline-info" onClick={() => añadilo(product)}>+</Button>
              <Button variant="outline-warning" onClick={() => borraloboludo(product)}>-</Button>
            </>
          ))}
        </Tab>
        <Tab eventKey="array6" title="Zapatos">
          {Zapatos.map((product) => (
            <>
              <Producto nombre={product.nombre} precio={product.precio} imagen={product.imagen} color={product.color} />
              <Button variant="outline-info" onClick={() => añadilo(product)}>+</Button>
              <Button variant="outline-warning" onClick={() => borraloboludo(product)}>-</Button>
            </>
          ))}
        </Tab>
      </Tabs>
      </div>
    </div>
  );
}

export default Catalogo;
