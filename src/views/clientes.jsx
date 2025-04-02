import React, { useState, useEffect } from 'react';
import TablaClientes from '../components/clientes/TablaClientes.jsx';
import ModalRegistroCliente from '../components/clientes/ModalRegistroCliente.jsx';
import { Container, Button } from "react-bootstrap";

const Clientes = () => {
  const [listaClientes, setListaClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(null);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoCliente, setNuevoCliente] = useState({
    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    celular: '',
    direccion: '',
    cedula: ''
  });

  const obtenerClientes = async () => {
    try {
      const respuesta = await fetch('http://localhost:3008/api/clientes');
      if (!respuesta.ok) {
        throw new Error('Error al cargar los clientes');
      }
      const datos = await respuesta.json();
      setListaClientes(datos);
      setCargando(false);
    } catch (error) {
      setErrorCarga(error.message);
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerClientes();
  }, []);

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoCliente(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const agregarCliente = async () => {
    try {
      const respuesta = await fetch('http://localhost:3008/api/registrarcliente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoCliente),
      });

      if (!respuesta.ok) throw new Error('Error al agregar el cliente');

      await obtenerClientes();
      setNuevoCliente({ primer_nombre: '', segundo_nombre: '', primer_apellido: '', segundo_apellido: '', celular: '', direccion: '', cedula: '' });
      setMostrarModal(false);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  return (
    <Container className="mt-5">
      <h4>Clientes</h4>
      <Button variant="primary" onClick={() => setMostrarModal(true)}>Nuevo Cliente</Button>
      <TablaClientes clientes={listaClientes} cargando={cargando} error={errorCarga} />
      <ModalRegistroCliente mostrarModal={mostrarModal} setMostrarModal={setMostrarModal} nuevoCliente={nuevoCliente} manejarCambioInput={manejarCambioInput} agregarCliente={agregarCliente} errorCarga={errorCarga} />
    </Container>
  );
};

export default Clientes;
