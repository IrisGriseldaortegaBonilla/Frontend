// Importaciones necesarias para el componente visual
import React from 'react';
import { Table, Spinner, Alert, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const TablaClientes = ({ clientes, cargando, error }) => {
  if (cargando) {
    return (
      <Container className="text-center mt-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </Container>
    );
  }
  if (error) {
    return <Alert variant="danger">Error: {error}</Alert>;
  }

  if (clientes.length === 0) {
    return <Alert variant="warning">No hay clientes registrados.</Alert>;
  }

  return (
    <Table striped bordered hover responsive className="mt-3">
      <thead>
        <tr>
          <th>ID</th>
          <th>Primer Nombre</th>
          <th>Segundo Nombre</th>
          <th>Primer Apellido</th>
          <th>Segundo Apellido</th>
          <th>Celular</th>
          <th>Dirección</th>
          <th>Cédula</th>
        </tr>
      </thead>
      <tbody>
        {clientes.map((cliente) => (
          <tr key={cliente.id_cliente}>
            <td>{cliente.id_cliente}</td>
            <td>{cliente.primer_nombre}</td>
            <td>{cliente.segundo_nombre || 'N/A'}</td>
            <td>{cliente.primer_apellido}</td>
            <td>{cliente.segundo_apellido || 'N/A'}</td>
            <td>{cliente.celular}</td>
            <td>{cliente.direccion}</td>
            <td>{cliente.cedula}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TablaClientes;
