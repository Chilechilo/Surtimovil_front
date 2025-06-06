import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import '../App.css';

const UPDATE_USER = gql`
  mutation updateUser($Id_user: Int!, $name: String, $email: String) {
    updateUser(Id_user: $Id_user, name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

function UpdateUser() {
  const [form, setForm] = useState({
    Id_user: '',
    name: '',
    email: '',
  });

  const [updateUser, { loading, error, data }] = useMutation(UPDATE_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser({
      variables: {
        Id_user: parseInt(form.Id_user),
        name: form.name || undefined,
        email: form.email || undefined,
      },
    });
    alert('Usuario actualizado');
    setForm({ Id_user: '', name: '', email: '' });
  };

  return (
    <div className="formulario">
      <h2>Actualizar Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="ID de Usuario"
          value={form.Id_user}
          onChange={(e) => setForm({ ...form, Id_user: e.target.value })}
        />
        <input
          type="text"
          placeholder="Nuevo Nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Nuevo Correo"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <button type="submit" disabled={loading}>Actualizar</button>
      </form>

      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      {data && <p>Actualizado: {data.updateUser.name}</p>}
    </div>
  );
}

export default UpdateUser;
