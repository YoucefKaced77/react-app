import logo from './logo.svg';
import React from 'react';
import './App.css';
import Catalogo from "./Components/Catalogo/Catalogo"
import Header from './Components/Header/Header';
import Carrito from "./Components/Carrito/Carrito";
import Login from "./Components/Login/Login"
import MisPedidos from "./Components/Mis pedidos/Mis pedidos"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import Confirmacion from './Components/Confirmacion/Confirmacion';
import Formulario from './Components/Formulario/Formulario';
import Footer from "./Components/Footer/Footer";
import Registro from "./Components/Registro/Registro";
import Producto from './Components/Producto/Producto';
import Logout from './Components/Logout/Logout';

export const CestaContext = createContext({ cesta1: 0, setCesta1: () => { } });
export const loginContext = createContext({ login: false, setLogin: () => { } });

//Compaginar la parte de recarte con la mía  
//como seccionar la base de datos

function App() {

  const [cesta1, setCesta1] = useState([]);
  const [login, setLogin] = useState(false);
  const [loginData, setLoginData] = useState({});

  console.log(login)

  const actualizarLogin = (login, loginData) => {
    setLogin(login);
    setLoginData(loginData);
    localStorage.setItem('login', login);
    localStorage.setItem('loginData', loginData.idToken);
  }

  useEffect(() => {
    if (localStorage.getItem('login') === 'true') {
      setLogin(true);
      setLoginData({ idToken: localStorage.getItem('loginData') });
    }
  }, []);

  const contenidoProductos = <>
    <CestaContext.Provider value={{ cesta1, setCesta1 }}>
      <Carrito />
      <Catalogo />
    </CestaContext.Provider>
  </>

  return (
    <>
      <loginContext.Provider value={{ login, setLogin }}>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={ contenidoProductos } />
            <Route path="/MisPedidos" element={<MisPedidos/>} />
            <Route path="/Formulario" element={<Formulario/>} />
            <Route path='/Login' element={<Login actualizarLogin={actualizarLogin} />} />
            <Route path='/Registro' element={<Registro actualizarLogin={actualizarLogin} />} />
            <Route path='/Logout' element={<Logout actualizarLogin={actualizarLogin} />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </loginContext.Provider>

    </>
  );
}


export default App;
