import "./Mis pedidos.css";
import React, { useState, useEffect } from "react";
import axios from "axios"
import { useContext } from 'react';
import loginContext from "../../Store/loginContext"
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Producto2 from "../Producto2/Producto2"


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
                        nombre: response.data[Pkey].name,
                        cp: response.data[Pkey].cp,
                        telefono: response.data[Pkey].phone,
                    })
                }
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

        const cesta = visualizarpedidos.filter(pedido => pedido.id == id.pedido)

        return (
            <>
                <Button variant="secondary" onClick={handleShow}>
                    INFO
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Detalle del pedido</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {cesta[0].cesta.map((pedido) => (
                            <>
                                <Producto2 nombre={pedido.nombre} cantidad={pedido.cantidad} precio={pedido.precio}></Producto2>
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

            <Button variant="danger" onClick={handleShow}>
                    BORRAR
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Borrar Pedido</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Esta seguro de que deasea borrar el historico del pedido seleccionado?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { handleClose(); si(id); navigate("/MisPedidos") }}>
                        SÍ
                    </Button>
                </Modal.Footer>
            </Modal>

            </>
        );
    }

    const visualizarpedidos = pedidos.filter(pedido => pedido.email == email)


    function si(id) {
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
                <Container  className="w-70">
                    <p></p>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>email</th>
                                <th>preciototal</th>
                                <th>timestamp</th>
                                <th>direccion</th>
                                <th>nombre</th>
                                <th>telefono</th>
                                <th>cp</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {visualizarpedidos.map((pedido) => (
                                <tr>
                                    <td>{pedido.id}</td>
                                    <td>{pedido.email}</td>
                                    <td>{pedido.preciototal}</td>
                                    <td>{pedido.timestamp}</td>
                                    <td>{pedido.direccion}</td>
                                    <td>{pedido.nombre}</td>
                                    <td>{pedido.telefono}</td>
                                    <td>{pedido.cp}</td>
                                    <td><PedidoModal pedido={pedido.id} /> {'   '}</td>
                                    <td><BorrarPedidomodal id={pedido.id} /></td>
                                    <p></p>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Container>
            ) : (
                <h1 id="mensaje">No has iniciado sesión</h1>


            )}
        </>
    );
}

export default MisPedidos