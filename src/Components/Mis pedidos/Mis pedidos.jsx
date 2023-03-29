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
import { useNavigate } from 'react-router-dom';


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
                        direccion: response.data[Pkey].direccion,
                        nombre: response.data[Pkey].nombre,
                        cp: response.data[Pkey].cp,
                        telefono: response.data[Pkey].telefono,
                    })
                }
                console.log("pedidos", arrayPedidos)
                setPedidos(arrayPedidos)
            })
            .catch((error) => {
                alert('Se ha producido un error');
            })
    }, []);

    function PedidoModal(id) {

        const [show, setShow] = useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        console.log(visualizarpedidos.filter(pedido => pedido.id == id.pedido))
        const cesta = visualizarpedidos.filter(pedido => pedido.id == id.pedido)
        console.log("esta es la cesta", cesta[0].cesta)

        return (
            <>
                <Button variant="primary" onClick={handleShow}>
                    Ver detalle del pedido
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Detalle del pedido</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {cesta[0].cesta.map((pedido) => (
                            <>
                                <p>Nombre: {pedido.nombre}</p>
                                <p>Cantidad: {pedido.cantidad}</p>
                                <p>Precio: {pedido.precio}</p>
                            </>
                        ))}
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

    function BorrarPedidomodal(id) {

        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        const navigate = useNavigate();

        return (
            <>

            <Button variant="primary" onClick={handleShow}>
                    BORRAR PEDIDO
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Borrar Pedido</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Estás seguro???</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { handleClose(); si(id); navigate("/") }}>
                        SÍ
                    </Button>
                </Modal.Footer>
            </Modal>

            </>
        );
    }

    const visualizarpedidos = pedidos.filter(pedido => pedido.email == email)


    function si(id) {
        console.log("este es el id", id)
        console.log("este es el toke", localStorage.getItem('loginData'))
        axios.delete('https://react-app-22010-default-rtdb.europe-west1.firebasedatabase.app/Pedidos/' + id.id + '.json?auth=' + localStorage.getItem('loginData'))
            .then((response) => {
                alert('Pedido borrado');
            }).catch((error) => {
                alert('No se puede borrar');
            })
        
    }
    

    return (
        <>
            {login ? (
                visualizarpedidos.map((pedido) => (
                    <>
                        <p>{pedido.id}</p>
                        <p>{pedido.email}</p>
                        <p>{pedido.preciototal}</p>
                        <p>{pedido.timestamp}</p>
                        <p>{pedido.direccion}</p>
                        <p>{pedido.nombre}</p>
                        <p>{pedido.telefono}</p>
                        <p>{pedido.cp}</p>
                        <PedidoModal pedido={pedido.id} />
                        <BorrarPedidomodal id={pedido.id} />
                        


                    </>
                ))
            ) : (
                <p>No has iniciado sesión</p>
            )}
        </>
    );
}

export default MisPedidos