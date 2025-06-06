import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';

const DELETE_USER = gql`
  mutation deleteUser($Id_user: Int!) {
    deleteUser(Id_user: $Id_user)
  }
`;

function DeleteUser() {
  const [userId, setUserId] = useState('');
  const [deleteUser, { data, loading, error }] = useMutation(DELETE_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await deleteUser({ variables: { Id_user: parseInt(userId) } });
  };

  return (
    <div>
      <h2>Eliminar Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="ID del usuario"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button type="submit" disabled={loading}>Eliminar</button>
      </form>
      {loading && <p>Eliminando...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      {data && <p>Resultado: {data.deleteUser}</p>}
    </div>
  );
}

export default DeleteUser;
