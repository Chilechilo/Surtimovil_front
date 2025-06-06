import { gql, useLazyQuery } from '@apollo/client';
import { useState } from 'react';

const GET_ORDERS = gql`
  query getOrderStatusByUser($id_user: Int!) {
    getOrderStatusByUser(id_user: $id_user) {
      user
      id_order
      product
      quantity
      cost
      status
    }
  }
`;

function OrderStatus() {
  const [idUsuario, setIdUsuario] = useState('');
  const [buscarOrdenes, { data, loading, error }] = useLazyQuery(GET_ORDERS);

  const handleBuscar = () => {
    const id = parseInt(idUsuario);
    if (!isNaN(id)) {
      buscarOrdenes({ variables: { id_user: id } });
    }
  };

  return (
    <div>
      <h2>Consultar Órdenes por Usuario</h2>
      <input
        type="number"
        placeholder="ID del usuario"
        value={idUsuario}
        onChange={(e) => setIdUsuario(e.target.value)}
      />
      <button onClick={handleBuscar}>Buscar Órdenes</button>

      {loading && <p>Cargando órdenes...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}

      {data?.getOrderStatusByUser?.length > 0 ? (
        <ul>
          {data.getOrderStatusByUser.map((orden, index) => (
            <li key={index}>
              Orden #{orden.id_order} - Producto: {orden.product} - Cantidad: {orden.quantity} - Costo: ${orden.cost} - Estado: {orden.status}
            </li>
          ))}
        </ul>
      ) : data?.getOrderStatusByUser?.length === 0 ? (
        <p>No se encontraron órdenes para ese usuario.</p>
      ) : null}
    </div>
  );
}

export default OrderStatus;
