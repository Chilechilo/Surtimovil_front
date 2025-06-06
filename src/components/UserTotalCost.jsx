import { gql, useLazyQuery } from '@apollo/client';
import { useState } from 'react';

const GET_TOTAL_COST = gql`
  query getTotalCost($id_user: Int!) {
    getTotalCost(id_user: $id_user)
  }
`;

function UserTotalCost() {
  const [id, setId] = useState('');
  const [getCost, { data, loading, error }] = useLazyQuery(GET_TOTAL_COST);

  const handleSubmit = (e) => {
    e.preventDefault();
    getCost({ variables: { id_user: parseInt(id) } });
  };

  return (
    <div>
      <h2>Costo Total del Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="ID del usuario"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button type="submit">Consultar</button>
      </form>
      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>Total: ${data.getTotalCost}</p>}
    </div>
  );
}

export default UserTotalCost;
