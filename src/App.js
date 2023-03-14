import logo from './logo.svg';
import './App.css';
import Catalogo from "./Components/Catalogo/Catalogo"
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Carrito from "./Components/Carrito/Carrito";
import Login from "./Components/Login/Login"
import MisPedidos from "./Components/Mis pedidos/Mis pedidos"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header/>
      <BrowserRouter>
        <Routes>
            <Route path="/Home" element={<Home/>} />
            <Route path="/Catalogo" element={<Catalogo/>} />
            <Route path="/Carrito" element={<Carrito/>} />
            <Route path="/MisPedidos" element={<MisPedidos/>} />
            <Route path="/Login" element={<Login/>} />
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
