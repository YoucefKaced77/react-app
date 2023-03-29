import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import  {  useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ReactDOM from "react-dom";
import axios from 'axios';
import CestaContext from "../../Store/CestaContext"
import { useContext } from 'react';

function Formulario() {

  const {cesta1} = useContext(CestaContext);
  const setCesta1 = useContext(CestaContext).setCesta1;

  const [paymentOption, setPaymentOption] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [cp, setCP] = useState('');
  const [direccion, setDireccion] = useState('');

  console.log("esta es la cesta despues de",cesta1)

  const handlePaymentChange = (e) => {
    setPaymentOption(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setName('');
    setPhone('');
    setMessage('');
    setCP("");
    setDireccion("");
  }


  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Nombre</Form.Label>
        <Form.Control type="text" placeholder="Ingresa tu nombre" value={name} onChange={(e) => setName(e.target.value)} required />
      </Form.Group>

      <Form.Group controlId="formPhone">
        <Form.Label>Teléfono</Form.Label>
        <Form.Control type="tel" placeholder="Ingresa tu teléfono" value={phone} onChange={(e) => setPhone(e.target.value)}required />
      </Form.Group>

      <Form.Group controlId="formPhone">
        <Form.Label>Código Postal</Form.Label>
        <Form.Control type="tel" placeholder="Ingresa tu CP" value={cp} onChange={(e) => setCP(e.target.value)} required/>
      </Form.Group>

      <Form.Group controlId="formPhone">
        <Form.Label>Dirección Completa</Form.Label>
        <Form.Control type="tel" placeholder="Ingresa tu dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} required/>
      </Form.Group>

      <Form.Group controlId="paymentOptionSelect">
        <Form.Label>Opciones de Pago</Form.Label>
        <Form.Select
          aria-label="payment-options"
          value={paymentOption}
          onChange={handlePaymentChange}
        >
          <option value="credit-card">Tarjeta de Crédito</option>
          <option value="bank-transfer">Transferencia Bancaria</option>
          <option value="paypal">PayPal</option>
          <option value="bizum">Bizum</option>
          <option value="contrarrembolso">Contrarrembolso</option>
        </Form.Select>
      </Form.Group>

      <Form.Group controlId="formMessage">
        <Form.Label>Mensaje</Form.Label>
        <Form.Control as="textarea" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} />
      </Form.Group>

      
        <RealizarPedido name={name} cp={cp} phone={phone} direccion={direccion}/>
      
    </Form>
  );
}

function RealizarPedido(props) {

  const {cesta1} = useContext(CestaContext);
  const setCesta1 = useContext(CestaContext).setCesta1;

  const timestamp = Date.now();

  
  const totalCarrito = () => {
    return cesta1.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
  };

  

  const arrayPedidos = {
    paymentOption: props.paymentOption,
    name: props.name,
    email: localStorage.getItem('loginemail'),
    phone: props.phone,
    message: props.message,
    cp: props.cp,
    direccion: props.direccion,
    cesta: cesta1,
    preciototal: totalCarrito(),
    timestamp: new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp)
  }

  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (show){
      const timer = setTimeout(() => {
        setShow(false);
        navigate("/");
      }, 5000);
      return () => clearTimeout(timer);
    }
    
  }, [show, navigate]);

  const handleClose = () => setShow(false);

  function insertFirebase() {
    console.log(arrayPedidos)
    axios.post('https://react-app-22010-default-rtdb.europe-west1.firebasedatabase.app/Pedidos.json?auth=' + localStorage.getItem('loginData'), arrayPedidos)
      .then((response) => {
        alert('El producto se ha insertado en la base de datos');
      })
      .catch((error)=>{
        alert('No se puede crear');
      })
    setCesta1([])
    
  }

  return (
    <>
      <Button onClick={() => { insertFirebase(); setShow(true); }}>Finalizar Compra</Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>¡Gracias por su compra!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Estamos muy agradecidos por su confianza en nuestros productos.</p>
          <p>EN BREVES SERÁ REDIRIGIDO A LA PÁGINA PRINCIPAL.</p>
        </Modal.Body>
      </Modal>
    </>
  );
}



export default Formulario;
  