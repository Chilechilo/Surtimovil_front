import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';

const UPDATE_ORDER_STATUS = gql`
  mutation updateOrderStatus($Id_order: Int!, $status: String!) {
    updateOrderStatus(Id_order: $Id_order, status: $status) {
      Id_order
      status
    }
  }
`;

function UpdateOrderStatus() {
  const [form, setForm] = useState({ Id_order: '', status: '' });
  const [updateStatus, { data, loading, error }] = useMutation(UPDATE_ORDER_STATUS);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateStatus({
      variables: {
        Id_order: parseInt(form.Id_order),
        status: form.status
      }
    });
  };

  return (
    <div>
      <h2>Actualizar Estado de Orden</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="ID de la orden"
          value={form.Id_order}
          onChange={(e) => setForm({ ...form, Id_order: e.target.value })}
        /><br />
        <input
          type="text"
          placeholder="Nuevo estado (ej: pendiente, completado)"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        /><br />
        <button type="submit" disabled={loading}>Actualizar</button>
      </form>
      {loading && <p>Actualizando...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      {data && (
        <p>Orden #{data.updateOrderStatus.Id_order} actualizada a estado: {data.updateOrderStatus.status}</p>
      )}
    </div>
  );
}

export default UpdateOrderStatus;
