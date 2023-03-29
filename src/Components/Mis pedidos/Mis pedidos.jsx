import React, { useState, useEffect } from "react";
import Producto from "../Producto/Producto";
import axios from "axios"
import { useContext } from 'react';
import CestaContext from "../../Store/CestaContext";
import loginContext from "../../Store/loginContext"
import { Button } from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Modal } from "react-bootstrap";


function MisPedidos() {

    const { login } = useContext(loginContext);
    const [pedidos, setPedidos] = useState([]);
    const email = localStorage.getItem('loginemail');


    useEffect(() => {
        axios.get('https://react-app-22010-default-rtdb.europe-west1.firebasedatabase.app/Pedidos.json')
            .then((response) => {
                let arrayPedidos = [];
                for (let Pkey in response.data) {
                    arrayPedidos.push({
                        id: Pkey,
                        cesta: response.data[Pkey].cesta,
                        email: response.data[Pkey].email,
                        preciototal: response.data[Pkey].preciototal,
                        timestamp: (response.data[Pkey].timestamp).toString(),
                    })
                }
                console.log("pedidos", arrayPedidos)
                setPedidos(arrayPedidos)
            })
            .catch((error) => {
                alert('Se ha producido un error');
            })
    }, []);

    function PedidoModal(pedido, bool) {
        
        const [show, setShow] = useState(false);
      
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
      
        return (
          <>
      
            <Modal show={bool} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Detalle del pedido</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Nombre: {pedido.nombre}</p>
                <p>Cantidad: {pedido.cantidad}</p>
                <p>Precio: {pedido.precio}</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cerrar
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        );
    }

    function verdetalles(id){
        const cesta = visualizarpedidos.filter(pedido => pedido.id == id )
        const apoyo=[]
        return(
            cesta[0].cesta.map((pedido) => (
                <>
                    <PedidoModal pedido={pedido} bool={true}></PedidoModal>
                </>
            ))
        )
    }

    const visualizarpedidos = pedidos.filter(pedido => pedido.email == email )

    return (
        <>
            {login ? (
                visualizarpedidos.map((pedido) => (
                    <>
                    <p>{pedido.id}</p>
                    <p>{pedido.email}</p>
                    <p>{pedido.preciototal}</p>
                    <p>{pedido.timestamp}</p>
                    <Button onClick={() =>  verdetalles(pedido.id)}>Ver Detalles</Button>
                    
                    </>
                ))
            ) : (
                <p>No has iniciado sesión</p>
            )}
        </>
    );
}

export default MisPedidos