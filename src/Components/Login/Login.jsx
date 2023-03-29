import './Login.css';
import axios from "axios";
import { useState } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";

const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = (event) => {
        event.preventDefault();
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAi4jyFRMmLTL6DuHMFgo7RZ1wmHhuefc8', authData)
            .then((response) => {
                //console.log(response);
                props.actualizarLogin(true, response.data);
                alert('El usuario se ha logueado correctamente');
            }).catch((error) => {
                alert('No se ha encontrado el usuario');
            })
    }

    const logoutHandler = () => {
        props.actualizarLogin(false, {});
    }

    return (
        <Form onSubmit={submitHandler}>
            <Container className="w-50">
                <Row className="mb-3">
                    <Form.Group>
                        <Form.Label>Email: </Form.Label>
                        <Form.Control onChange={(event) => setEmail(event.target.value)} type='email' value={email} />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group>
                        <Form.Label>Password: </Form.Label>
                        <Form.Control onChange={(event) => setPassword(event.target.value)} type='password' value={password} />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Button type='submit' variant="primary">LOGIN</Button>
                    </Col>
                    <Col>
                        <Button variant="secondary" onClick={logoutHandler}>LOGOUT</Button>
                    </Col>
                </Row>
            </Container>
        </Form>



    )
}

export default Login;