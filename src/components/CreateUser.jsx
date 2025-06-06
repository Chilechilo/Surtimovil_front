import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
const CREATE_USER = gql`
  mutation createUser($name: String!, $email: String!, $password: String!, $role: String!) {
    createUser(name: $name, email: $email, password: $password, role: $role) {
      id
      name
      email
      role
    }
  }
`;
function CreateUser({ isRegistroInicial = false, setVistaActual }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: isRegistroInicial ? 'cliente' : '',
  });

  const [createUser, { loading, error }] = useMutation(CREATE_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser({ variables: form });
    alert('Usuario registrado');
    if (isRegistroInicial) {
      setVistaActual('login');
    } else {
      setForm({ name: '', email: '', password: '', role: '' });
    }
  };

  return (
    <div className="auth-form">
      <h2>{isRegistroInicial ? 'Crear Cuenta' : 'Crear Usuario'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Correo"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {!isRegistroInicial && (
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="">Selecciona un rol</option>
            <option value="cliente">Cliente</option>
            <option value="admin">Admin</option>
          </select>
        )}

        <button type="submit" disabled={loading}>
          {isRegistroInicial ? 'Registrarse' : 'Crear Usuario'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}

      {isRegistroInicial && (
        <button className="switch" onClick={() => setVistaActual('login')}>
          ¿Ya tienes cuenta? Inicia sesión
        </button>
      )}
    </div>
  );
}
export default CreateUser;
