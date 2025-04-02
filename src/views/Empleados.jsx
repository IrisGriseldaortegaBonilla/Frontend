import React, { useState, useEffect } from 'react';
import TablaEmpleados from '../components/empleados/TablaEmpleados.jsx';
import ModalRegistroEmpleado from '../components/empleados/ModalRegistroEmpleado.jsx';
import { Container, Button } from "react-bootstrap";

const Empleados = () => {
  const [listaEmpleados, setListaEmpleados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(null);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    celular: '',
    cargo: '',
    fecha_contratacion: ''
  });

  const obtenerEmpleados = async () => {
    try {
      const respuesta = await fetch('http://localhost:3008/api/empleados');
      if (!respuesta.ok) {
        throw new Error('Error al cargar los empleados');
      }
      const datos = await respuesta.json();
      setListaEmpleados(datos);
      setCargando(false);
    } catch (error) {
      setErrorCarga(error.message);
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerEmpleados();
  }, []);

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoEmpleado(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const agregarEmpleado = async () => {
    try {
      const respuesta = await fetch('http://localhost:3008/api/registrarempleado', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoEmpleado),
      });

      if (!respuesta.ok) throw new Error('Error al agregar el empleado');

      await obtenerEmpleados();
      setNuevoEmpleado({ primer_nombre: '', segundo_nombre: '', primer_apellido: '', segundo_apellido: '', celular: '', cargo: '', fecha_contratacion: '' });
      setMostrarModal(false);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  return (
    <Container className="mt-5">
      <h4>Empleados</h4>
      <Button variant="primary" onClick={() => setMostrarModal(true)}>Nuevo Empleado</Button>
      <TablaEmpleados empleados={listaEmpleados} cargando={cargando} error={errorCarga} />
      <ModalRegistroEmpleado mostrarModal={mostrarModal} setMostrarModal={setMostrarModal} nuevoEmpleado={nuevoEmpleado} manejarCambioInput={manejarCambioInput} agregarEmpleado={agregarEmpleado} errorCarga={errorCarga} />
    </Container>
  );
};

export default Empleados;
