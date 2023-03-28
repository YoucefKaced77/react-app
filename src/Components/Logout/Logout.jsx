import { useState } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';


const Logout = (props) => {

    const navega = useNavigate();
    props.actualizarLogin(false, {});

    navega('/');

    
}

export default Logout;