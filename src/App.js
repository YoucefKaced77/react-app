import logo from './logo.svg';
import React from 'react';
import './App.css';
import Catalogo from "./Components/Catalogo/Catalogo"
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Carrito from "./Components/Carrito/Carrito";
import Login from "./Components/Login/Login"
import MisPedidos from "./Components/Mis pedidos/Mis pedidos"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import Confirmacion from './Components/Confirmacion/Confirmacion';
import Formulario from './Components/Formulario/Formulario';

export const CestaContext = createContext({ cesta1: 0, setCesta1: () => {} });

//Compaginar la parte de recarte con la mía
//como seccionar la base de datos

function App() {

  const [cesta1, setCesta1] = useState([]);

  return (
    <>
      <Header/>

      <BrowserRouter>
        <Routes>
            <Route path="/" element={<CestaContext.Provider value={{ cesta1, setCesta1 }}>
                                      <Carrito/>
                                      <Catalogo/>
                                    </CestaContext.Provider>} />
            <Route path="/MisPedidos" element={<MisPedidos/>} />
            <Route path="/Formulario" element={<Formulario/>} />
        </Routes>
      </BrowserRouter>
      
    </>
  );
}


export default App;
