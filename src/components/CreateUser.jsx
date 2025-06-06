import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $password: String!, $role: String) {
    createUser(name: $name, email: $email, password: $password, role: $role) {
      Id_user
      name
    }
  }
`;

function CreateUser() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'cliente' });
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser({ variables: form });
  };

  return (
    <div>
      <h2>Crear Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Nombre" onChange={e => setForm({ ...form, name: e.target.value })} /><br />
        <input placeholder="Correo" onChange={e => setForm({ ...form, email: e.target.value })} /><br />
        <input placeholder="Contraseña" type="password" onChange={e => setForm({ ...form, password: e.target.value })} /><br />
        <input placeholder="Rol (opcional)" onChange={e => setForm({ ...form, role: e.target.value })} /><br />
        <button type="submit" disabled={loading}>Crear</button>
      </form>
      {data && <p>Usuario creado: {data.createUser.name}</p>}
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
    </div>
  );
}

export default CreateUser;
