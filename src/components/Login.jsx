import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import '../App.css';

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      message
    }
  }
`;

function Login({ setUsuario }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loginMutation, { data, loading, error }] = useMutation(LOGIN);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginMutation({ variables: form });

      if (res?.data?.login?.token) {
        const token = res.data.login.token;
        localStorage.setItem('token', token);
        const datos = jwtDecode(token);
        setUsuario({
          id: datos.id,
          email: datos.email,
          name: datos.name,
          role: datos.role,
        });
      }
    } catch (err) {
      console.error('Error al autenticar:', err.message);
    }
  };

  return (
    <div className="auth-form">
      <h2>SURTIMOVIL</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" disabled={loading}>Ingresar</button>
      </form>

      {loading && <p>Verificando...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      {data?.login?.message && <p>{data.login.message}</p>}
    </div>
  );
}

export default Login;
