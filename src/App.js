import React from 'react';
import './App.css';
import Catalogo from "./Components/Catalogo/Catalogo"
import Header from './Components/Header/Header';
import Carrito from "./Components/Carrito/Carrito";
import Login from "./Components/Login/Login"
import MisPedidos from "./Components/Mis pedidos/Mis pedidos"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import Formulario from './Components/Formulario/Formulario';
import Footer from "./Components/Footer/Footer";
import Registro from "./Components/Registro/Registro";
import Logout from './Components/Logout/Logout';
import loginContext from "./Store/loginContext"
import CestaContext from "./Store/CestaContext"

//Compaginar la parte de recarte con la mía  
//como seccionar la base de datos

function App() {

  const [cesta1, setCesta1] = useState([]);
  const [login, setLogin] = useState(false);
  const [loginData, setLoginData] = useState({});
  const [loginemail, setLoginEmail] = useState({});

  const actualizarLogin = (login, loginData) => {
    setLogin(login);
    setLoginData(loginData);
    localStorage.setItem('login', login);
    localStorage.setItem('loginData', loginData.idToken);
    localStorage.setItem('loginemail', loginData.email);
  }

  useEffect(() => {
    if (localStorage.getItem('login') === 'true') {
      setLogin(true);
      setLoginData({ idToken: localStorage.getItem('loginData') });
      setLoginData({ email: localStorage.getItem('loginemail') });
    }
  }, []);

  const contenidoProductos = <>
    {/* <CestaContext.Provider value={{ cesta1, setCesta1 }}> */}
      <Carrito />
      <Catalogo />
    {/* </CestaContext.Provider> */}
  </>

  return (
    <>
      <loginContext.Provider value={{ login, setLogin }}>
        <CestaContext.Provider value={{ cesta1, setCesta1 }}>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={contenidoProductos} />
              <Route path="/MisPedidos" element={<MisPedidos />} />
              <Route path="/Formulario" element={<Formulario />} />
              <Route path='/Login' element={<Login actualizarLogin={actualizarLogin} />} />
              <Route path='/Registro' element={<Registro actualizarLogin={actualizarLogin} />} />
              <Route path='/Logout' element={<Logout actualizarLogin={actualizarLogin} />} />
            </Routes>
          </BrowserRouter>
          <Footer />
        </CestaContext.Provider>
      </loginContext.Provider>

    </>
  );
}


export default App;
