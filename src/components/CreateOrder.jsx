import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';

const CREATE_ORDER = gql`
  mutation createOrder($Id_user: Int!) {
    createOrder(Id_user: $Id_user) {
      Id_order
      status
    }
  }
`;

function CreateOrder() {
  const [userId, setUserId] = useState('');
  const [createOrder, { data, loading, error }] = useMutation(CREATE_ORDER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createOrder({ variables: { Id_user: parseInt(userId) } });
  };

  return (
    <div>
      <h2>Crear Orden</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="ID del usuario"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button type="submit" disabled={loading}>Crear Orden</button>
      </form>
      {loading && <p>Enviando orden...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      {data && (
        <p>
          Orden creada con ID #{data.createOrder.Id_order} — Estado: {data.createOrder.status}
        </p>
      )}
    </div>
  );
}

export default CreateOrder;
