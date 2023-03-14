import React, { useState, useEffect } from "react";
import Producto from "../Producto/Producto";
import "./Catalogo.css";
import axios from "axios"

function Catalogo() {
  const [products, setProducts] = useState([]);

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
          //<Producto key={product.id} product={product} />
          <h1>{product.id}</h1>
          //Producto es un componente que va a dar forma a cada producto con su estilo, imagen,...
        ))}
      </div>
    </div>
  );
}

export default Catalogo;
