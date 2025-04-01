import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Inicio from "./views/Inicio";
import './App.css';
import Encabezado from "./components/encabezado/Encabezado";
import Clientes from "./views/clientes";
import Usuarios from "./views/usuarios";
import Categorias from "./views/Categorias";
import Productos from "./views/productos";
import Ventas from "./views/Ventas";
import Compras from "./views/Compras";
import Empleados from "./views/Empleados";

const App = () => {
  return (
    
    <Router>
      <main className="margen-superior-main">
      <Encabezado/>
        <Routes>
       

        <Route path="/" element={<Login />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/compras" element={<Compras />} />
        <Route path="/empleados" element={<Empleados />} />

        </Routes>
      </main>
    </Router>
  );
};

export default App;