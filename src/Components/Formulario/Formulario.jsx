import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import  {  useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ReactDOM from "react-dom";

function Formulario() {

  const [paymentOption, setPaymentOption] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [cp, setCP] = useState('');
  const [direccion, setDireccion] = useState('');

  const handlePaymentChange = (e) => {
    setPaymentOption(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setCP("");
    setDireccion("");
  }


  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Nombre</Form.Label>
        <Form.Control type="text" placeholder="Ingresa tu nombre" value={name} onChange={(e) => setName(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Ingresa tu email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formPhone">
        <Form.Label>Teléfono</Form.Label>
        <Form.Control type="tel" placeholder="Ingresa tu teléfono" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formPhone">
        <Form.Label>Código Postal</Form.Label>
        <Form.Control type="tel" placeholder="Ingresa tu CP" value={cp} onChange={(e) => setCP(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formPhone">
        <Form.Label>Dirección Completa</Form.Label>
        <Form.Control type="tel" placeholder="Ingresa tu dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
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

      
        <RealizarPedido/>
      
    </Form>
  );
}

function RealizarPedido() {
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

  return (
    <>
      <Button onClick={() => setShow(true)}>Finalizar Compra</Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>¡Gracias por su compra!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Estamos muy agradecidos por su confianza en nuestros productos.</p>
          <p>Por favor, revise su correo electrónico para más detalles sobre su compra.</p>
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



export default Formulario;
  